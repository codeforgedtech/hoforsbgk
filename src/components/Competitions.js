import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { firestore } from '../firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import SEO from './SEO';

const CompetitionsContainer = styled.div`
  padding: 20px;
  margin: 20px;
  min-height: 60vh;
  background-color: #FFF;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  margin-top: 40px;
  margin-bottom: 20px;
  font-size: 2em;
  color: #C37A47;
  text-align: center;
`;

const CompetitionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;

const CompetitionItem = styled.div`
  position: relative;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
`;

const CompetitionImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
`;

const OverlayContainer = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 5px 10px;
  border-radius: 5px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const NameOverlay = styled.h2`
  margin: 0;
  color: white;
`;

const CompetitionLink = styled.a`
  color: #E94E1B;
  text-decoration: none;
  background-color: white;
  padding: 5px 10px;
  border-radius: 5px;
  margin-top: 5px; /* Add some space on mobile */

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    align-self: flex-start; /* Align link to the left on mobile */
  }
`;

const CompetitionType = styled.p`
  position: absolute;
  top: 10px;
  right: 10px;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 5px 10px;
  border-radius: 5px;
`;

const CompetitionDetails = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
`;

const Type = styled.p`
  color: #666666;
  margin: 0 0 10px 0;
`;

const NoCompetitionsMessage = styled.p`
  text-align: center;
  color: #666666;
  font-size: 1.2em;
`;

const Competitions = () => {
  const [competitions, setCompetitions] = useState([]);

  useEffect(() => {
    const fetchCompetitions = async () => {
      const competitionsCollection = collection(firestore, 'competitions');
      const q = query(competitionsCollection, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const competitionsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCompetitions(competitionsData);
    };

    fetchCompetitions();
  }, []);

  const DEFAULT_IMAGE_URL = 'https://firebasestorage.googleapis.com/v0/b/hoforsbgk.appspot.com/o/competitions%2Fblank.png?alt=media&token=651c0dd1-de67-48b2-85d9-c390448aac97'; // Länk till standardbilden

  return (
    <CompetitionsContainer>
      <SEO title="Tävlingar" description="Delta i våra bangolftävlingar." keywords="tävlingar, bangolf, hofors" />
      <Title>Tävlingar</Title>
      {competitions.length === 0 ? (
        <NoCompetitionsMessage>Beklagar, inga resultat inlagda.</NoCompetitionsMessage>
      ) : (
        <CompetitionsGrid>
          {competitions.map(item => (
            <CompetitionItem key={item.id}>
              <ImageContainer>
                <CompetitionImage src={item.image || DEFAULT_IMAGE_URL} alt={item.name} />
                <OverlayContainer>
                  <NameOverlay>{item.name}</NameOverlay>
                  {item.links && item.links.length > 0 && (
                    <CompetitionDetails>
                      {item.links.map((link, index) => (
                        <CompetitionLink key={index} href={link} target="_blank" rel="noopener noreferrer">
                          Resultat {index + 1}
                        </CompetitionLink>
                      ))}
                    </CompetitionDetails>
                  )}
                </OverlayContainer>
                <CompetitionType>{item.type}</CompetitionType>
              </ImageContainer>
            </CompetitionItem>
          ))}
        </CompetitionsGrid>
      )}
    </CompetitionsContainer>
  );
};

export default Competitions;









