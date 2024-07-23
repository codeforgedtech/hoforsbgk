import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { storage, firestore, auth } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { collection, addDoc, serverTimestamp, query, where, getDocs, deleteDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { doc } from 'firebase/firestore';

const UploadContainer = styled.div`
  padding: 20px;
  margin: 20px;
  background-color: #FFF;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 8px;
  width: 50%;
  border: 1px solid #ccc;
  border-radius: 5px;
`;
const Textarea = styled.textarea`
  margin: 10px 0;
  padding: 8px;
  width: 50%;
  border: 1px solid #ccc;
  border-radius: 5px;

`;

const Button = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #C37A47;
  color: #FFF;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left:5px;

  &:hover {
    background-color: #B2693B;
  }
`;

const FolderList = styled.ul`
  list-style: none;
  padding: 0;
`;

const FolderItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 5px;

  a {
    color: #C37A47;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const DeleteIcon = styled(FaTrash)`
  cursor: pointer;
  color: #E94E1B;
`;

const LinkList = styled.ul`
  list-style: none;
  padding: 0;
`;

const LinkItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px 0;
  padding: 5px;
  background-color: #f0f0f0;
  border-radius: 5px;
`;

const GalleryUpload = () => {
  const [files, setFiles] = useState([]);
  const [folder, setFolder] = useState('');
  const [uploading, setUploading] = useState(false);
  const [user] = useAuthState(auth);
  const [folders, setFolders] = useState([]);
  const [isUploadingImage, setIsUploadingImage] = useState(true); // Default to uploading images
  const [currentFolderLinks, setCurrentFolderLinks] = useState([]);
  const [linkInput, setLinkInput] = useState('');

  const fetchFolders = useCallback(async () => {
    if (user) {
      const q = query(collection(firestore, 'gallery'), where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);
      const folderNames = new Set();
      querySnapshot.forEach(doc => folderNames.add(doc.data().folder));
      setFolders(Array.from(folderNames));
    }
  }, [user]);

  useEffect(() => {
    fetchFolders();
  }, [fetchFolders]);

  const fetchLinksForFolder = async (folderName) => {
    const q = query(collection(firestore, 'gallery'), where('userId', '==', user.uid), where('folder', '==', folderName));
    const querySnapshot = await getDocs(q);
    const links = querySnapshot.docs.map(doc => ({
      id: doc.id,
      url: doc.data().url,
      title: doc.data().title, // Assuming you have a 'title' field in your Firestore documents
    }));
    setCurrentFolderLinks(links);
  };

  const handleFilesChange = (e) => {
    setFiles(e.target.files);
  };

  const handleFolderChange = (e) => {
    setFolder(e.target.value);
  };

  const handleLinkInputChange = (e) => {
    setLinkInput(e.target.value);
  };

  const handleUpload = async () => {
    if ((isUploadingImage && files.length === 0) || (!isUploadingImage && folder.trim() === '')) {
      alert('Var god välj filer och ange ett mappnamn.');
      return;
    }

    setUploading(true);
    const promises = [];

    if (isUploadingImage) {
      Array.from(files).forEach(file => {
        const storageRef = ref(storage, `${folder}/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        promises.push(
          uploadTask.then(snapshot => getDownloadURL(snapshot.ref))
            .then(url => {
              return addDoc(collection(firestore, 'gallery'), {
                folder,
                url,
                createdAt: serverTimestamp(),
                userId: user.uid,
                type: 'image', // Add type field for image
                title: file.name, // Assuming file name as title
              });
            })
        );
      });
    } else {
      // Handling multiple video link uploads
      const links = linkInput.split('\n').map(link => link.trim()).filter(link => link !== '');
      links.forEach(videoLink => {
        // For each video link, save it as a document with folder, url, etc.
        promises.push(
          addDoc(collection(firestore, 'gallery'), {
            folder,
            youtubeLink: videoLink, // Assuming videoLink is the URL entered by user
            createdAt: serverTimestamp(),
            userId: user.uid,
            type: 'video', // Add type field for video
            title: 'Anpassad titel', // Add a default title or leave it empty
          })
        );
      });
    }

    try {
      await Promise.all(promises);
      alert('Alla filer laddades upp framgångsrikt.');
      setFiles([]);
      setFolder('');
      setLinkInput('');
      fetchFolders(); // Refresh folders list after upload
    } catch (error) {
      console.error('Fel vid uppladdning av filer:', error);
      alert('Fel vid uppladdning av filer.');
    }

    setUploading(false);
  };

  const handleDeleteFolder = async (folderName) => {
    if (window.confirm(`Är du säker på att du vill ta bort mappen "${folderName}"? Detta går inte att ångra.`)) {
      try {
        const q = query(collection(firestore, 'gallery'), where('userId', '==', user.uid), where('folder', '==', folderName));
        const querySnapshot = await getDocs(q);
        const deletePromises = [];

        querySnapshot.forEach(doc => {
          const docRef = doc.ref;
          deletePromises.push(deleteDoc(docRef));
          const storageRef = ref(storage, `${folderName}/${doc.data().url}`);
          deletePromises.push(deleteObject(storageRef));
        });

        await Promise.all(deletePromises);
        alert(`Mappen "${folderName}" och dess innehåll har tagits bort.`);
        fetchFolders(); // Refresh folders list after delete
      } catch (error) {
        console.error('Fel vid borttagning av mapp:', error);
        alert('Fel vid borttagning av mapp.');
      }
    }
  };

  const handleDeleteLink = async (folderName, linkId) => {
    if (window.confirm(`Är du säker på att du vill ta bort länken? Detta går inte att ångra.`)) {
      try {
        const docRef = doc(collection(firestore, 'gallery'), linkId);
        await deleteDoc(docRef);
        alert('Länken har tagits bort.');
        fetchLinksForFolder(folderName); // Refresh links list after delete
      } catch (error) {
        console.error('Fel vid borttagning av länk:', error);
        alert('Fel vid borttagning av länk.');
      }
    }
  };

  if (!user) {
    return <div>Du måste vara inloggad för att ladda upp bilder eller länka videor.</div>;
  }

  return (
    <UploadContainer>
      <h2>{isUploadingImage ? 'Ladda upp bilder' : 'Länka video'}</h2>
      {isUploadingImage ? (
        <>
          <Input type="text" placeholder="Mappnamn" value={folder} onChange={handleFolderChange} />
          <Input type="file" multiple onChange={handleFilesChange} />
        </>
      ) : (
        <>
          <Input type="text" placeholder="Mappnamn" value={folder} onChange={handleFolderChange} />
          <Textarea placeholder="Ange videolänkar (en per rad)" rows={4} value={linkInput} onChange={handleLinkInputChange} />
        </>
      )}
      <p/>
      <Button onClick={handleUpload} disabled={uploading}>
        {isUploadingImage ? 'Ladda upp' : 'Lägg till'}
      </Button>
      <Button onClick={() => setIsUploadingImage(!isUploadingImage)}>
        {isUploadingImage ? 'Byt till video' : 'Byt till bilduppladdning'}
      </Button>
      <h3>Dina Mappar</h3>
      <FolderList>
        {folders.map((folderName, index) => (
          <FolderItem key={index}>
            <Link to={`/galleri/${folderName}`} onClick={() => fetchLinksForFolder(folderName)}>
              {folderName}
            </Link>
            <DeleteIcon onClick={() => handleDeleteFolder(folderName)} />
            {currentFolderLinks.length > 0 && (
              <LinkList>
                {currentFolderLinks.map(link => (
                  <LinkItem key={link.id}>
                    <a href={link.url} target="_blank" rel="noopener noreferrer">{link.title || link.url}</a>
                    <DeleteIcon onClick={() => handleDeleteLink(folderName, link.id)} />
                  </LinkItem>
                ))}
              </LinkList>
            )}
          </FolderItem>
        ))}
      </FolderList>
    </UploadContainer>
  );
};

export default GalleryUpload;









