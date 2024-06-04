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
`;

const Content = () => (
  <ContentContainer>
    <Title>Nyheter</Title>
    <p>Page content goes here.</p>
  </ContentContainer>
);

export default Content;