import React from 'react';
import styled from 'styled-components';

const ContentContainer = styled.div`
  padding: 20px;
  margin: 20px;
  min-height: 60vh;
  background-color: #FFF;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;


const Title = styled.h1`
 margin-top:40px;
  margin-bottom:20px;
  font-size: 2em;
  color: #C37A47;
  text-align: center; /* Centrera titeln horisontellt */

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
    <Title>Medlem</Title>
    <NewsList>
    
      
    </NewsList>
  </ContentContainer>
);

export default Content;