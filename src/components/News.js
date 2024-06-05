import React from 'react';
import styled from 'styled-components';

const ContentContainer = styled.div`
  padding: 20px;
  margin: 20px;
  background-color: #FFF;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  color: #4A4A4A;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1); /* Skugga för titeln */
`;

const NewsList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const NewsItem = styled.li`
  margin-bottom: 10px;
`;

const Content = () => (
  <ContentContainer>
    <Title>Nyheter</Title>
    <NewsList>
      <NewsItem>
        <strong>Senaste nytt:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </NewsItem>
      <NewsItem>
        <strong>Aktuell uppdatering:</strong> Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </NewsItem>
      <NewsItem>
        <strong>Exklusiv rapport:</strong> Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </NewsItem>
    </NewsList>
  </ContentContainer>
);

export default Content;