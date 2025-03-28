import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { firestore } from '../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Sidebar from './Sidebar';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 60vh;
`;

const ContentWrapper = styled.div`
  flex: 1;
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

const TextWrapper = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  width: 100%;
  max-width: 1220px;
  text-align: left;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
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

const AdminFörening = () => {
  const [föreningText, setFöreningText] = useState('');
  const [styrelseText, setStyrelseText] = useState('');
  const [editorFörening, setEditorFörening] = useState('');
  const [editorStyrelse, setEditorStyrelse] = useState('');
  const [isEditingFörening, setIsEditingFörening] = useState(false);
  const [isEditingStyrelse, setIsEditingStyrelse] = useState(false);

  // Hämta data från Firestore vid sidladdning
  useEffect(() => {
    const fetchTexts = async () => {
      const docRef = doc(firestore, 'föreningstext', 'content');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFöreningText(docSnap.data().föreningText);
        setStyrelseText(docSnap.data().styrelseText);
        setEditorFörening(docSnap.data().föreningText);
        setEditorStyrelse(docSnap.data().styrelseText);
      }
    };
    fetchTexts();
  }, []);

  // Hantera redigering av föreningstext
  const toggleEditFörening = () => {
    setIsEditingFörening(!isEditingFörening);
  };

  const handleSaveFörening = async () => {
    const docRef = doc(firestore, 'föreningstext', 'content');
    await setDoc(docRef, { föreningText: editorFörening, styrelseText }); // Sparar endast föreningstext
    setFöreningText(editorFörening);
    setIsEditingFörening(false);
  };

  // Hantera redigering av styrelsetext
  const toggleEditStyrelse = () => {
    setIsEditingStyrelse(!isEditingStyrelse);
  };

  const handleSaveStyrelse = async () => {
    const docRef = doc(firestore, 'föreningstext', 'content');
    await setDoc(docRef, { föreningText, styrelseText: editorStyrelse }); // Sparar endast styrelsetext
    setStyrelseText(editorStyrelse);
    setIsEditingStyrelse(false);
  };

  return (
    <Container>
      <Sidebar />
      <ContentWrapper>
        <Title>Föreningen</Title>

        {/* Föreningens text */}
        <TextWrapper>
          <h2>Föreningens text</h2>
          {isEditingFörening ? (
            <ReactQuill value={editorFörening} onChange={setEditorFörening} theme="snow" />
          ) : (
            <div dangerouslySetInnerHTML={{ __html: föreningText }} />
          )}
          {isEditingFörening ? (
            <Button save onClick={handleSaveFörening}>Spara ändringar</Button>
          ) : (
            <Button onClick={toggleEditFörening}>Redigera</Button>
          )}
        </TextWrapper>

        {/* Styrelsens text */}
        <TextWrapper>
          <h2>Styrelsens text</h2>
          {isEditingStyrelse ? (
            <ReactQuill value={editorStyrelse} onChange={setEditorStyrelse} theme="snow" />
          ) : (
            <div dangerouslySetInnerHTML={{ __html: styrelseText }} />
          )}
          {isEditingStyrelse ? (
            <Button save onClick={handleSaveStyrelse}>Spara ändringar</Button>
          ) : (
            <Button onClick={toggleEditStyrelse}>Redigera</Button>
          )}
        </TextWrapper>
      </ContentWrapper>
    </Container>
  );
};

export default AdminFörening;









