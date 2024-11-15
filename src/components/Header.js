import React from 'react';
import styled from 'styled-components';
import logo from '../assets/Hofors BGK-540px.png';

import Menu from './Menu';  // Import Menu component

const HeaderContainer = styled.header`
 
  background-size: cover;
  background-position: center;
  background-color: #C37A47;
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
  text-shadow: 4px 4px 4px rgba(0, 0.5, 0.5, 0.5);
  font-size: 6vw; /* Dynamiskt anpassar storleken efter skärmens bredd */

  @media (min-width: 769px) {
    font-size: 3vw; /* Använd en mindre, men fortfarande dynamisk, storlek för desktop */
  }

  @media (min-width: 1200px) {
    font-size: 55px; /* På riktigt stora skärmar kan du sätta ett fast värde */
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