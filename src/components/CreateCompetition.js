import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { firestore, storage } from '../firebase';
import { Timestamp } from 'firebase/firestore';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { FaTrash } from 'react-icons/fa';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 20px;
  margin: 20px;
  background-color: #FFF;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Box = styled.div`
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

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const ProgressBar = styled.progress`
  width: 100%;
  height: 20px;
  margin-bottom: 10px;
`;

const ModalButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #E94E1B;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #D4411B;
  }
`;

const CompetitionListContainer = styled.div`
  width: 100%;
  max-width: 600px;
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

const LinkContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
`;

const CreateCompetition = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [links, setLinks] = useState(['']); // Array for multiple links
  const [customType, setCustomType] = useState('');
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [competitions, setCompetitions] = useState([]);

  useEffect(() => {
    const fetchCompetitions = async () => {
      const competitionsCollection = collection(firestore, 'competitions');
      const querySnapshot = await getDocs(competitionsCollection);
      const competitionData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        links: doc.data().links || [] // Se till att links är en array
      }));
      setCompetitions(competitionData);
    };

    fetchCompetitions();
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const DEFAULT_IMAGE_URL = 'https://firebasestorage.googleapis.com/v0/b/hoforsbgk.appspot.com/o/competitions%2Fblank.png?alt=media&token=651c0dd1-de67-48b2-85d9-c390448aac97';

  const handleUpload = () => {
    if (!image) return;

    setShowModal(true);

    const storageRef = ref(storage, `competitions/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        console.error(error);
        setShowModal(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageURL(downloadURL);
          setIsUploading(false);
          setShowModal(false);
        });
      }
    );
  };

  const handleCreateCompetition = async () => {
    const competitionCollection = collection(firestore, 'competitions');

    const competitionData = {
      name,
      type: type === 'other' ? customType : type,
      links,
      image: imageURL || DEFAULT_IMAGE_URL,
      createdAt: Timestamp.now(),
    };

    await addDoc(competitionCollection, competitionData);
    setName('');
    setType('');
    setLinks(['']); // Reset links
    setCustomType('');
    setImageURL('');
    setCompetitions([...competitions, competitionData]);
  };

  const handleDeleteCompetition = async (id) => {
    const competitionRef = doc(firestore, 'competitions', id);
    await deleteDoc(competitionRef);
    const updatedCompetitions = competitions.filter((competition) => competition.id !== id);
    setCompetitions(updatedCompetitions);
  };

  const handleSelectChange = (e) => {
    setType(e.target.value);
    if (e.target.value === 'Annat') {
      const storedCustomType = localStorage.getItem('customType');
      if (storedCustomType) {
        setCustomType(storedCustomType);
      }
    }
  };

  const handleCustomTypeChange = (e) => {
    const value = e.target.value;
    setCustomType(value);
    localStorage.setItem('customType', value);
  };

  const handleLinkChange = (index, value) => {
    const updatedLinks = [...links];
    updatedLinks[index] = value;
    setLinks(updatedLinks);
  };

  const addLinkField = () => {
    setLinks([...links, '']);
  };

  const removeLinkField = (index) => {
    const updatedLinks = links.filter((_, i) => i !== index);
    setLinks(updatedLinks);
  };

  return (
    <Container>
      <Box>
        <Title>Lägg in Tävling</Title>
        <Input
          type="text"
          placeholder="Tävlingsnamn"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Select value={type} onChange={handleSelectChange}>
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
            onChange={handleCustomTypeChange}
          />
        )}
        {links.map((link, index) => (
          <LinkContainer key={index}>
            <Input
              type="text"
              placeholder={`Tävlingslänk ${index + 1}`}
              value={link}
              onChange={(e) => handleLinkChange(index, e.target.value)}
            />
            {links.length > 1 && (
              <Button onClick={() => removeLinkField(index)}>Ta bort länk</Button>
            )}
          </LinkContainer>
        ))}
        <Button onClick={addLinkField}>Lägg till länk</Button>
        <Input type="file" onChange={handleFileChange} />
        <Button onClick={handleUpload}>Ladda upp bild</Button>

        {showModal && (
          <ModalBackdrop>
            <ModalContent>
              <h3>Uppladdning pågår...</h3>
              <ProgressBar value={progress} max="100" />
              <ModalButton onClick={() => setShowModal(false)}>OK</ModalButton>
            </ModalContent>
          </ModalBackdrop>
        )}

        <Button onClick={handleCreateCompetition}>Lägg in tävlingen</Button>

        <CompetitionListContainer>
          {competitions.map((competition) => (
            <CompetitionItem key={competition.id}>
              <CompetitionName>{competition.name}</CompetitionName>
              <div>
                {(competition.links || []).map((link, index) => (
                  <a key={index} href={link} target="_blank" rel="noopener noreferrer">Link {index + 1}</a>
                ))}
              </div>
              <DeleteIcon onClick={() => handleDeleteCompetition(competition.id)} />
            </CompetitionItem>
          ))}
        </CompetitionListContainer>
      </Box>
    </Container>
  );
};

export default CreateCompetition;







