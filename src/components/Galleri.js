import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { firestore } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { FaImage, FaVideo, FaTimes } from "react-icons/fa";
import { IoIosImages } from "react-icons/io";
import SEO from "./SEO";

const GalleryContainer = styled.div`
  padding: 20px;
  margin: 20px;
  min-height: 60vh;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
`;

const FolderContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

const FolderItem = styled.div`
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  width: 150px
  flex-direction: column;
  align-items: center;
  padding: 10px;
background-color:#C37A47;
border-radius: 10px;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }
`;

const FolderIcon = styled(IoIosImages)`
  font-size: 100px;
  color: black;
  background-color:white;
border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const FolderName = styled.div`
  margin-top: -40px;
  color: white;
  font-size: 1.2em;
  margin-left: 5px;

`;

const MediaContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const MediaCard = styled.div`
  position: relative;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  }

  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

const MediaIconOverlay = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  border-radius: 50%;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BackButton = styled.button`
  margin: 10px 0;
  padding: 10px 20px;
  background-color: #c37a47;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e94e1b;
  }
`;

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  position: relative;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 800px;
  max-height: 90%;
  overflow: hidden;

  img {
    width: 100%;
    height: auto;
  }

  iframe {
    width: 100%;
    height: 400px;
  }
`;

const ModalCloseButton = styled(FaTimes)`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
`;

const Gallery = () => {
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [mediaItems, setMediaItems] = useState([]);
  const [modalMedia, setModalMedia] = useState(null);

  useEffect(() => {
    const fetchFolders = async () => {
      const querySnapshot = await getDocs(collection(firestore, "gallery"));
      const folderNames = querySnapshot.docs.map((doc) => doc.data().folder);
      const uniqueFolders = [...new Set(folderNames)];
      setFolders(uniqueFolders);
    };

    fetchFolders();
  }, []);

  useEffect(() => {
    const fetchMediaItems = async () => {
      if (!selectedFolder) return;

      const q = query(
        collection(firestore, "gallery"),
        where("folder", "==", selectedFolder)
      );
      const querySnapshot = await getDocs(q);
      const mediaData = querySnapshot.docs.map((doc) => doc.data());
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

  const openModal = (media) => {
    setModalMedia(media);
  };

  const closeModal = () => {
    setModalMedia(null);
  };

  return (
    <GalleryContainer>
      <SEO
        title="Galleri"
        description="Se bilder från våra evenemang och aktiviteter."
        keywords="galleri, bilder, evenemang, video"
      />
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
              <MediaCard key={index} onClick={() => openModal(media)}>
                {media.type === "image" && (
                  <img src={media.url} alt={`Bild ${index}`} />
                )}
                {media.type === "video" && (
                  <img
                    src={`https://img.youtube.com/vi/${media.videoId}/hqdefault.jpg`}
                    alt={`Video ${index}`}
                  />
                )}
                <MediaIconOverlay>
                  {media.type === "image" ? <FaImage /> : <FaVideo />}
                </MediaIconOverlay>
              </MediaCard>
            ))}
          </MediaContainer>
        </>
      )}

      {modalMedia && (
        <ModalBackdrop onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            {modalMedia.type === "image" && (
              <img src={modalMedia.url} alt="Modal" />
            )}
            {modalMedia.type === "video" && (
              <iframe
                src={`https://www.youtube.com/embed/${modalMedia.videoId}`}
                title="Video Modal"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            )}
            <ModalCloseButton onClick={closeModal} />
          </ModalContent>
        </ModalBackdrop>
      )}
    </GalleryContainer>
  );
};

export default Gallery;








