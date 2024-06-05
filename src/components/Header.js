import React from 'react';
import styled from 'styled-components';
import logo from '../assets/Hofors BGK-540px.png';
import backgroundImage from '../assets/headerbg.png'; // Replace with the actual path to your background image
import Menu from './Menu';  // Import Menu component

const HeaderContainer = styled.header`
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  background-color: #4A4A4A;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  height: 80px;

  @media (min-width: 769px) {
    height: 100px; /* Större logotyp i desktop-läge */
  }
`;

const Title = styled.h1`
  color: white;
  margin-left: 20px;
  font-size: 30px;
  text-shadow: 4px 4px 4px rgba(0, 0.5, 0.5, 0.5); /* Skugga med 2px förskjutning i x- och y-riktning och en blurrad radie på 4px */

  @media (min-width: 769px) {
    font-size: 55px; /* Större titel i desktop-läge */
  }
`;

const Header = () => (
  <HeaderContainer>
    <LogoContainer>
      <Logo src={logo} alt="Hofors BGK Logo" />
      <Title>Hofors BGK</Title>
    </LogoContainer>
    <Menu />
  </HeaderContainer>
);

export default Header;