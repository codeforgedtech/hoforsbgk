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
  width: 98%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    margin: 0 auto;
  }
`;

const FullNewsBox = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  width: 100%;
  max-width: 1220px;
  margin: 0 auto;
  text-align: left;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 15px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    width: 95%;
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
  flex-direction: column;
  gap: 20px;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const Content = styled.div`
  color: #666666;
  font-size: 18px;
  flex: 1;
  border-radius: 8px;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 50%;

  @media (max-width: 768px) {
    width: 100%;
    order: -1;
  }
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
  object-fit: cover;
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
    window.location.href = '/news';
  };

  return (
    <FullNewsContainer>
      <SEO
        title={newsItem.title}
        description="Senaste nyheterna från vår klubb"
        keywords="nyheter, klubb, senaste nyheter"
      />
      <FullNewsBox>
        <Title>{newsItem.title}</Title>
        <ContentContainer>
          <Content dangerouslySetInnerHTML={{ __html: newsItem.content }} />
          <ImageContainer>
            {newsItem.image1 && <Image src={newsItem.image1} alt="news" />}
            {newsItem.image2 && <Image src={newsItem.image2} alt="news" />}
          </ImageContainer>
        </ContentContainer>
        <BackButton onClick={handleBack}>Tillbaka</BackButton>
        {newsItem.competitionLink && (
          <StyledLink
            href={newsItem.competitionLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Resultat
          </StyledLink>
        )}
      </FullNewsBox>
    </FullNewsContainer>
  );
};

export default FullNews;
