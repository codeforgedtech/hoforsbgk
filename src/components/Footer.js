import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
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
`;

const ContactInfo = styled.div`
  margin-top: 10px;
  text-align: center;
`;

const Footer = () => (
  <FooterContainer>
    <FooterText>© 2024 Hofors BKG. Alla rättigheter förbehållna.</FooterText>
    <ContactInfo>
      <p>Kontakta oss: example@example.com</p>
      <p>Telefon: 123-456-789</p>
    </ContactInfo>
  </FooterContainer>
);

export default Footer;