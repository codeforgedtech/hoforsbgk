import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { firestore } from '../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import ReactQuill from 'react-quill'; // Importera React Quill
import 'react-quill/dist/quill.snow.css'; // Importera Quill CSS
import Sidebar from './Sidebar';

const Container = styled.div`
  display: flex;
  flex-direction: col;
  min-height: 60vh;

  @media (min-width: 768px) {
    flex-direction: col; // Sätt flexbox-raden när skärmen är större än 768px
  }
`;




const ContentWrapper = styled.div`
  flex: 1; /* Tar upp resten av utrymmet */
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  margin-bottom: 40px;
  font-size: 2.5em;
  color: #C37A47;
  font-weight: bold;
  text-align: center;
  letter-spacing: 1px;
  @media (max-width: 768px) {
    font-size: 1.8em;
  }
`;

const AvgiftWrapper = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  width: 100%;
  max-width: 1220px;
  text-align: left;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  @media (max-width: 768px) {
    padding: 15px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    width: 80%;
    margin-bottom: 20px;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: ${(props) => (props.save ? '#28a745' : '#007bff')};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
`;
const Avgift = styled.p`
font-size: 18px;
color: #666666;
margin-bottom: 20px;
text-align: justify;
@media (max-width: 768px) {
  font-size: 16px;
  margin-bottom: 15px;
}
`;

const AdminAvgift = () => {
  const [avgift, setAvgift] = useState('');
  const [editorValue, setEditorValue] = useState(''); // Hanterar redigeringsvärdet
  const [isEditing, setIsEditing] = useState(false);

  // Hämtar text från Firestore vid sidladdning
  useEffect(() => {
    const fetchAvgift = async () => {
      const docRef = doc(firestore, 'avgifter', 'general');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setAvgift(docSnap.data().avgift);
        setEditorValue(docSnap.data().avgift);
      } else {
        console.log('No such document!');
      }
    };
    fetchAvgift();
  }, []);

  // Hantera ändringar i editorn
  const handleEditorChange = (value) => {
    setEditorValue(value);
  };

  // Växla mellan redigering och visning
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Spara uppdaterad text till Firestore
  const handleSave = async () => {
    const docRef = doc(firestore, 'avgifter', 'general');
    await setDoc(docRef, { avgift: editorValue }); // OBS: Fixade "rules" till "avgift"
    setAvgift(editorValue);
    setIsEditing(false);
  };

  return (
    <Container>
    
        <Sidebar />


      <ContentWrapper>
        <Title>Avgifter</Title>
        <AvgiftWrapper>
        <Avgift>
        {isEditing ? (
          <ReactQuill
            value={editorValue}
            onChange={handleEditorChange}
            readOnly={!isEditing} // Gör fältet skrivskyddat när det inte redigeras
            theme="snow"
            modules={{
              toolbar: isEditing
                ? [
                    [{ header: '1' }, { header: '2' }, { font: [] }],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    ['bold', 'italic', 'underline'],
                    ['link'],
                    ['blockquote'],
                    [{ align: [] }],
                    ['image'],
                  ]
                : false, // Dölj toolbar om inte i redigeringsläge
            }}
          />

) : (
                <div dangerouslySetInnerHTML={{ __html:avgift }} />
                )}
                </Avgift>
          {isEditing ? (
            <Button save onClick={handleSave}>Spara ändringar</Button>
          ) : (
            <Button onClick={toggleEdit}>Redigera</Button>
          )}
        </AvgiftWrapper>
      </ContentWrapper>
    </Container>
  );
};

export default AdminAvgift;
