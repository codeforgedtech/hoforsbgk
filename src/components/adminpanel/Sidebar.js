import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  width: 250px;
  background-color: white;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 15px;
  min-height: 100vh;

  @media (max-width: 768px) {
    width: 200px;
  }
`;

const SidebarLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 10px 15px;
  border-radius: 5px;
  background-color: #E94E1B;
  text-align: center;
  transition: background 0.3s;

  &:hover {
    background-color: #D4411B;
  }
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <SidebarLink to="/create-news">Lägg in nyhet</SidebarLink>
      <SidebarLink to="/upload">Nytt galleri</SidebarLink>
      <SidebarLink to="/create-competition">Publicera tävlingsresultat</SidebarLink>
      <SidebarLink to="/edit-products "> Ändra butik</SidebarLink>
      <SidebarLink to="/banor"> Ändra banor</SidebarLink>
      <SidebarLink to="/edit-association"> Ändra förening</SidebarLink>
      <SidebarLink to="/edit-opening-hours">Ändra öppettider</SidebarLink>
      <SidebarLink to="/edit-sponsors">Ändra sponsorer</SidebarLink>
      <SidebarLink to="/edit-rules">Ändra regler</SidebarLink>
    </SidebarContainer>
  );
};

export default Sidebar;