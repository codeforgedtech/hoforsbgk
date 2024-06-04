import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const MenuContainer = styled.nav`
  background-color: #4A4A4A;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    position: relative;
    flex-direction: column;
    align-items: center;
  }
`;

const MenuItem = styled(Link)`
  color: white;
  text-decoration: none;
  margin: 5px;
  padding: 10px;
  background-color: #E94E1B;
  border-radius: 5px;

  &:hover {
    background-color: #D4411B;
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
  border-radius: 5px;
  cursor: pointer;
  position: absolute;
  top: -80px;
  right: 10px;

  span {
    display: block;
    width: 25px;
    height: 3px;
    margin: 3px;
    background-color: white;
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

const MenuItems = styled.div`
  display: flex;
  flex-direction: row;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    display: ${props => (props.open ? 'flex' : 'none')};
    margin-top: 60px; /* Add space for the hamburger button */
  }
`;

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <MenuContainer>
      <HamburgerButton onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </HamburgerButton>
      <MenuItems open={isOpen}>
        <MenuItem to="/news">Nyheter</MenuItem>
        <MenuItem to="/players">Spelare</MenuItem>
        <MenuItem to="/courses">Banor</MenuItem>
        <MenuItem to="/rules">Regler</MenuItem>
        <MenuItem to="/tips">Tips</MenuItem>
        <MenuItem to="/public">Allmänheten</MenuItem>
        <MenuItem to="/admin">Admin Login</MenuItem>
      </MenuItems>
    </MenuContainer>
  );
};

export default Menu;