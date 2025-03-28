import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { firestore } from '../firebase';
import { doc, getDocs, collection, getDoc} from 'firebase/firestore';
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
  background-color: #ffffff;
  padding: 40px;
  border-radius: 10px;
  width: 98%;
  max-width: 1220px;
  margin: 0 auto;
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

const IntygImage = styled.img`
  width: 50%;
  display: block;
  margin: 20px auto;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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
  const [foreningText, setForeningText] = useState('');
  const [styrelseText, setStyrelseText] = useState('');
  const [intygList, setIntygList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Hämtar föreningens text från Firestore
      const docRef = doc(firestore, 'föreningstext', 'content');
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const fetchedForeningText = docSnap.data().föreningText;
        const fetchedStyrelseText = docSnap.data().styrelseText;
        
        console.log('Hämtad föreningens text:', fetchedForeningText);
        console.log('Hämtad styrelsens text:', fetchedStyrelseText);

        setForeningText(fetchedForeningText);
        setStyrelseText(fetchedStyrelseText);
      } else {
        console.log('No such document!');
      }

      // Hämtar intyg från Firestore
      const querySnapshot = await getDocs(collection(firestore, 'intyg'));
      const intygData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        fileUrl: doc.data().fileUrl,
      }));
      setIntygList(intygData); // Sätt listan med intyg
    };

    fetchData(); // Kör båda funktionerna vid samma gång
  }, []); // Tom array innebär att detta körs vid första renderin // Tom array innebär att detta körs vid första renderingen

  return (
    <ContentContainer>
      <SEO title="Föreningen" description="Information om föreningen och dess erkännanden." keywords="Föreningen, intyg, Hofors Bangolfklubb" />

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
            <Paragraph dangerouslySetInnerHTML={{ __html: foreningText || "Laddar föreningens information..." }} />
            <Title>Styrelsen</Title>
            <Paragraph dangerouslySetInnerHTML={{ __html: styrelseText || "Laddar styrelsens information..." }} />
          </>
        )}

        {activeTab === 'intyg' && (
          <>
            <Title>Intyg</Title>
            {intygList.length > 0 ? (
              intygList.map((intyg) => <IntygImage key={intyg.id} src={intyg.fileUrl} alt="Intyg" />)
            ) : (
              <Paragraph>Inga intyg hittades.</Paragraph>
            )}
          </>
        )}
      </ContentWrap>
    </ContentContainer>
  );
};

export default Content;



