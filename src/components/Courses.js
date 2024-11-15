import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import SEO from './SEO';
import bana1Image from '../assets/bana1.jpg';
import bana2Image from '../assets/bana2.jpg';
import bana3Image from '../assets/bana3.jpg';
import bana4Image from '../assets/bana4.jpg';
import bana5Image from '../assets/bana5.jpg';
import bana6Image from '../assets/bana6.jpg';
import bana7Image from '../assets/bana7.jpg';
import bana8Image from '../assets/bana8.jpg';
import bana9Image from '../assets/bana9.jpg';
import bana10Image from '../assets/bana10.jpg';
import bana11Image from '../assets/bana11.jpg';
import bana12Image from '../assets/bana12.jpg';
import bana13Image from '../assets/bana13.jpg';
import bana14Image from '../assets/bana14.jpg';
import bana15Image from '../assets/bana15.jpg';
import bana16Image from '../assets/bana16.jpg';
import bana17Image from '../assets/bana17.jpg';
import bana18Image from '../assets/bana18.jpg';

const tipsImages = {
  1: 'assets/tip1.jpg',
  2: 'assets/tip2.jpg',
  3: 'assets/tip3.jpg',
  4: 'assets/tip4.jpg',
  5: 'assets/tip5.jpg',
  6: 'assets/tip6.jpg',
  7: 'assets/tip7.jpg',
  8: 'assets/tip8.jpg',
  9: 'assets/tip9.jpg',
  10: 'assets/tip10.jpg',
  11: 'assets/tip11.jpg',
  12: 'assets/tip12.jpg',
  13: 'assets/tip13.jpg',
  14: 'assets/tip14.jpg',
  15: 'assets/tip15.jpg',
  16: 'assets/tip16.jpg',
  17: 'assets/tip17.jpg',
  18: 'assets/tip18.jpg',
};

const CourtContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
  padding: 20px;
  min-height: 60vh;
  color: #333;
  font-family: Arial, sans-serif;
  margin: 20px;
  background-color: #FFF;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    padding: 10px;
  }
`;

const Title = styled.h1`
  grid-column: 1 / -1; /* Gör att titeln sträcker sig över hela gridens bredd */
  margin-top: 40px;
  margin-bottom: 20px;
  font-size: 2em;
  color: #C37A47;
  text-align: center; /* Centrera texten horisontellt */
  
  @media (max-width: 768px) {
    margin-top: 20px;
    font-size: 1.5em;
  }
`;

const CourtImage = styled.img`
  width: 80%;
  max-width: 80%;
  height: auto;
  border-radius: 10px;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
  }
`;

const TipsButton = styled.button`
  margin-top: 10px;
  background-color: #C37A47;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 1em;

  &:hover {
    background-color: #a75b34;
  }
`;

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxHeight: '90%',
    maxWidth: '90%',
  },
};

Modal.setAppElement('#root');

const courtsData = [
  { nr: "1", name: "Mittkulle", image: bana1Image },
  { nr: "2", name: "Tvåport", image: bana2Image },
  { nr: "3", name: "Dropp", image: bana3Image },
  { nr: "4", name: "Hål i backe med green", image: bana4Image },
  { nr: "5", name: "Synvilla", image: bana5Image },
  { nr: "6", name: "Örkelljunga", image: bana6Image },
  { nr: "7", name: "Vinkel", image: bana7Image },
  { nr: "8", name: "Enport i kulle", image: bana8Image },
  { nr: "9", name: "Vertikal", image: bana9Image },
  { nr: "10", name: "Gentleman", image: bana10Image },
  { nr: "11", name: "Lådbana", image: bana11Image },
  { nr: "12", name: "Sidospel", image: bana12Image },
  { nr: "13", name: "Tysk klack", image: bana13Image },
  { nr: "14", name: "Enport", image: bana14Image },
  { nr: "15", name: "Målvakt", image: bana15Image },
  { nr: "16", name: "Vallgrav", image: bana16Image },
  { nr: "17", name: "Dosering", image: bana17Image },
  { nr: "18", name: "Inslag", image: bana18Image },
];

const Court = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [currentTipImage, setCurrentTipImage] = useState('');

  const openModal = (image) => {
    setCurrentTipImage(image);
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  return (
    <>
     
      <CourtContainer>
      <SEO title="Banor" description="Upptäck våra olika bangolfbanor." keywords="banor, bangolf, hofors" />
      <Title>Banor</Title>
        {courtsData.map((court, index) => (
          <div key={index}>
            <h2>{court.nr} - {court.name}</h2>
            <CourtImage src={court.image} alt={court.name} />
            <TipsButton onClick={() => openModal(tipsImages[court.nr])}>Tips för banan</TipsButton>
          </div>
        ))}
      </CourtContainer>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Tips Modal"
      >
        <button onClick={closeModal} style={{ float: 'right', cursor: 'pointer', fontSize: '1.5em' }}>&times;</button>
        <img src={currentTipImage} alt="Tip" style={{ width: '100%', height: 'auto' }} />
      </Modal>
    </>
  );
};

export default Court;

