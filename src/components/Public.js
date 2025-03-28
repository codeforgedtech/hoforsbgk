import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { firestore } from '../firebase'; // Importera Firestore
import { doc, getDoc } from 'firebase/firestore';
import SEO from './SEO';

const ContentContainer = styled.div`
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
  font-size: 2.5em;
  color: #C37A47;
  font-weight: bold;
  text-align: center;
  letter-spacing: 1.2px;

  @media (max-width: 768px) {
    font-size: 2em;
  }
`;

const Subtitle = styled.p`
  font-size: 1.5em;
  color: #555;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.2em;
  }
`;

const Paragraph = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  width: 100%;
  max-width: 1020px;
  margin: 0 auto;
  text-align: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 15px;
    border-radius: 8px;
    width: 95%;
  }
`;

const Content = () => {
  const [openingHours, setOpeningHours] = useState('');
  const [prices, setPrices] = useState('');

  useEffect(() => {
    const fetchOpeningHours = async () => {
      const docRef = doc(firestore, 'settings', 'openingHours');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setOpeningHours(docSnap.data().content);
      }
    };

    const fetchPrices = async () => {
      const docRef = doc(firestore, 'settings', 'prices');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPrices(docSnap.data().content);
      }
    };

    fetchOpeningHours();
    fetchPrices();
  }, []);

  return (
    <ContentContainer>
      <SEO title="Öppettider" description="Offentlig information om Öppettider" keywords="offentlig, information, Öppettider" />
     
      <Title>Öppettider 2025</Title>
      <Paragraph dangerouslySetInnerHTML={{ __html: openingHours }} />
      
    </ContentContainer>
  );
};

export default Content;


