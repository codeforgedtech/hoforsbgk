import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../firebase';
import SEO from './SEO';

const FullNewsContainer = styled.div`
  padding: 20px;
  margin: 20px;
  min-height: 60vh;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 98%; /* Make sure container spans the full width */
  box-sizing: border-box; /* Include padding and border in the element's total width and height */
@media (max-width: 768px) {
  display: flex; /* Flexbox för centrering */
  justify-content: center; /* Centrera horisontellt */
  align-items: center; /* Centrera vertikalt */
  min-height: 100vh; /* Se till att containern sträcker sig över hela skärmen */
  margin: 0 auto; /* Centrera även horisontellt med auto-marginaler */
`;

const FullNewsBox = styled.div`
background-color: #ffffff;
padding: 20px; /* Mindre padding för mobil */
border-radius: 10px;
width: 100%; /* Anpassar bredden för mobil */
max-width: 1220px; /* Breddbegränsning för desktop */
margin: 0 auto; /* Centrera innehållet */
text-align: left;
box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1); /* Mindre skugga för ett mjukare utseende */

@media (max-width: 768px) {
  padding: 15px; /* Ännu mindre padding för smala skärmar */
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1); /* Mildare skugga för mobil */
  border-radius: 8px; /* Lite rundare hörn */
  width: 95%; /* Mindre bredd för att passa skärmen */
  margin: 0 auto;
}
`;

const Title = styled.h2`
  margin-top: 0;
  margin-bottom: 40px;
  font-size: 3em;
  color: #C37A47;
  font-weight: bold;
  text-align: center;
  letter-spacing: 1.2px;
@media (max-width: 768px) {
  
  font-size: 2em;
  
}
`;
const ContentContainer = styled.div`
  display: flex;
  flex-direction: column; /* Bilden är högst upp på mobil */
  gap: 20px;

  @media (min-width: 768px) {
    flex-direction: row; /* Bilden och texten bredvid varandra på desktop */
    align-items: flex-start;
  }
`;

const Content = styled.div`
color: #666666;
  font-size: 18px;
  flex: 1; /* Take up remaining space */
  border-radius: 8px
`;

const Image = styled.img`
  width: 100%; /* Full bredd på mobil */
  height: auto;
  border-radius: 10px;
  object-fit: cover;

  /* Placera bilden högst upp på mobil */
  order: -1;

  @media (min-width: 768px) {
    width: 50%; /* Halva bredden på desktop */
    margin-right: 20px; /* Mellanrum mellan bild och text */
    order: 0; /* Återställ ordningen på desktop */
  }
`;

const BackButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  margin-right: 10px;
  background-color: #E94E1B;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #D4411B;
  }
`;

const StyledLink = styled.a`
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #1E90FF;
  color: white;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  text-align: center;

  &:hover {
    background-color: #1C86EE;
  }
`;

const FullNews = () => {
  const { id } = useParams();
  const [newsItem, setNewsItem] = useState(null);

  useEffect(() => {
    const fetchNewsItem = async () => {
      const newsDoc = doc(firestore, 'news', id);
      const newsSnapshot = await getDoc(newsDoc);
      if (newsSnapshot.exists()) {
        setNewsItem(newsSnapshot.data());
      }
    };

    fetchNewsItem();
  }, [id]);

  if (!newsItem) {
    return <div>Loading...</div>;
  }

  const handleBack = () => {
    window.location.href = '/news'; // Navigate to the /news route
  };

  return (
    <FullNewsContainer>
      <SEO title={newsItem.title} description="Senaste nyheterna från vår klubb" keywords="nyheter, klubb, senaste nyheter" />
      <FullNewsBox>
      <Title>{newsItem.title}</Title>
        <ContentContainer>
        <Content dangerouslySetInnerHTML={{ __html: newsItem.content }} />
          {newsItem.image1 && <Image src={newsItem.image1} alt="news" />}
         
        </ContentContainer>
       
        <BackButton onClick={handleBack}>Tillbaka</BackButton>
        {newsItem.image2 && <Image src={newsItem.image2} alt="news" />}
        {newsItem.competitionLink && (
          <StyledLink href={newsItem.competitionLink} target="_blank" rel="noopener noreferrer">
            Resultat
          </StyledLink>
        )}
      </FullNewsBox>
    </FullNewsContainer>
  );
};

export default FullNews;



