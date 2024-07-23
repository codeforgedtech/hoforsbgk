import React from 'react';
import styled from 'styled-components';
import SEO from './SEO';
const ContentContainer = styled.div`
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
const ContentWrap = styled.div`
  padding: 20px;
  margin: 20px auto; /* Auto margins för att centrera horisontellt */
  width:800px;

  border-radius: 10px;
   @media (max-width: 768px) {
    padding: 10px;
    margin: 10px auto;
    width: 90%;
  }

 
`;
const Title = styled.h1`
  margin-top: 40px;
  margin-bottom: 20px;
  font-size: 2em;
  color: #C37A47;
  text-align: center;
`;

const Paragraph = styled.p`
  font-size: 16px;
  color: #666666;
  margin-bottom: 20px;
  text-align: justify;
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
  color: #666666;
  margin-bottom: 20px;
  font-size: 16px;
`;

const ListItem = styled.li`
  font-size: 16px;
  line-height: 1.6;
  color: #666666;
`;

const Content = () => (
  <ContentContainer>
     <SEO title="Föreningen" description="Sommaren 2020 startade vi upp Hofors Bangolfklubb igen med en helt ny styrelse efter att Föreningen legat i dvala i några år." keywords="Föreningen, banor,2020" />
    <ContentWrap>
    <Title>Föreningen</Title>
    <Paragraph>
      Sommaren 2020 startade vi upp Hofors Bangolfklubb igen med en helt ny styrelse efter att Föreningen legat i dvala i några år.
    </Paragraph>
    <Paragraph>
      Hela vintern och våren 21 jobbade vi för att få in pengar så vi kunde renovera alla banor med ny filt och underlag. Vi bytte även ut alla utslagsplatser till större betongplattor så det är anpassade för rullstol. 16 Maj 21 öppnade vi och fick en enormt fin första säsong.
    </Paragraph>
    <Paragraph>
      Vi hade PRO och LSS deltagare på inbokade tider hela säsongen. Fick in många nya medlemmar bla ungdomar. Vi hade DM och KM på vår anläggning och våra licensierade spelare spelade även inomhus SM i Eskilstuna. Vi blev uppmärksammade av media för vårt arbete.
    </Paragraph>
    <Paragraph>
      Säsongen 2022 hade Bangolfförbundet lagt ett stort ungdomsläger under Kristihimmelfärdshelgen hos oss och sista helgen i juli arrangerade vi ungdoms SM.
    </Paragraph>
    <Paragraph>
      Sommaren 2023 så var OTSM (oldtimers) förlagt här hos oss! Det är ett väldigt stort Svenskt mästerskap med ca 150 deltagare!
    </Paragraph>
    <Title>Styrelsen</Title>
    <List>
      <ListItem>Ordförande: Marie Ihren</ListItem>
      <ListItem>Vice ordförande: Rasmus Bergqvist</ListItem>
      <ListItem>Kassör: Anna Magnusson</ListItem>
      <ListItem>Sekreterare: Anders Landström</ListItem>
      <ListItem>Ledamöter: Anna-Lena Holmstrand, Anders Bergqvist, Kenneth Elfström</ListItem>
      <ListItem>Valberedning: Benneth Leanders</ListItem>
      <ListItem>Revisor: Tommy Leanders</ListItem>
    </List>
    <Title>Övriga roller</Title>
    <List>
      <ListItem>Tävlingsledare: Anna-Lena Holmstrand</ListItem>
      <ListItem>Domare: Rasmus Bergqvist, Marie Ihren, Micke Lindh</ListItem>
      <ListItem>Ungdomsansvarig: Rasmus Bergqvist, Anders Landström, Christian Modén, Anna-Lena Holmstrand</ListItem>
      <ListItem>UK ( uttagningsansvarig ): Rasmus Bergqvist </ListItem>
      <ListItem>Hemsidans Administratör och ansvarige: Christer Holm</ListItem>
    </List>
    </ContentWrap>
  </ContentContainer>
);

export default Content;
