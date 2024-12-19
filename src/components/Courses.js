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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  padding: 40px 30px;
  margin: 20px;
  background: linear-gradient(135deg, #f3f4f6, #ffffff);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
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

const CourtList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: center;
`;

const CourtCard = styled.li`
  background-color: #ffffff;
  border: 2px solid #ececec;
  border-radius: 15px;
  padding: 20px;
  width: calc(25% - 20px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s, box-shadow 0.3s;

  @media (max-width: 768px) {
    width: calc(50% - 20px);
  }
  @media (max-width: 480px) {
    width: calc(100% - 20px);
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }
`;

const CourtImage = styled.img`
  width: 100%;
  height: 200px;
  border-radius: 10px;
  object-fit: cover;
  margin-bottom: 15px;
`;

const CourtName = styled.h2`
  font-size: 2em;
  margin: 15px 0 10px;
  color: #C37A47;
  font-weight: bold;
  text-align: center;
`;

const TipsButton = styled.button`
  display: block;
  margin: 0 auto;
  padding: 12px 30px;
  font-size: 16px;
  color: #ffffff;
  background-color: #C37A47;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: #b2693f;
    transform: translateY(-2px);
  }
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
  color: #333;

  &:hover {
    color: #C37A47;
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
        <CourtList>
          {courtsData.map((court, index) => (
            <CourtCard key={index}>
              <CourtImage src={court.image} alt={court.name} />
              <CourtName>
                {court.nr} - {court.name}
              </CourtName>
              <TipsButton onClick={() => openModal(tipsImages[court.nr])}>Tips för banan</TipsButton>
            </CourtCard>
          ))}
        </CourtList>
      </CourtContainer>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Tips Modal"
      >
        <ModalCloseButton onClick={closeModal}>&times;</ModalCloseButton>
        <img src={currentTipImage} alt="Tip" style={{ width: '100%', height: 'auto' }} />
      </Modal>
    </>
  );
};

export default Court;


