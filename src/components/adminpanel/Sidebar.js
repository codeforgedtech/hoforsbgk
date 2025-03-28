import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { signOut } from "firebase/auth";
import { auth } from '../../firebase';

const SidebarContainer = styled.div`
  width: 250px;
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 15px;
  min-height: 100vh;

  @media (max-width: 768px) {
    width: 200px;
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

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 300px;
`;

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
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('authToken'); // Radera token från localStorage
      navigate('/admin'); // Omdirigera till login-sidan
    } catch (error) {
      console.error('Utloggning misslyckades', error);
    }
  };

  return (
    <>
      <SidebarContainer>
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
