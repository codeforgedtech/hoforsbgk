import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import logo from '../assets/Hofors BGK-540px.png';
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";

// Animation for sliding the menu in and out
const slideIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0%);
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0%);
  }
  to {
    transform: translateX(100%);
  }
`;

const MenuContainer = styled.nav`
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  height: 120px;

  @media (max-width: 768px) {
    position: relative;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    padding: 0;
    height: auto;
  }
`;

const Logo = styled.img`
  display: none;

  @media (max-width: 768px) {
    display: block;
    position: fixed;
    top: 20px;
    left: 20px;
    z-index: 15;
    width:100px;
    height:100px;
  }
`;

const MenuItem = styled(Link)`
  color: white;
  text-decoration: none;
  margin: 5px;
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  align-items: top;
  width: 100%;
  font-size: 20px; 
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    color: black;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 10px 0;
    font-size: 20px; 
    font-weight: 800;
    color: black; /* Ändra textfärg till svart i mobil läge */
  }
`;

const Spacer = styled.div`
  
   @media (max-width: 768px) {
    height: 30px;
  }
`;

const HamburgerButton = styled.button`
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 45px;
  width: 45px;
  background-color: #C37A47;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  position: fixed;
  top: 25px;
  right: 10px;
  z-index: 20;

  span {
    display: block;
    width: 25px;
    height: 3px;
    margin: 4px 0;
    background-color: white;
    transition: transform 0.3s, opacity 0.3s;
  }

  @media (max-width: 768px) {
    display: flex;
  }

  &.open span:nth-child(1) {
    transform: rotate(55deg) translate(10px, 5px);
  }

  &.open span:nth-child(2) {
    opacity: 0;
  }

  &.open span:nth-child(3) {
    transform: rotate(-55deg) translate(10px, -5px);
  }
`;
const LogoutButton = styled(Link)`
   color: white;
  text-decoration: none;
  margin: 5px;
  padding: 10px 20px;
  display: flex;

  justify-content: center;
  align-items: top;
  width: 100%;
  font-size: 16px; 
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    color: black;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 10px 0;
    font-size: 20px; 
    font-weight: 800;
    color: black; /* Ändra textfärg till svart i mobil läge */
  }

`;
const MenuItems = styled.div`
  display: flex;
  flex-direction: row;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    position: fixed;
    top: 0;
    right: 0;
    height: 100%;
    background-color: white;
    transform: translateX(100%);
    animation: ${props => (props.open ? slideIn : slideOut)} 0.5s forwards;
    justify-content: flex-start; /* Justera för att placera menyn högre upp */
    align-items: center;
    box-shadow: -2px 0 8px rgba(0, 0, 0, 0.2);
    z-index: 10;
    padding-top: 65px; /* Justera för att flytta upp menyn */
    border-left: 2px solid black; /* Lägg till svart kant på vänster sida */
  }
`;

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user] = useAuthState(auth);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    auth.signOut();
    closeMenu();
  };

  return (
    <MenuContainer>
      <HamburgerButton className={isOpen ? 'open' : ''} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </HamburgerButton>

      <MenuItems open={isOpen}>
        {isOpen && <Logo src={logo} alt="logo" width={50} height={50} />}
        <MenuItem to="/news" onClick={closeMenu}>Nyheter</MenuItem>
        <MenuItem to="/competitions" onClick={closeMenu}>Tävlingar</MenuItem>
        <MenuItem to="/gallery/:folder" onClick={closeMenu}>Galleri</MenuItem>
        <MenuItem to="/butik" onClick={closeMenu}>Butik</MenuItem>
        <MenuItem to="/courses" onClick={closeMenu}>Banor/Tips</MenuItem>
        <MenuItem to="/rules" onClick={closeMenu}>Regler</MenuItem>
        <MenuItem to="/association" onClick={closeMenu}>Föreningen</MenuItem>
        <MenuItem to="/sponsorer" onClick={closeMenu}>Sponsorer</MenuItem>
        <MenuItem to="/public" onClick={closeMenu}>Öppettider</MenuItem>
       
        <Spacer />
        {user ? (
          <><MenuItem to="/panel" onClick={closeMenu}>Adminpanel</MenuItem><LogoutButton onClick={handleLogout}><FaSignOutAlt size={24}/></LogoutButton></>
        ) : (
          <MenuItem to="/admin" onClick={closeMenu}><FaSignInAlt size={24}/></MenuItem>
        )}
      </MenuItems>
    </MenuContainer>
  );
};

export default Menu;








