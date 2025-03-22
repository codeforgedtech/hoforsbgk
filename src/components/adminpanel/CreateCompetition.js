import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { firestore, storage } from '../../firebase';
import { Timestamp } from 'firebase/firestore';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { FaTrash, FaEdit } from 'react-icons/fa';
import Sidebar from './Sidebar';

// Styled components (Reusing and adapting styles from CreateNews)
const CreateCompetitionPage = styled.div`
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

const CompetitionBox = styled.div`
  background-color: #ffffff;
  padding: 40px;
  border-radius: 10px;
  width: 100%;
  max-width: 600px;
  text-align: center;
  margin-bottom: 20px;
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

const Select = styled.select`
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

const CompetitionListContainer = styled.div`
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

const CompetitionItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
`;

const CompetitionName = styled.span`
  flex-grow: 1;
  margin-left: 10px;
  color: #333;
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

const CreateCompetition = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [links, setLinks] = useState(['']);
  const [customType, setCustomType] = useState('');
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [competitions, setCompetitions] = useState([]);
  const [editingCompetition, setEditingCompetition] = useState(null);

  useEffect(() => {
    const fetchCompetitions = async () => {
      const competitionsCollection = collection(firestore, 'competitions');
      const querySnapshot = await getDocs(competitionsCollection);
      const competitionData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        links: doc.data().links || []
      }));
      setCompetitions(competitionData);
    };

    fetchCompetitions();
  }, []);

  const handleCreateCompetition = async () => {
    const competitionCollection = collection(firestore, 'competitions');
    const competitionData = {
      name,
      type: type === 'other' ? customType : type,
      links,
      image: imageURL || 'https://path-to-default-image',
      createdAt: Timestamp.now(),
    };

    await addDoc(competitionCollection, competitionData);
    setName('');
    setType('');
    setLinks(['']);
    setCustomType('');
    setImageURL('');
    setCompetitions([...competitions, competitionData]);
  };

  const handleDeleteCompetition = async (id) => {
    const competitionRef = doc(firestore, 'competitions', id);
    await deleteDoc(competitionRef);
    setCompetitions(competitions.filter(comp => comp.id !== id));
  };

  const handleEditCompetition = (competition) => {
    setEditingCompetition(competition);
    setName(competition.name);
    setType(competition.type);
    setLinks(competition.links);
    setImageURL(competition.image);
    setCustomType(competition.type === 'Annat' ? competition.type : '');
  };

  const handleUpdateCompetition = async () => {
    if (!editingCompetition) return;

    const competitionRef = doc(firestore, 'competitions', editingCompetition.id);
    const updatedData = {
      name,
      type: type === 'Annat' ? customType : type,
      links,
      image: imageURL || 'https://path-to-default-image',
      updatedAt: Timestamp.now(),
    };

    await updateDoc(competitionRef, updatedData);

    const updatedCompetitions = competitions.map((comp) =>
      comp.id === editingCompetition.id ? { ...comp, ...updatedData } : comp
    );
    setCompetitions(updatedCompetitions);
    setEditingCompetition(null);
    setName('');
    setType('');
    setLinks(['']);
    setCustomType('');
    setImageURL('');
  };

  const handleLinkChange = (index, event) => {
    const newLinks = [...links];
    newLinks[index] = event.target.value;
    setLinks(newLinks);
  };

  const handleAddLink = () => {
    setLinks([...links, '']);
  };

  const handleRemoveLink = (index) => {
    const newLinks = links.filter((_, i) => i !== index);
    setLinks(newLinks);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsUploading(true);
      const storageRef = ref(storage, `competitions/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
        },
        (error) => {
          console.log(error);
          setIsUploading(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageURL(downloadURL);
            setIsUploading(false);
          });
        }
      );
    }
  };

  return (
    <CreateCompetitionPage>
      <Sidebar />
      <MainContent>
        <CompetitionBox>
          <Title>{editingCompetition ? 'Redigera Tävling' : 'Lägg in Tävling'}</Title>
          <Input
            type="text"
            placeholder="Tävlingsnamn"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">Välj Tävlingstyp</option>
            <option value="Klubbmästerskap">Klubbmästerskap</option>
            <option value="Region">Region</option>
            <option value="Liga">Liga</option>
            <option value="Veckotävling">Veckotävling</option>
            <option value="Lokal tävling">Lokal tävling</option>
            <option value="Annat">Annat</option>
          </Select>
          {type === 'Annat' && (
            <Input
              type="text"
              placeholder="Ange annan tävlingstyp"
              value={customType}
              onChange={(e) => setCustomType(e.target.value)}
            />
          )}

          {/* Links section */}
          <div>
            {links.map((link, index) => (
              <div key={index}>
                <Input
                  type="url"
                  placeholder="Lägg till länk"
                  value={link}
                  onChange={(e) => handleLinkChange(index, e)}
                />
                <Button type="button" onClick={() => handleRemoveLink(index)}>
                  Ta bort länk
                </Button>
              </div>
            ))}
            <Button type="button" onClick={handleAddLink}>
              Lägg till länk
            </Button>
          </div>

          {/* Image upload section */}
          <div>
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
            {isUploading && <p>Uploading {Math.round(progress)}%</p>}
            {imageURL && <img src={imageURL} alt="Uploaded Preview" style={{ width: '100px', marginTop: '10px' }} />}
          </div>

          <Button onClick={editingCompetition ? handleUpdateCompetition : handleCreateCompetition}>
            {editingCompetition ? 'Uppdatera Tävling' : 'Skapa Tävling'}
          </Button>
        </CompetitionBox>

        <CompetitionListContainer>
          <Title>Inlagda Tävlingar</Title>
          {competitions.map((competition) => (
            <CompetitionItem key={competition.id}>
              <CompetitionName>{competition.name}</CompetitionName>
              <div>
                <EditIcon onClick={() => handleEditCompetition(competition)} />
                <DeleteIcon onClick={() => handleDeleteCompetition(competition.id)} />
              </div>
            </CompetitionItem>
          ))}
        </CompetitionListContainer>
      </MainContent>
    </CreateCompetitionPage>
  );
};

export default CreateCompetition;














