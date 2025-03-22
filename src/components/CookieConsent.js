import React, { useState } from 'react';
import styled from 'styled-components';

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* Viktigt för att den ska ligga över allt */
  padding: 10px 0;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 15px;
  border-radius: 0;
  box-shadow: none;
  max-width: 100%;
  width: 100%;
  text-align: center;
`;
const Title = styled.h2`
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;

  &:first-child {
    background-color: #E94E1B;
    color: white;
    border: none;
  }

  &:last-child {
    background-color: #ccc;
    color: black;
    border: none;
  }

  &:hover {
    opacity: 0.8;
  }
`;

const CookieConsent = ({ onAccept }) => {
  const [showModal, setShowModal] = useState(true);

  const handleAccept = () => {
    setShowModal(false);
    localStorage.setItem('cookieConsent', 'accepted');
    onAccept(true);
  };

  const handleDecline = () => {
    setShowModal(false);
    localStorage.setItem('cookieConsent', 'declined');
    onAccept(false);
  };

  return (
    <>
      {showModal && (
        <ModalBackdrop>
          <ModalContent>
            <Title>Vi använder kakor (cookies)</Title>
            <p>
              Vi använder cookies för att förbättra din upplevelse på vår webbplats.
              Genom att klicka på "Acceptera" godkänner du användningen av alla cookies.
            </p>
            <ButtonContainer>
              <Button onClick={handleAccept}>Acceptera</Button>
              <Button onClick={handleDecline}>Avvisa</Button>
            </ButtonContainer>
          </ModalContent>
        </ModalBackdrop>
      )}
    </>
  );
};

export default CookieConsent;