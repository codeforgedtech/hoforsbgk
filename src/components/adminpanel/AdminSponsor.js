import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { firestore, storage } from '../../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import Sidebar from './Sidebar';
import { FaTrash, FaEdit } from 'react-icons/fa';

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

const SponsorList = styled.div`
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
`;

const SponsorItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  width: 150px;
  position: relative;
  text-align: center;

  img {
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

const EditInput = styled.input`
  padding: 5px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  text-align: center;
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

const AdminSponsor = () => {
  const [sponsors, setSponsors] = useState([]);
  const [sponsorLink, setSponsorLink] = useState('');
  const [file, setFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [newLink, setNewLink] = useState('');

  useEffect(() => {
    const fetchSponsors = async () => {
      const querySnapshot = await getDocs(collection(firestore, 'sponsors'));
      const sponsorList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setSponsors(sponsorList);
    };

    fetchSponsors();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleAddSponsor = async () => {
    if (!file) {
      alert('Ladda upp en bild!');
      return;
    }
  
    try {
      const storageRef = ref(storage, `sponsors/${file.name}`);
      await uploadBytes(storageRef, file);
      const imageUrl = await getDownloadURL(storageRef);
  
      const docRef = await addDoc(collection(firestore, 'sponsors'), {
        imageUrl,
        sponsorLink: sponsorLink.trim() !== '' ? sponsorLink : null, // Sätter null om ingen länk anges
      });
  
      setSponsors([...sponsors, { id: docRef.id, imageUrl, sponsorLink }]);
      setFile(null);
      setSponsorLink('');
      alert('Sponsor tillagd!');
    } catch (error) {
      console.error('Fel vid tillägg av sponsor:', error);
    }
  };

  const handleDeleteSponsor = async (id, imageUrl) => {
    if (!window.confirm('Är du säker på att du vill ta bort denna sponsor?')) return;

    try {
      await deleteDoc(doc(firestore, 'sponsors', id));

      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef);

      setSponsors(sponsors.filter((sponsor) => sponsor.id !== id));
      alert('Sponsor raderad!');
    } catch (error) {
      console.error('Fel vid borttagning av sponsor:', error);
    }
  };

  const handleEditSponsor = (id, link) => {
    setEditingId(id);
    setNewLink(link);
  };

  const handleUpdateSponsor = async (id) => {
    if (newLink.trim() === '') {
      alert('Länken kan inte vara tom!');
      return;
    }

    try {
      await updateDoc(doc(firestore, 'sponsors', id), {
        sponsorLink: newLink
      });

      setSponsors(sponsors.map(sponsor => sponsor.id === id ? { ...sponsor, sponsorLink: newLink } : sponsor));
      setEditingId(null);
      alert('Sponsor uppdaterad!');
    } catch (error) {
      console.error('Fel vid uppdatering av sponsor:', error);
    }
  };

  return (
    <Layout>
      <Sidebar/>

      <Content>
        <Title>Lägg till Sponsor</Title>

        <Form>
          <Input type="file" accept="image/*" onChange={handleFileChange} />
          <Input type="text" placeholder="Sponsorens länk" value={sponsorLink} onChange={(e) => setSponsorLink(e.target.value)} />
          <Button onClick={handleAddSponsor}>Lägg till sponsor</Button>
        </Form>

        <SponsorList>
  {sponsors.map((sponsor) => (
    <SponsorItem key={sponsor.id}>
      <img src={sponsor.imageUrl} alt="Sponsor" />
      {sponsor.sponsorLink ? (
        <a href={sponsor.sponsorLink} target="_blank" rel="noopener noreferrer">
         
        </a>
      ) : (
        <p>Ingen länk</p>
      )}
      <div>
      <EditIcon onClick={() => handleEditSponsor(sponsor.id, sponsor.sponsorLink || '')}/>
      <DeleteIcon onClick={() => handleDeleteSponsor(sponsor.id, sponsor.imageUrl)}/>
      </div>
    </SponsorItem>
  ))}
</SponsorList>
      </Content>
    </Layout>
  );
};

export default AdminSponsor;


