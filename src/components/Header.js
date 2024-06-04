import React from 'react';
import styled from 'styled-components';
import logo from '../assets/Hofors BGK-540px.png';

const HeaderContainer = styled.header`
  background-image: url(${logo}); /* Use the logo image as background */
  background-size: cover; /* Stretch the image to cover the entire container */
  background-position: center; /* Center the image horizontally and vertically */
  padding: 10px 0 0 10px;
  display: flex;
  align-items: center;
  color: white; /* Set text color to white for better contrast */
`;

const Logo = styled.img`
  /* Hide the logo image since it's already used as background */
  display: none;
`;

const Title = styled.h1`
  margin-left: 20px;
`;

const Header = () => (
  <HeaderContainer>
    <Logo src={logo} alt="Hofors BGK Logo" /> /* Keep for accessibility */
    <Title>Hofors BGK</Title>
  </HeaderContainer>
);

export default Header;