import React from 'react';
import styled from 'styled-components';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import anti from "../assets/anti.png";

const FooterContainer = styled.footer`
  position: relative;
  bottom: 0;
  background-color: #C37A47;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FooterText = styled.p`
  margin: 0;
  font-size: 20px;
`;

const FooterCode = styled.div`
  text-align: center;
  padding: 10px;
  background-color: #333;
  color: #FFF;
  border-radius: 10px;
  margin-top: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  a {
    color: #C37A47;
    text-decoration: none;
    font-weight: bold;
    transition: color 0.3s ease;

    &:hover {
      color: #E94E1B;
    }
  }

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const ContactInfo = styled.div`
  margin-top: 10px;
  text-align: center;
`;

const SocialMedia = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    color: white;
    margin: 0 10px;
    font-size: 24px;
    transition: color 0.3s;

    &:hover {
      color: #4267B2; /* Facebook blue */
    }
  }
`;

const AntiDopingContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const AntiDopingLink = styled.a`
  display: flex;
  align-items: center;
`;

const AntiDopingImage = styled.img`
  width: 160px; /* Adjust the width as needed */
  height: auto; /* Maintain aspect ratio */
  margin-right: 10px; /* Space between image and text */
`;

const Footer = () => (
  <FooterContainer>
    <FooterText>© 2024 Hofors BGK.</FooterText>

    <ContactInfo>
      <p>Adress: Skolgatan 21, SE-813 30 Hofors</p>
      <p>Kontakta oss: Hoforsbangolf@gmail.com</p>
      <p>Telefon: 070-446 33 02</p>
    </ContactInfo>

    <AntiDopingContainer>
      <AntiDopingLink href="https://www.antidoping.se/" target="_blank" rel="noopener noreferrer">
        <AntiDopingImage src={anti} alt="AntiDoping" />
      </AntiDopingLink>
      <FooterCode><a href="https://codeforged.se" target="_blank" rel="noopener noreferrer">Forged by CodeForged</a></FooterCode>
    </AntiDopingContainer>

    <SocialMedia>
      <a href="https://www.facebook.com/hoforsbangolf" target="_blank" rel="noopener noreferrer">
        <FaFacebook />
      </a>
      <a href="https://www.instagram.com/hofors.bangolf/" target="_blank" rel="noopener noreferrer">
        <FaInstagram />
      </a>
    </SocialMedia>
  </FooterContainer>
);

export default Footer;

