import React from 'react';
import styled from 'styled-components';
import { FaFacebook, FaInstagram, FaTiktok, FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';
import anti from "../assets/anti.png";
import arvs from "../assets/arvs.png";
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
  text-align: center;
  font-size: 14px;
  margin-top: 20px;
  color: #bbb;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const ContactInfo = styled.div`
  font-size: 16px;
  line-height: 1.6;

  p {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 5px 0;
  }

  svg {
    color: #C37A47;
    font-size: 20px;
  }
`;

const SocialMedia = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;

  a {
    color: white;
    font-size: 28px;
    background: rgba(255, 255, 255, 0.1);
    padding: 10px;
    border-radius: 50%;
    transition: transform 0.3s, background 0.3s;

    &:hover {
      background: #C37A47;
      transform: scale(1.2);
    }
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

const LinksSection = styled.div`
  text-align: center;

  a {
    display: inline-block;
    margin: 10px 0;
    color: white;
    font-size: 16px;
    text-decoration: none;
    transition: color 0.3s;

    &:hover {
      color: #C37A47;
    }
  }

  img {
    margin-top: 10px;
    width: 120px;
    transition: transform 0.3s;

    &:hover {
      transform: scale(1.1);
    }
  }
`;

const Footer = () => {
  const currentYear = new Date().getFullYear(); // Hämta det aktuella året

  return (
    <FooterContainer>
      <FooterText>© {currentYear} Hofors BGK. Alla rättigheter förbehållna.</FooterText>

      <ContactInfo>
        <p><FaMapMarkerAlt /> Adress: Skolgatan 21, SE-813 30 Hofors</p>
        <p><FaEnvelope /> Kontakta oss: Hoforsbangolf@gmail.com</p>
        <p><FaPhone /> Telefon: 070-446 33 02</p>
      </ContactInfo>

      <AntiDopingContainer>
        <AntiDopingLink href="https://www.antidoping.se/" target="_blank" rel="noopener noreferrer">
          <AntiDopingImage src={anti} alt="AntiDoping Logo" />
        </AntiDopingLink>
        <FooterCode>
          <a href="https://codecraftsman.se" target="_blank" rel="noopener noreferrer">
            <img src="https://codecraftsman.se/assets/codelogo-CqDVW-XE.svg" alt="Code Forged Logo" />
          </a>
        </FooterCode>
        <AntiDopingLink href="https://www.arvsfonden.se/" target="_blank" rel="noopener noreferrer">
          <AntiDopingImage src={arvs} alt="Arvsfonden Logo" />
        </AntiDopingLink>
      </AntiDopingContainer>

      <SocialMedia>
        <a href="https://www.facebook.com/hoforsbangolf" target="_blank" rel="noopener noreferrer">
          <FaFacebook />
        </a>
        <a href="https://www.instagram.com/hofors.bangolf/" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>
        <a href="https://www.tiktok.com/@bangolfklubben.ho" target="_blank" rel="noopener noreferrer">
          <FaTiktok />
        </a>
      </SocialMedia>
    </FooterContainer>
  );
};

export default Footer;





