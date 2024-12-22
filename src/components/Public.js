import React from 'react';
import styled from 'styled-components';
import SEO from './SEO';
const ContentContainer = styled.div`
  padding: 20px;
  margin: 20px;
  background-color: #FFF;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  min-height: 60vh;
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

const Paragraph = styled.p`
  color: #555555;
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 15px;
  text-align: center;
`;

const PriceList = styled.div`
  color: #555555;
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 0;

  & > p {
    margin: 5px 0;
  }
    text-align: center;
`;

const OpeningHours = styled.div`
  margin: 20px 0;
  font-size: 18px;

  & > p {
    margin: 10px 0;
  }

  & b {
    display: block;
    margin-top: 10px;
    font-size: 18px;
    color: #333;
  }

  & i {
    display: block;
    margin-top: 5px;
    font-style: italic;
    color: #777;
  }
    text-align: center;
`;

const Content = () => (
  <ContentContainer>
     <SEO title="Öppettider" description="Offentlig information om Öppetider" keywords="offentlig, information, Öppettider" />

    <Title>Öppettider</Title>
    <Paragraph>
      Hofors Bangolfklubb driver en modern 18-hålsbana i Hofors centrum.
      Godkänd som tävlingsbana av Svenska Bangolfförbundet.
    </Paragraph>
    <Paragraph>
      I skön parkmiljö alldeles intill Hofors centrum kan du och dina vänner spela bangolf på helt nyrustade banor.
    </Paragraph>
    <OpeningHours>
      <p><b>Öppettider 2024</b></p>
      <b>Juni</b>
      <p>Mån - Lör: 13:00 - 20:00</p>
      <p>Sön: 14:00 - 20:00</p>
      <i>Tisdag: Sista utsläpp 17:00 för tävling.</i>
      <b>Juli</b>
      <p>Mån - Lör: 13:00 - 20:00</p>
      <p>Sön: 14:00 - 20:00</p>
      <i>Tisdag: Sista utsläpp 17:00 för tävling.</i>
      <b>Augusti</b>
      <p>(Fram till skolorna börjar)</p>
      <p>Mån - Lör: 13:00 - 20:00</p>
      <p>Sön: 14:00 - 20:00</p>
      <i>Tisdag: Sista utsläpp 17:00 för tävling</i>
    </OpeningHours>
    <PriceList>
      <p><b>Prislista: (per varv)</b></p>
      <p>Vuxna (från 18 år): 60 kr</p>
      <p>Barn 7-17 år: 40 kr</p>
      <p>Pensionär: 40 kr</p>

    </PriceList>
  </ContentContainer>
);

export default Content;