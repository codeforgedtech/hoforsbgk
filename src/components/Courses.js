import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import SEO from './SEO';
import { firestore } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

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
  width: 100%;
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
  cursor: pointer;
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

const Court = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState('');
  const [currentTipImage, setCurrentTipImage] = useState('');
  const [courts, setCourts] = useState([]);
  
  // Fetch courses data from Firestore and sort by holes
  useEffect(() => {
    const fetchCourses = async () => {
      const querySnapshot = await getDocs(collection(firestore, 'golf_courses'));
      const coursesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      // Sort the courses by the number of holes in ascending order
      const sortedCourses = coursesData.sort((a, b) => a.holes - b.holes);
      
      setCourts(sortedCourses);
    };
    fetchCourses();
  }, []);

  const openModal = (image, tipImage) => {
    setCurrentImage(image);
    setCurrentTipImage(tipImage); // Store the tip image if needed
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  return (
    <>
      <CourtContainer>
        <SEO title="Banor" description="Upptäck våra olika golfbanor." keywords="banor, golf" />
        <Title>Våra banor</Title>
        <CourtList>
          {courts.map((court) => (
            <CourtCard key={court.id}>
              <CourtImage
                src={court.imageUrl}
                alt={court.name}
                onClick={() => openModal(court.imageUrl, court.imageUrl)} // Clicking the image opens the modal
              />
              <CourtName>{court.holes} - {court.name}</CourtName>
              <TipsButton onClick={() => openModal(court.tipImageUrl, court.tipImageUrl)}>Tips för banan</TipsButton>
            </CourtCard>
          ))}
        </CourtList>
      </CourtContainer>

      {/* Modal for showing the larger image */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Image Modal"
      >
        <ModalCloseButton onClick={closeModal}>&times;</ModalCloseButton>
        <img src={currentImage} alt="Golf course" style={{ width: '100%', height: 'auto' }} />
      </Modal>

      {/* Optional Modal for tips image */}
      {currentTipImage && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Tips Modal"
        >
          <ModalCloseButton onClick={closeModal}>&times;</ModalCloseButton>
          <img src={currentTipImage} alt="Tip" style={{ width: '100%', height: 'auto' }} />
        </Modal>
      )}
    </>
  );
};

export default Court;
 






