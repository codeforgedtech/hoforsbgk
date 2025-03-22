import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { storage, firestore, auth } from '../../firebase';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { collection, addDoc, serverTimestamp, query, where, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import { FaTrash, FaEdit } from 'react-icons/fa';
import Sidebar from './Sidebar';

const Container = styled.div`
   display: flex;
  flex-direction: column;
  min-height: 60vh;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;


const MainContent = styled.div`
display: flex;
  justify-content: flex-start;
  padding: 20px;
  margin: 20px;
  background-color: #FFF;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  flex-grow: 1;
  width: 100%;  // Default width for smaller screens

  @media (min-width: 768px) {
    width: 60%;  // For larger screens
    margin-left: 0;
  }
`;

const UploadContainer = styled.div`
  background-color: #ffffff;
  padding: 40px;
  border-radius: 10px;
  width: 100%;
  max-width: 600px;
  text-align: center;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 95%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Textarea = styled.textarea`
  width: 95%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;
const Title = styled.h2`
  margin-bottom: 20px;
  color: #333333;
  font-size: 24px;
`;
const Button = styled.button`
  padding: 10px 15px;
  margin-top: 10px;
  background-color: #c37a47;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
  margin-right: 5px;

  &:hover {
    background-color: #b2693b;
  }
`;

const FolderList = styled.ul`
 flex-grow: 1;
  margin-left: 10px;
  color: #333;
`;

const FolderItem = styled.li`
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
  color: #4CAF50;

  &:hover {
    color: #388E3C;
  }
`;

const GalleryListContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin-top: 10px;
  
  @media (min-width: 768px) {
    width: 35%;
    margin-top: 0;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;
const ItemLink = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 500px;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
`;
const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-top: 20px;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100px;
  overflow: hidden;
  border-radius: 5px;
  background-color: #f9f9f9;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const DeleteIconWrapper = styled.div`
   cursor: pointer;
  color: #E94E1B;

  &:hover {
    color: #D4411B;
  }
`;
const LinkName = styled.span`
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
  const [images, setImages] = useState([]);
  const [isUploadingImage, setIsUploadingImage] = useState(true);
  const [linkInput, setLinkInput] = useState('');
  const [editingFolder, setEditingFolder] = useState('');
  const [newFolderName, setNewFolderName] = useState('');
  const [selectedFolder, setSelectedFolder] = useState(''); // för att hålla reda på vilken mapp som är vald för visning

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
      setImages(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }
  }, [user]);

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
      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef).catch(error => console.warn('Kunde inte ta bort bild:', error));
      await deleteDoc(doc(firestore, 'gallery', imageId));
      alert('Bild har tagits bort.');
      fetchImagesForFolder(selectedFolder);
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
  const handleDeleteFolder = async (folderName) => {
    if (!user) return;

    const confirmation = window.confirm(`Är du säker på att du vill ta bort mappen "${folderName}" och allt innehåll?`);
    if (!confirmation) return;

    try {
      const q = query(collection(firestore, 'gallery'), where('userId', '==', user.uid), where('folder', '==', folderName));
      const querySnapshot = await getDocs(q);

      const deletePromises = querySnapshot.docs.map(async (docSnapshot) => {
        const data = docSnapshot.data();
        if (data.url) {
          const fileRef = ref(storage, data.url);
          await deleteObject(fileRef).catch(error => console.warn('Kunde inte ta bort fil:', error));
        }
        await deleteDoc(doc(firestore, 'gallery', docSnapshot.id));
      });

      await Promise.all(deletePromises);
      alert(`Mappen "${folderName}" har tagits bort.`);
      fetchFolders();
    } catch (error) {
      console.error('Fel vid borttagning:', error);
      alert('Kunde inte ta bort mappen.');
    }
  };

  const handleRenameFolder = async (folderName) => {
    if (!user || !newFolderName) return;

    const confirmation = window.confirm(`Är du säker på att du vill byta namn på mappen "${folderName}" till "${newFolderName}"?`);
    if (!confirmation) return;

    try {
      const q = query(collection(firestore, 'gallery'), where('userId', '==', user.uid), where('folder', '==', folderName));
      const querySnapshot = await getDocs(q);

      const updatePromises = querySnapshot.docs.map(async (docSnapshot) => {
        await updateDoc(doc(firestore, 'gallery', docSnapshot.id), {
          folder: newFolderName,
        });
      });

      await Promise.all(updatePromises);
      alert(`Mappen har bytt namn till "${newFolderName}".`);
      setEditingFolder('');
      setNewFolderName('');
      fetchFolders();
    } catch (error) {
      console.error('Fel vid namnändring:', error);
      alert('Kunde inte byta namn på mappen.');
    }
  };
  return (
    <Container>
      <Sidebar />
      <MainContent>
        <UploadContainer>
          <h2>{isUploadingImage ? 'Ladda upp bilder' : 'Länka video'}</h2>
          <Input type="text" placeholder="Mappnamn" value={folder} onChange={handleFolderChange} />
          {isUploadingImage ? <Input type="file" multiple onChange={handleFilesChange} /> : <Textarea placeholder="Ange videolänkar" rows={4} value={linkInput} onChange={handleLinkInputChange} />}
          <Button onClick={handleUpload} disabled={uploading}>{uploading ? 'Laddar upp...' : isUploadingImage ? 'Ladda upp' : 'Lägg till'}</Button>
          <Button onClick={() => setIsUploadingImage(!isUploadingImage)}>{isUploadingImage ? 'Byt till video' : 'Byt till bild'}</Button>
        </UploadContainer>
        {selectedFolder && (
          <div>
            <h3>Bilder i denna mapp:</h3>
            <ImageGrid>
              {images.length > 0 ? (
                images.map((image) => (
                  <ImageWrapper key={image.id}>
                    <Image src={image.url} alt="image" />
                    <DeleteIconWrapper onClick={() => handleDeleteImage(image.id, image.url)}>
                      <FaTrash />
                    </DeleteIconWrapper>
                  </ImageWrapper>
                ))
              ) : (
                <p>Det finns inga bilder i denna mapp.</p>
              )}
            </ImageGrid>
          </div>
        )}
    
      
      <GalleryListContainer>
      <Title>Inlagda Tävlingar</Title>
      
          {folders.map((folderName, index) => (
            <FolderItem key={index}>
              <ItemLink>
                {editingFolder === folderName ? (
                  <>
                    <Input
                      type="text"
                      placeholder="Nytt mappnamn"
                      value={newFolderName}
                      onChange={(e) => setNewFolderName(e.target.value)}
                    />
                    <Button onClick={() => handleRenameFolder(folderName)}>Spara</Button>
                    <Button onClick={() => setEditingFolder('')}>Avbryt</Button>
                  </>
                ) : (
                  <>
                    <Link to="#" onClick={() => { setSelectedFolder(folderName); }}>{folderName}</Link>
                    <DeleteIcon onClick={() => handleDeleteFolder(folderName)} />
                    <EditIcon onClick={() => { setEditingFolder(folderName); setNewFolderName(folderName); }} />
                  </>
                )}
              </ItemLink>
            </FolderItem>
          ))}
     
      
      </GalleryListContainer>
      </MainContent>
    </Container>
  );
};

export default GalleryUpload;
















