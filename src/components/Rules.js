import React from 'react';
import styled from 'styled-components';
import SEO from './SEO';

const RulesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  
  margin: 20px;
  background: linear-gradient(135deg, #f3f4f6, #ffffff);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h1`
  grid-column: 1 / -1;
  margin-bottom: 40px;
  font-size: 2.5em;
  color: #C37A47;
  font-weight: bold;
  text-align: center;
  letter-spacing: 1px;

  @media (max-width: 768px) {
    font-size: 1.8em;
  }
`;

const RuleWraper = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  grid-column: 1 / -1; /* Makes the wrapper span the whole width */

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    padding: 15px;
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

