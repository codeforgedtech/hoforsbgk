import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import logo from '../assets/Hofors BGK-540px.png';
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";

// Define colors based on the logo
const colors = {
  primary: '#C37A47', // Brun nyans från loggan
  secondary: '#BBD4E1', // Ljusblå ton
  accent: '#ffffff',   // Vit för kontrast
  textDark: '#333333', // Mörk text
  bmeny:"#C37A47",
};

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
  height: 120px;
  
  color: ${colors.accent};

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    height: auto;
  }
`;

const Logo = styled.img`
  width: 120px;
  height: 120px;


  @media (max-width: 768px) {
    position: relative;
    margin: 0 auto;
    display: block;
  }

  @media (min-width: 768px) {
    position:relative;
    top: 2px;
    right: 300px;
    z-index: 15;
  }
`;

const MenuItem = styled(Link)`
  color: ${colors.bmeny};
  text-decoration: none;
  margin: 5px 10px;
  padding: 10px 20px;
  font-size: 18px;
  font-weight: bold;
  transition: all 0.3s ease;
  background-color: ${colors.accent};
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: ${colors.secondary};
    color: ${colors.textDark};
    border-radius: 5px;
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    width: 80%;
    margin: 6px auto; /* Centrera objekten */
    text-align: center;
    padding: 8px;
    font-size: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
  }
`;

const HamburgerButton = styled.button`
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 45px;
  width: 45px;
  background-color: ${colors.secondary};
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
    background-color: ${colors.primary};
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
    background-color: ${colors.bmeny};
    transform: translateX(100%);
    animation: ${props => (props.open ? slideIn : slideOut)} 0.5s forwards;
    justify-content: flex-start;
    align-items: center;
    box-shadow: -2px 0 8px rgba(0, 0, 0, 0.2);
    z-index: 10;
    padding-top: 65px;
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

  return (
    <MenuContainer>
      <Logo src={logo} alt="logo" />
      <HamburgerButton className={isOpen ? 'open' : ''} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </HamburgerButton>
      <MenuItems open={isOpen}>
        <MenuItem to="/news" onClick={closeMenu}>Nyheter</MenuItem>
        <MenuItem to="/competitions" onClick={closeMenu}>Tävlingar</MenuItem>
        <MenuItem to="/gallery/:folder" onClick={closeMenu}>Galleri</MenuItem>
        <MenuItem to="/butik" onClick={closeMenu}>Butik</MenuItem>
        <MenuItem to="/courses" onClick={closeMenu}>Banor/Tips</MenuItem>
        <MenuItem to="/rules" onClick={closeMenu}>Regler</MenuItem>
        <MenuItem to="/association" onClick={closeMenu}>Föreningen</MenuItem>
        <MenuItem to="/avgift" onClick={closeMenu}>Avgifter</MenuItem>
        <MenuItem to="/sponsorer" onClick={closeMenu}>Sponsorer</MenuItem>
        <MenuItem to="/public" onClick={closeMenu}>Öppettider</MenuItem>
      </MenuItems>
    </MenuContainer>
  );
};

export default Menu;









