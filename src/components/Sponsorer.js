import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { firestore } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const FullNewsContainer = styled.div`
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

const Title = styled.h1`
  font-size: 3em;
  color: #C37A47;
  font-weight: bold;
  text-align: center;
  letter-spacing: 1.2px;
`;

const NewsList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const NewsItem = styled.li`
  margin: 10px;
  width: calc(33% - 20px);

  @media (max-width: 768px) {
    width: calc(50% - 20px);
  }
  @media (max-width: 480px) {
    width: calc(100% - 20px);
  }
`;

const NewsImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  }
`;

const StyledLink = styled.a`
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #C37A47;
  color: white;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  text-align: center;

  &:hover {
    background-color: #b5693c;
  }
`;

const Sponsors = () => {
  const [sponsors, setSponsors] = useState([]);

  useEffect(() => {
    const fetchSponsors = async () => {
      const querySnapshot = await getDocs(collection(firestore, 'sponsors'));
      const sponsorList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSponsors(sponsorList);
    };

    fetchSponsors();
  }, []);

  return (
    <FullNewsContainer>
      <Title>Sponsorer</Title>
      <NewsList>
        {sponsors.map((sponsor) => (
          <NewsItem key={sponsor.id}>
            {sponsor.sponsorLink ? (
              <a href={sponsor.sponsorLink} target="_blank" rel="noopener noreferrer">
                <NewsImage src={sponsor.imageUrl} alt="Sponsor" />
              </a>
            ) : (
              <NewsImage src={sponsor.imageUrl} alt="Sponsor" />
            )}
          </NewsItem>
        ))}
      </NewsList>
      <StyledLink href="/">Tillbaka</StyledLink>
    </FullNewsContainer>
  );
};

export default Sponsors;

