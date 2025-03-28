import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { firestore } from '../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Sidebar from './Sidebar';

const RulesContainer = styled.div`
  display: flex;
  flex-direction: col;
  min-height: 60vh;

  @media (min-width: 768px) {
    flex-direction: col; // Sätt flexbox-raden när skärmen är större än 768px
  }
`;





const ContentWrapper = styled.div`
  flex: 1; /* Låter innehållet ta upp resten av utrymmet */
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

const RuleWrapper = styled.div`
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

const Rule = styled.p`
  font-size: 18px;
  color: #666666;
  margin-bottom: 20px;
  text-align: justify;
  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 15px;
  }
`;

const EditButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
`;

const SaveButton = styled.button`
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
`;

const AdminRules = () => {
  const [rules, setRules] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editorValue, setEditorValue] = useState('');

  useEffect(() => {
    const fetchRules = async () => {
      const docRef = doc(firestore, 'rules', 'general');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const fetchedRules = docSnap.data().rules;
        setRules(fetchedRules);
        setEditorValue(fetchedRules);
      } else {
        console.log('No such document!');
      }
    };

    fetchRules();
  }, []);

  const handleEditorChange = (value) => {
    setEditorValue(value);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    const docRef = doc(firestore, 'rules', 'general');
    await setDoc(docRef, { rules: editorValue });
    setRules(editorValue);
    setIsEditing(false);
  };

  return (
    <RulesContainer>
      {/* Sidebar till vänster */}

        <Sidebar />
   

      {/* Innehåll till höger */}
      <ContentWrapper>
        <Title>Regler</Title>
        <RuleWrapper>
          <Rule>
            {isEditing ? (
              <ReactQuill
                value={editorValue}
                onChange={handleEditorChange}
                modules={{
                  toolbar: [
                    [{ header: '1' }, { header: '2' }, { font: [] }],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    ['bold', 'italic', 'underline'],
                    ['link'],
                    ['blockquote'],
                    [{ align: [] }],
                    ['image'],
                  ],
                }}
              />
                ) : (
                <div dangerouslySetInnerHTML={{ __html: rules }} />
                )}
          </Rule>

          {isEditing ? (
            <SaveButton onClick={handleSave}>Spara ändringar</SaveButton>
          ) : (
            <EditButton onClick={handleEdit}>Redigera</EditButton>
          )}
        </RuleWrapper>
      </ContentWrapper>
    </RulesContainer>
  );
};

export default AdminRules;




