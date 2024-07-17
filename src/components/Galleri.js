import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { firestore } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { FaFolder } from 'react-icons/fa';
import SEO from './SEO';
import MediaItem from './MediaItem'; // Importera MediaItem

const GalleryContainer = styled.div`
  padding: 20px;
  margin: 20px;
  min-height: 60vh;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const FolderContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const FolderItem = styled.div`
  margin: 20px;
  text-align: center;
  cursor: pointer;
`;

const FolderIcon = styled(FaFolder)`
  font-size: 64px; /* Större storlek */
  color: #C37A47;
  transition: transform 0.2s, color 0.2s; /* Lägg till en övergång för att smidigt ändra storlek och färg */

  &:hover {
    transform: scale(1.1); /* Förstora ikonen något vid hovring */
    color: #E94E1B; /* Ändra färg vid hovring */
  }
`;

const FolderName = styled.div`
  margin-top: 10px;
  color: #333;
  font-size: 1.2em; /* Större textstorlek */
`;

const MediaContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const BackButton = styled.button`
  margin: 10px;
  padding: 10px 20px;
  background-color: #C37A47;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 800px;
  max-height: 90%;
  overflow: hidden;
  position: relative;
  text-align: center;

  img {
    max-width: 100%; /* Bilden kommer inte att överskrida sin containerens bredd */
    height: auto; /* Säkerställer att höjden justeras proportionellt */
    display: block; /* Tar bort extra utrymme som inline-element kan orsaka */
    margin: 0 auto; /* Centrera bilden horisontellt */
  }

  @media (max-width: 768px) {
    width: calc(100% - 20px); /* Anpassa bredden för mobila enheter */
    max-width: calc(100% - 20px); /* Maximal bredd som inte överskrider skärmens bredd */
    height: auto; /* Automatisk höjd baserat på innehållet */
    padding: 10px;
  }
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: white;
  border-radius: 5px;
  border: none;
  font-size: 24px;
  color: #000;
  cursor: pointer;
`;

const YouTubePlayer = styled.iframe`
  width: 100%;
  height: 200px;
  display: block;
  border: none;
`;

const Modal = ({ isOpen, onClose, media }) => {
  if (!isOpen) return null;

  const closeModal = (e) => {
    e.stopPropagation();
    onClose();
  };

  return (
    <ModalBackdrop onClick={closeModal}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {media.type === 'image' && <img src={media.url} alt={`Modal ${media.type}`} style={{ maxWidth: '100%', maxHeight: '100%' }} />}
        {media.type === 'video' && (
          <YouTubePlayer
            src={media.embedUrl}
            title={`YouTube Video Modal`}
            allowFullScreen
          />
        )}
        <ModalCloseButton onClick={closeModal}>×</ModalCloseButton>
      </ModalContent>
    </ModalBackdrop>
  );
};

const Gallery = () => {
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [mediaItems, setMediaItems] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(null);

  useEffect(() => {
    const fetchFolders = async () => {
      const querySnapshot = await getDocs(collection(firestore, 'gallery'));
      const folderNames = querySnapshot.docs.map(doc => doc.data().folder);
      const uniqueFolders = [...new Set(folderNames)];
      setFolders(uniqueFolders);
    };

    fetchFolders();
  }, []);

  useEffect(() => {
    const fetchMediaItems = async () => {
      if (!selectedFolder) return;

      const q = query(collection(firestore, 'gallery'), where('folder', '==', selectedFolder));
      const querySnapshot = await getDocs(q);
      const mediaData = querySnapshot.docs.map(doc => doc.data());
      setMediaItems(mediaData);
    };

    fetchMediaItems();
  }, [selectedFolder]);

  const handleFolderSelect = (folderName) => {
    setSelectedFolder(folderName);
  };

  const handleBackButtonClick = () => {
    setSelectedFolder(null);
    setMediaItems([]);
  };

  const openModal = (index) => {
    setSelectedMediaIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedMediaIndex(null);
  };

  return (
    <GalleryContainer>
      <SEO title="Galleri" description="Se bilder från våra evenemang och aktiviteter." keywords="galleri, bilder, evenemang, video" />
      {!selectedFolder && (
        <FolderContainer>
          {folders.map((folderName, index) => (
            <FolderItem key={index} onClick={() => handleFolderSelect(folderName)}>
              <FolderIcon />
              <FolderName>{folderName}</FolderName>
            </FolderItem>
          ))}
        </FolderContainer>
      )}

      {selectedFolder && (
        <>
          <BackButton onClick={handleBackButtonClick}>Tillbaka</BackButton>
          <MediaContainer>
            {mediaItems.map((media, index) => (
              <MediaItem
                key={index}
                media={media}
                index={index}
                onMediaClick={openModal}
              />
            ))}
          </MediaContainer>
        </>
      )}

      <Modal isOpen={modalOpen} onClose={closeModal} media={mediaItems[selectedMediaIndex]} />
    </GalleryContainer>
  );
};

export default Gallery;






