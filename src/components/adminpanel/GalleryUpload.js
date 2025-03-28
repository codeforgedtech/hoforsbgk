import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { storage, firestore, auth } from '../../firebase';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { collection, addDoc, serverTimestamp, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FaTrash, FaEdit } from 'react-icons/fa';
import Sidebar from './Sidebar';

// Styled Components

const GalleryPage = styled.div`
  display: flex;
  flex-direction: col;
  min-height: 60vh;

  @media (min-width: 768px) {
    flex-direction: col; // Sätt flexbox-raden när skärmen är större än 768px
  }
`;
const CreateFormContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 20px;
  margin: 20px;
  background-color: #FFF;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  flex-grow: 1;

  @media (min-width: 768px) {
    width: 60%;  // För större skärmar ska detta ta upp 60% av bredden
    margin-left: 0;  // Ta bort margin-left på desktop för att centrera
  }
`;

const FormContainer = styled.div`
  background-color: #ffffff;
  padding: 40px;
  border-radius: 10px;
  width: 100%;
  max-width: 600px;
  text-align: center;
  margin-bottom: 20px;
`;

const GalleryListContainer = styled.div`
 width: 50%;
  max-width: 600px;
  margin-top: 40px;
  flex-grow: 1; // Gör så att denna växer på större skärmar för att ta upp utrymme

  @media (min-width: 768px) {
    margin-left: 40px;  // Ge ett mellanrum mellan formuläret och nyhetslistan
    width: 35%; // Nyheterna ska ta upp 35% av utrymmet på större skärmar
  }

`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: #333333;
  font-size: 24px;
`;

const Input = styled.input`
  width: calc(100% - 20px);
  margin: 10px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;

  &:focus {
    border-color: #E94E1B;
    outline: none;
  }
`;

const Textarea = styled.textarea`
  width: calc(100% - 20px);
  margin: 10px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #E94E1B;
  color: white;
  border: none;
  border-radius: 5px;
  margin-top: 20px;
  cursor: pointer;
  width: calc(100% - 20px);

  &:hover {
    background-color: #D4411B;
  }
`;

const FolderItem = styled.div`

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;

`;

const DeleteIcon = styled(FaTrash)`
  cursor: pointer;
  color: #E94E1B;

  &:hover {
    color: #D4411B;
  }
`;

const EditIcon = styled(FaEdit)`
  cursor: pointer;
  color: #007bff;
  margin-left: 10px;

  &:hover {
    color: #0056b3;
  }
`;

const FolderTitle = styled.span`
  flex-grow: 1;
  margin-left: 10px;
  color: #333;
`;
const GalleryUpload = () => {
  const [files, setFiles] = useState([]);
  const [folder, setFolder] = useState('');
  const [uploading, setUploading] = useState(false);
  const [user] = useAuthState(auth);
  const [folders, setFolders] = useState([]);
  const [isUploadingImage, setIsUploadingImage] = useState(true);
  const [linkInput, setLinkInput] = useState('');
  const [editingFolder, setEditingFolder] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('');
  const [images, setImages] = useState([]);

  const fetchFolders = useCallback(async () => {
    if (user) {
      const q = query(collection(firestore, 'gallery'), where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);
      const folderNames = new Set(querySnapshot.docs.map(doc => doc.data().folder));
      setFolders(Array.from(folderNames));
    }
  }, [user]);

  const fetchImagesForFolder = useCallback(async (folderName) => {
    if (user && folderName) {
      const q = query(collection(firestore, 'gallery'), where('userId', '==', user.uid), where('folder', '==', folderName));
      const querySnapshot = await getDocs(q);
      setImages(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));  // Uppdaterar images med de hämtade bilderna
    }
  }, [user]);
  const handleDeleteFolder = async (folderName) => {
    if (!user) return;
  
    const confirmation = window.confirm(`Är du säker på att du vill ta bort hela mappen "${folderName}"?`);
    if (!confirmation) return;
  
    try {
      // Hämta alla bilder för denna mapp och ta bort dem
      const q = query(collection(firestore, 'gallery'), where('userId', '==', user.uid), where('folder', '==', folderName));
      const querySnapshot = await getDocs(q);
  
      // Ta bort bilder från Storage och Firestore
      querySnapshot.forEach(async (docSnapshot) => {
        const imageId = docSnapshot.id;
        const { url } = docSnapshot.data();
        const imageRef = ref(storage, url);
        
        // Ta bort bild från Storage
        await deleteObject(imageRef);
  
        // Ta bort bild från Firestore
        await deleteDoc(doc(firestore, 'gallery', imageId));
      });
  
      // Ta bort mappen från Firestore
      alert(`Mappen "${folderName}" har tagits bort tillsammans med alla bilder.`);
      fetchFolders(); // Uppdatera listan med mappar
      setSelectedFolder(''); // Rensa vald mapp
    } catch (error) {
      console.error('Fel vid borttagning av mapp:', error);
      alert('Kunde inte ta bort mappen.');
    }
  };
  useEffect(() => {
    fetchFolders();
  }, [fetchFolders]);

  useEffect(() => {
    if (selectedFolder) {
      fetchImagesForFolder(selectedFolder);
    }
  }, [selectedFolder, fetchImagesForFolder]);

  const handleFilesChange = (e) => setFiles(e.target.files);
  const handleFolderChange = (e) => setFolder(e.target.value);
  const handleLinkInputChange = (e) => setLinkInput(e.target.value);

  const handleDeleteImage = async (imageId, imageUrl) => {
    if (!user) return;

    const confirmation = window.confirm(`Är du säker på att du vill ta bort denna bild?`);
    if (!confirmation) return;

    try {
      // Ta bort från Firebase Storage
      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef);

      // Ta bort från Firestore
      await deleteDoc(doc(firestore, 'gallery', imageId));
      
      alert('Bild har tagits bort.');
      fetchImagesForFolder(selectedFolder);  // Uppdatera listan med bilder
    } catch (error) {
      console.error('Fel vid borttagning av bild:', error);
      alert('Kunde inte ta bort bild.');
    }
  };

  const handleUpload = async () => {
    if ((isUploadingImage && files.length === 0) || (!isUploadingImage && folder.trim() === '')) {
      alert('Välj filer och ange ett mappnamn.');
      return;
    }

    setUploading(true);
    const promises = [];

    if (isUploadingImage) {
      Array.from(files).forEach(file => {
        const storageRef = ref(storage, `${folder}/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        promises.push(uploadTask.then(snapshot => getDownloadURL(snapshot.ref))
          .then(url => addDoc(collection(firestore, 'gallery'), {
            folder,
            url,
            createdAt: serverTimestamp(),
            userId: user.uid,
            type: 'image',
            title: file.name,
          })));
      });
    } else {
      linkInput.split('\n').map(link => link.trim()).forEach(videoLink => {
        promises.push(addDoc(collection(firestore, 'gallery'), {
          folder,
          youtubeLink: videoLink,
          createdAt: serverTimestamp(),
          userId: user.uid,
          type: 'video',
        }));
      });
    }

    try {
      await Promise.all(promises);
      alert('Uppladdning slutförd!');
      setFiles([]);
      setFolder('');
      setLinkInput('');
      fetchFolders();
    } catch (error) {
      console.error('Fel vid uppladdning:', error);
      alert('Uppladdningen misslyckades.');
    }

    setUploading(false);
  };

  return (
    <GalleryPage>
      <Sidebar />
      <CreateFormContainer>
      <FormContainer>
        <Title>{isUploadingImage ? 'Lägg till Bilder' : 'Lägg till Video'}</Title>
        <Input type="text" placeholder="Mappnamn" value={folder} onChange={handleFolderChange} />
        {isUploadingImage ? (
          <Input type="file" multiple onChange={handleFilesChange} />
        ) : (
          <Textarea placeholder="Ange videolänkar" rows={4} value={linkInput} onChange={handleLinkInputChange} />
        )}
        <Button onClick={handleUpload} disabled={uploading}>
          {uploading ? 'Laddar upp...' : isUploadingImage ? 'Ladda upp' : 'Lägg till'}
        </Button>
      </FormContainer>

      <GalleryListContainer>
        <Title>Inlagda Mappar</Title>
        {folders.map((folderName, index) => (
          <FolderItem key={index}>
            <FolderTitle>{folderName}</FolderTitle>
            <div>
            <DeleteIcon onClick={() => handleDeleteFolder(folderName)} />
            <EditIcon onClick={() => setEditingFolder(folderName)} />
            </div>
          </FolderItem>
        ))}
      </GalleryListContainer>
      </CreateFormContainer>
    </GalleryPage>
  );
};

export default GalleryUpload;



















