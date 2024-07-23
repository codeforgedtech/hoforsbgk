import React from 'react';
import styled from 'styled-components';

const LogoutModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
`;

const LogoutButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #E94E1B;
  color: white;
  border: none;
  border-radius: 5px;
  margin-top: 10px;
  cursor: pointer;

  &:hover {
    background-color: #D4411B;
  }
`;

const LogoutModal = ({ handleLogout }) => {
  return (
    <LogoutModalContainer>
      <p>Du har loggats ut på grund av inaktivitet.</p>
      <LogoutButton onClick={handleLogout}>Logga in igen</LogoutButton>
    </LogoutModalContainer>
  );
};

export default LogoutModal;