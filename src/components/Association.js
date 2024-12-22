import React, { useState } from 'react';
import styled from 'styled-components';
import SEO from './SEO';
import Intyg from "../assets/intyg.png";
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
 background-color: #ffffff;
padding: 40px;
border-radius: 10px;
width: 98%;
max-width: 1220px; /* Bredden för desktop */
margin: 0 auto; /* Centrera innehållet */
text-align: left;
box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 10px;
    margin: 10px auto;
    width: 90%;
  }
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
  font-size: 18px;
  color: #666666;
  margin-bottom: 20px;
  text-align: justify;
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
  color: #666666;
  margin-bottom: 20px;
  font-size: 18px;
`;

const ListItem = styled.li`
  font-size: 18px;
  line-height: 1.6;
  color: #666666;
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const Tab = styled.button`
  background-color: ${(props) => (props.active ? '#C37A47' : '#FFF')};
  color: ${(props) => (props.active ? '#FFF' : '#666')};
  border: 1px solid #C37A47;
  padding: 10px 20px;
  margin: 0 5px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #C37A47;
    color: #FFF;
  }
`;

const Content = () => {
  const [activeTab, setActiveTab] = useState('föreningen');

  return (
    <ContentContainer>
      <SEO
        title="Föreningen"
        description="Sommaren 2020 startade vi upp Hofors Bangolfklubb igen med en helt ny styrelse efter att Föreningen legat i dvala i några år."
        keywords="Föreningen, banor, 2020"
      />
      <TabContainer>
        <Tab active={activeTab === 'föreningen'} onClick={() => setActiveTab('föreningen')}>
          Föreningen
        </Tab>
        <Tab active={activeTab === 'intyg'} onClick={() => setActiveTab('intyg')}>
          Intyg
        </Tab>
      </TabContainer>
      <ContentWrap>
        {activeTab === 'föreningen' && (
          <>
            <Title>Föreningen</Title>
            <Paragraph>
              Sommaren 2020 startade vi upp Hofors Bangolfklubb igen med en helt ny styrelse efter att Föreningen legat i dvala i några år.
            </Paragraph>
            <Paragraph>
              Hela vintern och våren 21 jobbade vi för att få in pengar så vi kunde renovera alla banor med ny filt och underlag. 
              Vi bytte även ut alla utslagsplatser till större betongplattor så det är anpassade för rullstol. 16 Maj 21 öppnade 
              vi och fick en enormt fin första säsong.
            </Paragraph>
            <Paragraph>
              Vi hade PRO och LSS deltagare på inbokade tider hela säsongen. Fick in många nya medlemmar bla ungdomar. Vi hade DM och KM 
              på vår anläggning och våra licensierade spelare spelade även inomhus SM i Eskilstuna. Vi blev uppmärksammade av media för vårt arbete.
            </Paragraph>
            <Paragraph>
              Säsongen 2022 hade Bangolfförbundet lagt ett stort ungdomsläger under Kristihimmelfärdshelgen hos oss och sista helgen i juli arrangerade 
              vi ungdoms SM.
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
              <ListItem>UK (uttagningsansvarig): Rasmus Bergqvist</ListItem>
              <ListItem>Hemsidans Administratör och ansvarige: Christer Holm</ListItem>
            </List>
          </>
        )}
        {activeTab === 'intyg' && (
          <>
            <Title>Intyg</Title>
            <Paragraph>
              Här är våra intyg och erkännanden som föreningen har fått under åren.
            </Paragraph>
            <List>
              <ListItem>
                
<img src={Intyg} alt="intyg" width="50%"/>

              </ListItem>
             
            </List>
          </>
        )}
      </ContentWrap>
    </ContentContainer>
  );
};

export default Content;


