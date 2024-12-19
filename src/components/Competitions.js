import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { firestore } from '../firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';

const FullCompetitionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  padding: 40px 30px;
  margin: 20px;
  background: linear-gradient(135deg, #f3f4f6, #ffffff);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
`;

const CompetitionsBox = styled.div`
  background-color: #ffffff;
  padding: 50px;
  border-radius: 20px;
  width: 100%;
  max-width: 1000px;
  text-align: left;
`;

const Title = styled.h1`
  margin-top: 0;
  margin-bottom: 40px;
  font-size: 3em;
  color: #C37A47;
  font-weight: bold;
  text-align: center;
  letter-spacing: 1.2px;
`;

const CompetitionsList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: center;
`;

const CompetitionItem = styled.li`
  background-color: #ffffff;
  border: 2px solid #ececec;
  border-radius: 15px;
  padding: 20px;
  width: calc(25% - 20px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s, box-shadow 0.3s;

  @media (max-width: 768px) {
    width: calc(50% - 20px);
  }
  @media (max-width: 480px) {
    width: calc(100% - 20px);
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }
`;

const CompetitionImage = styled.img`
  width: 100%;
  height: 250px;
  border-radius: 15px;
  object-fit: cover;
  margin-bottom: 20px;
`;

const CompetitionName = styled.h2`
  font-size: 2em;
  margin: 15px 0 10px;
  color: #C37A47;
  font-weight: bold;
  text-align: center;
`;

const CompetitionType = styled.p`
  font-size: 1.4em;
  color: #666;
  margin: 10px 0;
  text-align: center;
`;

const LinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15px;
`;

const StyledLink = styled.a`
  display: inline-block;
  margin-top: 10px;
  padding: 12px 30px;
  font-size: 16px;
  background-color: #C37A47;
  color: white;
  border-radius: 30px;
  text-decoration: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: #b2693f;
    transform: translateY(-2px);
  }
`;

const NoCompetitionsMessage = styled.p`
  text-align: center;
  color: #555;
  font-size: 1.5em;
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
        ...doc.data(),
      }));
      setCompetitions(competitionsData);
    };

    fetchCompetitions();
  }, []);

  const DEFAULT_IMAGE_URL =
    'https://firebasestorage.googleapis.com/v0/b/hoforsbgk.appspot.com/o/competitions%2Fblank.png?alt=media&token=651c0dd1-de67-48b2-85d9-c390448aac97';

  return (
    <FullCompetitionsContainer>
      <Title>Tävlingar</Title>
      {competitions.length === 0 ? (
        <NoCompetitionsMessage>Beklagar, inga tävlingar är inlagda.</NoCompetitionsMessage>
      ) : (
        <CompetitionsList>
          {competitions.map(competition => (
            <CompetitionItem key={competition.id}>
              <CompetitionImage src={competition.image || DEFAULT_IMAGE_URL} alt={competition.name} />
              <CompetitionName>{competition.name}</CompetitionName>
              <CompetitionType>{competition.type}</CompetitionType>
              {competition.links && competition.links.length > 0 && (
                <LinksContainer>
                  {competition.links.map((link, index) => (
                    <StyledLink key={index} href={link} target="_blank" rel="noopener noreferrer">
                      {`Se resultat ${index + 1}`}
                    </StyledLink>
                  ))}
                </LinksContainer>
              )}
            </CompetitionItem>
          ))}
        </CompetitionsList>
      )}
    </FullCompetitionsContainer>
  );
};

export default Competitions;











