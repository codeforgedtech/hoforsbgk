import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { firestore } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const RulesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  margin: 20px;
  background: linear-gradient(135deg, #f3f4f6, #ffffff);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
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
  width: 80%;
  max-width: 1220px;
  margin: 0 auto;
  text-align: left;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  @media (max-width: 768px) {
    padding: 15px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    width: 80%;
    margin: 0 auto;
    margin-bottom: 20px;
  }
`;

const Rule = styled.div`
  font-size: 18px;
  color: #666666;
  margin-bottom: 20px;
  text-align: justify;
  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 15px;
  }
`;

const Rules = () => {
  const [rules, setRules] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRules = async () => {
      const docRef = doc(firestore, 'rules', 'general');
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const fetchedRules = docSnap.data().rules;

        // Logga den hämtade datan för att kontrollera formatet
        console.log('Hämtad data från Firestore:', fetchedRules);

        setRules(fetchedRules); // Sätt den HTML-formaterade strängen
        setLoading(false);
      } else {
        console.log('No such document!');
        setLoading(false);
      }
    };

    fetchRules();
  }, []);

  return (
    <RulesContainer>
      <Title>Regler</Title>
      <RuleWrapper>
        {loading ? (
          <p>Laddar...</p>
        ) : rules ? (
          <Rule dangerouslySetInnerHTML={{ __html: rules }} /> // Här används dangerouslSetInnerHTML för att rendera HTML
        ) : (
          <p>Inga regler tillgängliga.</p>
        )}
      </RuleWrapper>
    </RulesContainer>
  );
};

export default Rules;



