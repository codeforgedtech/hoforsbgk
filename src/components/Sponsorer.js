import React from 'react';
import styled from 'styled-components';

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

const Title = styled.h1`
  margin-top: 40px;
  margin-bottom: 20px;
  font-size: 2em;
  color: #C37A47;
  text-align: center;
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
  width: calc(33% - 20px); /* Adjust for 3 items per row */
  @media (max-width: 768px) {
    width: calc(50% - 20px); /* Adjust for 2 items per row on smaller screens */
  }
  @media (max-width: 480px) {
    width: calc(100% - 20px); /* Adjust for 1 item per row on very small screens */
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

const BackButton = styled.button`
   margin: 10px;
  padding: 10px 20px;
  background-color: #C37A47;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #C37A47;
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
    background-color: #C37A47;
  }
`;

const Sponsors = () => (
  <FullNewsContainer>
    <Title>Sponsorer</Title>
    <NewsList>
      {[...Array(30)].map((_, index) => (
        <NewsItem key={index}>
          <NewsImage 
            src={`${process.env.PUBLIC_URL}/assets/sponsorer/sponsor${index + 1}.jpg`} 
            alt={`Sponsor ${index + 1}`} 
          />
        </NewsItem>
      ))}
    </NewsList>
    <StyledLink href="/">Tillbaka</StyledLink>
  </FullNewsContainer>
);

export default Sponsors;
