import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { firestore, storage } from '../../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { FaTrash, FaEdit } from 'react-icons/fa';
import Sidebar from './Sidebar';

const Layout = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 2.5em;
  color: #C37A47;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;

  &:hover {
    background-color: #218838;
  }
`;

const FileList = styled.div`
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
`;

const FileItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  width: 200px;
  position: relative;
  text-align: center;

  img, embed {
    width: 100%;
    height: auto;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s, box-shadow 0.3s;
    
    &:hover {
      transform: scale(1.05);
      box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
    }
  }
`;

const DeleteIcon = styled(FaTrash)`
  cursor: pointer;
  color: #E94E1B;

  &:hover {
    color: #D4411B;
  }
`;

const AdminIntyg = () => {
  const [intyg, setIntyg] = useState([]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchIntyg = async () => {
      const querySnapshot = await getDocs(collection(firestore, 'intyg'));
      const intygList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setIntyg(intygList);
    };

    fetchIntyg();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleAddIntyg = async () => {
    if (!file) {
      alert('Ladda upp en fil!');
      return;
    }
  
    try {
      const storageRef = ref(storage, `intyg/${file.name}`);
      await uploadBytes(storageRef, file);
      const fileUrl = await getDownloadURL(storageRef);
  
      const docRef = await addDoc(collection(firestore, 'intyg'), {
        fileUrl
      });
  
      setIntyg([...intyg, { id: docRef.id, fileUrl }]);
      setFile(null);
      alert('Intyg uppladdat!');
    } catch (error) {
      console.error('Fel vid uppladdning av intyg:', error);
    }
  };

  const handleDeleteIntyg = async (id, fileUrl) => {
    if (!window.confirm('Är du säker på att du vill ta bort detta intyg?')) return;

    try {
      await deleteDoc(doc(firestore, 'intyg', id));

      const fileRef = ref(storage, fileUrl);
      await deleteObject(fileRef);

      setIntyg(intyg.filter((item) => item.id !== id));
      alert('Intyg raderat!');
    } catch (error) {
      console.error('Fel vid borttagning av intyg:', error);
    }
  };

  return (
    <Layout>
      <Sidebar/>

      <Content>
        <Title>Ladda upp Intyg</Title>

        <Form>
          <Input type="file" accept="image/*,application/pdf" onChange={handleFileChange} />
          <Button onClick={handleAddIntyg}>Ladda upp intyg</Button>
        </Form>

        <FileList>
          {intyg.map((item) => (
            <FileItem key={item.id}>
              {item.fileUrl.endsWith('.pdf') ? (
                <embed src={item.fileUrl} type="application/pdf" width="100%" height="200px" />
              ) : (
                <img src={item.fileUrl} alt="Intyg" />
              )}
              <DeleteIcon onClick={() => handleDeleteIntyg(item.id, item.fileUrl)}><FaTrash/></DeleteIcon>
            </FileItem>
          ))}
        </FileList>
      </Content>
    </Layout>
  );
};

export default AdminIntyg;
