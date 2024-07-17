import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const AdminContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 20px;
  margin: 20px;
  background-color: #FFF;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;

  @media (max-width: 768px) {
    padding: 10px;
    margin: 10px;
  }
`;

const AdminBox = styled.div`
  background-color: #ffffff;
  padding: 40px;
  border-radius: 10px;
  width: 100%;
  max-width: 600px;
  text-align: center;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: #333333;
  font-size: 24px;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const AdminLink = styled(Link)`
  margin: 10px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #E94E1B;
  color: white;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  display: inline-block;

  &:hover {
    background-color: #D4411B;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px 16px;
  }
`;

const AdminPanel = () => {
  return (
    <AdminContainer>
      <AdminBox>
        <Title>Admin Panel</Title>
        <AdminLink to="/create-news">Lägg in nyhet</AdminLink>
        <AdminLink to="/upload">Nytt galleri</AdminLink>
        <AdminLink to="/create-competition">Publicera tävlingsresultat</AdminLink>
      </AdminBox>
    </AdminContainer>
  );
};

export default AdminPanel;
