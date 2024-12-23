import React from 'react';
import styled from 'styled-components';
import SEO from './SEO';

const ContentContainer = styled.div`
  padding: 20px;
  margin: 20px auto; /* Centrera horisontellt */
  min-height: 60vh;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 98%; /* Nästan full bredd */
  max-width: 1220px; /* Begränsa bredden */
  box-sizing: border-box;

  display: flex; /* Flexbox-layout */
  flex-direction: column; /* Stapla innehåll */
  justify-content: center; /* Centrera vertikalt */
  align-items: center; /* Centrera horisontellt */

  @media (max-width: 768px) {
    padding: 10px;
    margin: 10px auto;
    min-height: 100vh; /* Sträck över hela höjden */
  }
`;

const Title = styled.h1`
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 2.5em;
  color: #C37A47;
  font-weight: bold;
  text-align: center;
  letter-spacing: 1.2px;

  @media (max-width: 768px) {
    font-size: 2em; /* Mindre textstorlek på mobil */
    margin-bottom: 15px; /* Mindre marginaler */
  }
`;

const Title2 = styled.h2`
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 2em;
  color: #C37A47;
  font-weight: bold;
  text-align: center;
  letter-spacing: 1.2px;

  @media (max-width: 768px) {
    font-size: 1.5em; /* Anpassad textstorlek */
    margin-bottom: 15px;
  }
`;

const Subtitle = styled.p`
  font-size: 1.5em;
  color: #555;
  text-align: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 1.2em; /* Mindre textstorlek */
    margin-bottom: 10px;
  }
`;

const Paragraph = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  width: 100%;
  max-width: 1020px; /* Begränsa bredden */
  margin: 0 auto;
  text-align: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 15px; /* Mindre padding */
    border-radius: 8px; /* Rundare hörn */
    width: 95%; /* Anpassa bredden för små skärmar */
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1); /* Mjukare skugga */
  }
`;

const Content = () => (
  <ContentContainer>
    <SEO title="Öppettider" description="Offentlig information om Öppetider" keywords="offentlig, information, Öppettider" />

    <Subtitle>Kommer snart</Subtitle>
    <Title>Öppettider 2025</Title>
    <Paragraph>
      Hofors Bangolfklubb driver en modern 18-hålsbana i Hofors centrum.<p></p>
      Godkänd som tävlingsbana av Svenska Bangolfförbundet.<p></p>
      I skön parkmiljö alldeles intill Hofors centrum kan du och dina vänner spela bangolf på helt nyrustade banor.
      <Title2>Prislista: (per varv)</Title2>
      <p>Vuxna (från 18 år): 60 kr</p>
      <p>Barn 7-17 år: 40 kr</p>
      <p>Pensionär: 40 kr</p>
    </Paragraph>
  </ContentContainer>
);

export default Content;

