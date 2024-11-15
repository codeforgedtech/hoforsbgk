import React from 'react';
import styled from 'styled-components';
import SEO from './SEO';
const RulesContainer = styled.div`
  padding: 20px;
  margin: 20px;
  min-height: 60vh;
  background-color: #FFF;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 10px;
    margin: 10px;
  }
`;

const Title = styled.h1`
  margin-top: 40px;
  margin-bottom: 20px;
  font-size: 2em;
  color: #C37A47;
  text-align: center;

  @media (max-width: 768px) {
    margin-top: 20px;
    font-size: 1.5em;
  }
`;

const RuleWraper = styled.div`
  padding: 20px;
  margin: 20px auto;
  width: 800px;
  border-radius: 10px;

  @media (max-width: 768px) {
    padding: 10px;
    margin: 10px auto;
    width: 90%;
  }
`;

const Rule = styled.p`
  font-size: 18px;
  color: #666666;
  margin-bottom: 20px;
  text-align: justify;

  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 15px;
  }
`;

const Rules = () => {
  return (
    <RulesContainer>
          <SEO title="Regler" description="Läs om reglerna för bangolf." keywords="regler, bangolf, hofors" />  
      <Title>Regler</Title>
      <RuleWraper>
        <Rule>Max sju slag per bana. Det innebär att har du slagit sex slag utan att få i bollen i koppen, så blir ditt resultat på banan sju slag.</Rule>
        <Rule>En tävlingsanläggning har alltid 18 banor.</Rule>
        <Rule>Inget extra slag räknas om bollen lämnar banan. Istället läggs bollen in där den hoppade ur banan.</Rule>
        <Rule>Bollen ska vid första slaget placeras på eller bakom utslagslinjen.</Rule>
        <Rule>På Betong, Filt och MOS får man lov att stå i banan när man puttar. Man ska inte gå i banorna i onödan då detta sliter på banorna och man riskerar även att dra med sig smågrus eller gräs in på banorna som kan vara i vägen för bollens tilltänkta väg.</Rule>
        <Rule>Vid spel på EB-banor får man stå vid sidan av banan. Man får alltså aldrig stå eller gå i banan.</Rule>
        <Rule>SÅ HÄR FLYTTAR DU BOLLEN I BANAN: Ibland behöver bollen flyttas. Det gäller till exempel när bollen hamnar nära sargen eller ett hinder. Bollförflyttningar ska alltid göras med handen. Du får flytta bollen en gång mellan varje slag. De svarta linjerna anger hur långt som du maximalt får flytta bollen. PÅ MOS kan lokala regler förekomma. Generellt gäller att en boll alltid kan alltid flyttas 20 cm från banans avgränsning (sarg) eller 30 cm bakåt från hinder.</Rule>
      </RuleWraper>
    </RulesContainer>
  );
};

export default Rules;
