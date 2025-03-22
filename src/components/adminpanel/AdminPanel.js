import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from './Sidebar';
const Container = styled.div`
  display: flex;
  min-height: 100vh;
  flex-wrap: wrap;
`;




const Content = styled.div`
  flex: 1;
  padding: 40px;
  background-color: #f4f4f4;
  display: flex;
  justify-content: center;
  width:100%
  
 
`;

const AdminBox = styled.div`
  background-color: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 800px;
  max-height:300px
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 20px;
`;

const AdminPanel = () => {
  return (
    <Container>
       <Sidebar />
       
      <Content>
        <AdminBox>
          <Title>Välkommen till Adminpanelen</Title>
          <p>Välj en åtgärd i menyn till vänster.</p>
        </AdminBox>
      </Content>
    </Container>
  );
};

export default AdminPanel;


