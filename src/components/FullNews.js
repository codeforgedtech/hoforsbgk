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
`;

const FullNewsBox = styled.div`
  background-color: #ffffff;
  padding: 40px;
  border-radius: 10px;
  width: 98%;
  max-width: 2500px; /* Adjust as needed */
  text-align: left;
  box-sizing: border-box; /* Include padding in width calculation */
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: #333333;
  font-size: 30px;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column; /* Default direction for mobile */
  gap: 20px;
 
  @media (min-width: 768px) {
    flex-direction: row; /* Side by side on desktop */
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
  width: 100%; /* Default to full width on mobile */
  height: auto;
  border-radius: 10px;
  object-fit: cover; /* Ensure the image covers the space nicely */

  @media (min-width: 768px) {
    width: 50%; /* 50% width on desktop */
    margin-right: 20px; /* Space between image and text on desktop */
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



