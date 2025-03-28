import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

const LoginContainer = styled.div`
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
`;

const LoginBox = styled.div`
  background-color: #ffffff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: #333333;
  font-size: 24px;
`;

const Input = styled.input`
  width: calc(100% - 20px);
  margin: 10px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;

  &:focus {
    border-color: #E94E1B;
    outline: none;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #E94E1B;
  color: white;
  border: none;
  border-radius: 5px;
  margin-top: 20px;
  cursor: pointer;
  width: calc(100% - 20px);

  &:hover {
    background-color: #D4411B;
  }
`;

const LogoutButton = styled(Button)`
  background-color: #D4411B;
  margin-top: 10px;

  &:hover {
    background-color: #b33915;
  }
`;

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    // Kolla om en token finns i localStorage
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setUser({ token: storedToken }); // Sätt användaren som inloggad
      navigate('/panel'); // Skicka till admin-panelen
    }
  }, [setUser, navigate]);

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken(); // Hämta JWT-token

      localStorage.setItem('authToken', token); // Spara token i localStorage
      setUser(userCredential.user);

      setTimeout(handleLogout, 60 * 60 * 1000); // Automatisk utloggning efter 1 timme (60 min * 60 sek * 1000 ms)

      navigate('/panel'); // Navigera till admin-panelen efter login
    } catch (error) {
      console.error('Inloggning misslyckades', error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem('authToken'); // Radera token från localStorage
    setUser(null);
    navigate('/admin'); // Skicka tillbaka till login-sidan
  };

  return (
    <LoginContainer>
      <LoginBox>
        {!user ? (
          <>
            <Title>Logga in</Title>
            <Input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
            <Input 
              type="password" 
              placeholder="Lösenord" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
            <Button onClick={handleLogin}>Logga in</Button>
          </>
        ) : (
          <>
            <Title>Utloggad</Title>
            <p>Du är inloggad på ett säkert sätt</p>
            <LogoutButton onClick={handleLogout}>Fortätt</LogoutButton>
          </>
        )}
      </LoginBox>
    </LoginContainer>
  );
};

export default AdminLogin;

