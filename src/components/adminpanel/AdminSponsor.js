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
  const [paymentAmount, setPaymentAmount] = useState(''); // Fält för betalningsbelopp

  useEffect(() => {
    const fetchSponsors = async () => {
      const querySnapshot = await getDocs(collection(firestore, 'sponsors'));
      const sponsorList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Sortera sponsorer baserat på betalningsbelopp (från högsta till lägsta)
      sponsorList.sort((a, b) => b.paymentAmount - a.paymentAmount);

      setSponsors(sponsorList);
    };

    fetchSponsors();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleAddSponsor = async () => {
    if (!file || !paymentAmount) {
      alert('Ladda upp en bild och ange betalningsbelopp!');
      return;
    }
  
    try {
      const storageRef = ref(storage, `sponsors/${file.name}`);
      await uploadBytes(storageRef, file);
      const imageUrl = await getDownloadURL(storageRef);
  
      const docRef = await addDoc(collection(firestore, 'sponsors'), {
        imageUrl,
        sponsorLink: sponsorLink.trim() !== '' ? sponsorLink : null, // Om inget länknamn finns, sätt det till null
        paymentAmount: parseFloat(paymentAmount),  // Lägg till betalningsbelopp här
      });
  
      setSponsors([...sponsors, { id: docRef.id, imageUrl, sponsorLink: sponsorLink.trim() !== '' ? sponsorLink : null, paymentAmount: parseFloat(paymentAmount) }]);
      setFile(null);
      setSponsorLink('');
      setPaymentAmount('');
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

  const handleEditSponsor = (id, link, payment) => {
    setEditingId(id);
    setNewLink(link || ''); // Om det inte finns någon länk, sätt den till en tom sträng
    setPaymentAmount(payment); // Ladda det aktuella betalningsbeloppet för den sponsor som ska redigeras
  };

  const handleUpdateSponsor = async (id) => {
    if (paymentAmount.trim() === '') {
      alert('Betalningsbeloppet kan inte vara tomt!');
      return;
    }

    try {
      await updateDoc(doc(firestore, 'sponsors', id), {
        sponsorLink: newLink.trim() !== '' ? newLink : null, // Om länk är tom, sätt den till null
        paymentAmount: parseFloat(paymentAmount) // Uppdatera betalningsbeloppet
      });

      setSponsors(sponsors.map(sponsor => sponsor.id === id ? { 
        ...sponsor, 
        sponsorLink: newLink.trim() !== '' ? newLink : null, 
        paymentAmount: parseFloat(paymentAmount) 
      } : sponsor));
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
          <Input type="text" placeholder="Sponsorens länk (valfritt)" value={sponsorLink} onChange={(e) => setSponsorLink(e.target.value)} />
          <Input type="number" placeholder="Betalning" value={paymentAmount} onChange={(e) => setPaymentAmount(e.target.value)} />
          <Button onClick={handleAddSponsor}>Lägg till sponsor</Button>
        </Form>

        {editingId && (
          <Form>
            <Input 
              type="text" 
              placeholder="Uppdatera sponsorens länk (valfritt)" 
              value={newLink} 
              onChange={(e) => setNewLink(e.target.value)} 
            />
            <Input 
              type="number" 
              placeholder="Uppdatera betalning" 
              value={paymentAmount} 
              onChange={(e) => setPaymentAmount(e.target.value)} 
            />
            <Button onClick={() => handleUpdateSponsor(editingId)}>Uppdatera sponsor</Button>
          </Form>
        )}

        <SponsorList>
          {sponsors.map((sponsor) => (
            <SponsorItem key={sponsor.id}>
              <img src={sponsor.imageUrl} alt="Sponsor" />
              <p>Betalning: {sponsor.paymentAmount} SEK</p> {/* Visa betalningsbelopp */}
              <div>
                <EditIcon onClick={() => handleEditSponsor(sponsor.id, sponsor.sponsorLink || '', sponsor.paymentAmount)} />
                <DeleteIcon onClick={() => handleDeleteSponsor(sponsor.id, sponsor.imageUrl)} />
              </div>
            </SponsorItem>
          ))}
        </SponsorList>
      </Content>
    </Layout>
  );
};

export default AdminSponsor;

