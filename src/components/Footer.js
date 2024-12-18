import React from 'react';
import styled from 'styled-components';
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';
import anti from "../assets/anti.png";
import backgroundImage from '../assets/footer-backgrund.jpg';
const FooterContainer = styled.footer`
  background: linear-gradient(
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 1.0)
    ), 
      url(${backgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: white; /* Textfärgen ändras till vit för bättre kontrast */
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  /* För att centrera innehållet på mobilen */
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center; /* Centrerar horisontellt */
    justify-content: center; /* Centrerar vertikalt */
    text-align: center; /* Säkerställer att texten centreras */
  }
`;

const FooterText = styled.p`
  margin: 5px 0;
  text-align: center;
  font-size: 14px;
  font-weight: bold;

  @media (min-width: 768px) {
    font-size: 16px;
  }
`;

const ContactInfo = styled.div`
  margin: 1px 0;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  line-height: 1.4;

  p {
    margin: 4px 0;
  }

  @media (min-width: 768px) {
    font-size: 14px;
  }
`;

const SocialMedia = styled.div`
  margin-top: 2px;
  display: flex;
  justify-content: center;
  gap: 15px;

  a {
    color: white;
    font-size: 24px;
    transition: transform 0.3s, color 0.3s;

    &:hover {
      color: #BBD4E1; /* Ljus färg */
      transform: scale(1.2);
    }
  }

  @media (min-width: 768px) {
    gap: 20px;
    font-size: 28px;
  }
`;

const AntiDopingContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
  }
`;

const AntiDopingLink = styled.a`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  @media (min-width: 768px) {
    margin-bottom: 0;
    margin-right: 15px;
  }
`;

const AntiDopingImage = styled.img`
  width: 120px;
  height: auto;

    transition: transform 0.3s, color 0.3s;

    &:hover {
      color: #BBD4E1; /* Ljus färg */
      transform: scale(1.2);
    }
  @media (min-width: 768px) {
    width: 150px;
  }
`;

const FooterCode = styled.div`
  text-align: center;
  margin-top: 2px;

  a {
    display: inline-block;
     transition: transform 0.3s, color 0.3s;
    img {
      width: 100px;
    }
       &:hover {
      color: #BBD4E1; /* Ljus färg */
      transform: scale(1.2);
    }
  }
`;

const Footer = () => (
  <FooterContainer>
    <FooterText>© 2024 Hofors BGK. Alla rättigheter förbehållna.</FooterText>

    <ContactInfo>
      <p>Adress: Skolgatan 21, SE-813 30 Hofors</p>
      <p>Kontakta oss: Hoforsbangolf@gmail.com</p>
      <p>Telefon: 070-446 33 02</p>
    </ContactInfo>

    <AntiDopingContainer>
      <AntiDopingLink href="https://www.antidoping.se/" target="_blank" rel="noopener noreferrer">
        <AntiDopingImage src={anti} alt="AntiDoping Logo" />
      </AntiDopingLink>
      <FooterCode>
        <a href="https://codeforged.se" target="_blank" rel="noopener noreferrer">
          <img src="https://codecraftsman.se/assets/codelogo-CqDVW-XE.svg" alt="Code Forged Logo" />
        </a>
      </FooterCode>
    </AntiDopingContainer>

    <SocialMedia>
      <a href="https://www.facebook.com/hoforsbangolf" target="_blank" rel="noopener noreferrer">
        <FaFacebook />
      </a>
      <a href="https://www.instagram.com/hofors.bangolf/" target="_blank" rel="noopener noreferrer">
        <FaInstagram />
      </a>
      <a href="https://www.instagram.com/hofors.bangolf/" target="_blank" rel="noopener noreferrer">
        <FaTiktok />
      </a>
    </SocialMedia>
  </FooterContainer>
);

export default Footer;





