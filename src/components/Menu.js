import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const MenuContainer = styled.nav`
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  height:120px;

  @media (max-width: 768px) {
    position: relative;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    padding: 0;
    height:10px;
  }
`;

const MenuItem = styled(Link)`
  color: white;
  text-decoration: none;
  margin: 5px;
  padding: 10px 15px;
  background-color: #E94E1B;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60%;

  &:hover {
    background-color: #D4411B;
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    width: 90%;
    padding: 10px 3px; /* Smaller padding for mobile */
    font-size: 20px; 
  }
`;

const HamburgerButton = styled.button`
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
  background-color: #E94E1B;
  border: none;
  border-radius: 15px;
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
    transform: rotate(45deg) translate(5px, 5px);
  }

  &.open span:nth-child(2) {
    opacity: 0;
  }

  &.open span:nth-child(3) {
    transform: rotate(-45deg) translate(5px, -5px);
  }
`;

const MenuItems = styled.div`
  display: flex;
  flex-direction: row;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 60%;
    position: fixed;
    top: 70px;
    left: 65%;
    transform: translateX(-50%);
    background-color: rgba(74, 74, 74, 0.95);
    height: auto;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    z-index: 10;
    display: ${props => (props.open ? 'flex' : 'none')};
    padding-top: 20px;
  }
`;

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <MenuContainer>
      <HamburgerButton className={isOpen ? 'open' : ''} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </HamburgerButton>
      <MenuItems open={isOpen}>
        <MenuItem to="/news" onClick={closeMenu}>Nyheter</MenuItem>
        <MenuItem to="/players" onClick={closeMenu}>Spelare</MenuItem>
        <MenuItem to="/courses" onClick={closeMenu}>Banor</MenuItem>
        <MenuItem to="/rules" onClick={closeMenu}>Regler</MenuItem>
        <MenuItem to="/tips" onClick={closeMenu}>Tips</MenuItem>
        <MenuItem to="/public" onClick={closeMenu}>Allmänheten</MenuItem>
        <MenuItem to="/admin" onClick={closeMenu}>Admin Login</MenuItem>
      </MenuItems>
    </MenuContainer>
  );
};

export default Menu;

