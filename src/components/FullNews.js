import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../firebase';
import SEO from './SEO';

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

const FullNewsBox = styled.div`
  background-color: #ffffff;
  padding: 40px;
  border-radius: 10px;
  width: 100%;
  max-width: 600px;
  text-align: left;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: #333333;
  font-size: 24px;
`;

const Content = styled.div`
  color: #666666;
  font-size: 16px;
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
  margin: 10px 0;
  border-radius: 10px;
`;

const BackButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
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
        {newsItem.image1 && <Image src={newsItem.image1} alt="news" />}
        <Content dangerouslySetInnerHTML={{ __html: newsItem.content }} />
        {newsItem.image2 && <Image src={newsItem.image2} alt="news" />}
        {newsItem.competitionLink && (
          <StyledLink href={newsItem.competitionLink} target="_blank" rel="noopener noreferrer">
            Resultat
          </StyledLink>
        )}
        <BackButton onClick={handleBack}>Tillbaka</BackButton>
      </FullNewsBox>
    </FullNewsContainer>
  );
};

export default FullNews;


