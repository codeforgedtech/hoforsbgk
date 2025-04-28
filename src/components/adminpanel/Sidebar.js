import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { signOut } from "firebase/auth";
import { auth } from '../../firebase';

// Sidebar Container (fixerad på vänster och skjuts in/ut)
const SidebarContainer = styled.div`
position: fixed;
top: 0;
left: ${({ isOpen }) => (isOpen ? '0px' : '-270px')}; /* Skjuter menyn helt utom synhåll när stängd */
width: 250px;
background-color: white;
display: flex;
flex-direction: column;
padding: 20px;
gap: 15px;
min-height: 100vh;
box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
transition: left 0.3s ease;
z-index: 1000;

@media (max-width: 768px) {
  width: 200px; /* Mindre bredd på mobilen */
}
`;

const SidebarLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 10px 15px;
  border-radius: 5px;
  background-color: #E94E1B;
  text-align: center;
  transition: background 0.3s;

  &:hover {
    background-color: #D4411B;
  }
`;

// Logout Button
const LogoutButton = styled.button`
  padding: 10px 15px;
  background-color: green;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  transition: background 0.3s;

  &:hover {
    background-color: darkgreen;
  }
`;

// Panel Toggle Button (för att öppna/stänga sidopanelen)
const PanelToggle = styled.div`
  position: fixed;
  top: 50%;
  left: ${({ isOpen }) => (isOpen ? '275px' : '10px')}; /* Skjuter in fliken när menyn är stängd */
  transform: translateY(-50%);
  background-color: #E94E1B;
  color: white;
  padding: 10px 5px;
  width: 30px; /* Smalare flik */
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  font-size: 16px;
  text-align: center;
  writing-mode: vertical-rl; /* Vertikal text */
  text-orientation: mixed;
  transition: background 0.3s, left 0.3s ease;
  z-index: 1100;

  &:hover {
    background-color: #D4411B;
  }

  @media (max-width: 768px) {
    left: ${({ isOpen }) => (isOpen ? '240px' : '0px')}; /* För mobil */
    width: 30px;
    font-size: 14px;
    writing-mode: vertical-rl;
  }
`;

// Modal Overlay (för bekräftelse av utloggning)
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Modal Content (för innehåll i utloggningsmodalen)
const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 300px;
`;

// Modal Button
const ModalButton = styled.button`
  padding: 10px 15px;
  margin: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  ${({ cancel }) => cancel 
    ? `background-color: grey; color: white;` 
    : `background-color: #E94E1B; color: white;`
  }

  &:hover {
    ${({ cancel }) => cancel 
      ? `background-color: darkgrey;` 
      : `background-color: #D4411B;`
    }
  }
`;

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // För att hantera sidopanelens öppning/stängning
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // Hanterar utloggning
  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('authToken'); // Ta bort token från localStorage
      navigate('/admin'); // Omdirigera till login-sidan
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <>
      {/* Panel Toggle Button */}
      <PanelToggle isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
  Panel
</PanelToggle>

      {/* Sidebar som skjuts in och ut */}
      <SidebarContainer isOpen={isOpen}>
        <SidebarLink to="/create-news">Lägg in nyhet</SidebarLink>
        <SidebarLink to="/upload">Nytt galleri</SidebarLink>
        <SidebarLink to="/create-competition">Publicera tävlingsresultat</SidebarLink>
        <SidebarLink to="/edit-products">Ändra butik</SidebarLink>
        <SidebarLink to="/banor">Ändra banor</SidebarLink>
        <SidebarLink to="/edit-association">Ändra förening</SidebarLink>
        <SidebarLink to="/edit-open">Ändra öppettider</SidebarLink>
        <SidebarLink to="/edit-sponsor">Ändra sponsorer</SidebarLink>
        <SidebarLink to="/edit-avgifter">Ändra Avgifter</SidebarLink>
        <SidebarLink to="/edit-rules">Ändra regler</SidebarLink>
        <SidebarLink to="/edit-intyg">Ladda upp intyg</SidebarLink>

        <LogoutButton onClick={() => setShowModal(true)}>Logga ut</LogoutButton>
      </SidebarContainer>

      {/* Logout Modal */}
      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <h3>Är du säker?</h3>
            <p>Vill du logga ut?</p>
            <ModalButton onClick={handleLogout}>Ja, logga ut</ModalButton>
            <ModalButton cancel onClick={() => setShowModal(false)}>Avbryt</ModalButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default Sidebar;





