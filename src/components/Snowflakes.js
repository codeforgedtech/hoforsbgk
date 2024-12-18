import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const fall = keyframes`
  0% {
    transform: translateY(-100px);
    opacity: 1;
  }
  100% {
    transform: translateY(100vh);
    opacity: 0;
  }
`;

const Snowflake = styled.div`
  position: absolute;
  top: -50px;
  left: ${({ left }) => left}%;
  font-size: ${({ size }) => size}px;
  color: #ffffff;
  opacity: ${({ opacity }) => opacity};
  animation: ${fall} ${({ duration }) => duration}s linear infinite;
`;

const SnowContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none; /* Gör att snöflingorna inte blockerar interaktion */
  z-index: 9999;
`;

const Snowflakes = ({ count = 50 }) => {
  const [snowflakes, setSnowflakes] = useState([]);

  useEffect(() => {
    const flakes = Array.from({ length: count }).map(() => ({
      id: Math.random(),
      left: Math.random() * 100, // Slumpmässig startposition
      size: Math.random() * 10 + 5, // Slumpmässig storlek
      opacity: Math.random(), // Slumpmässig opacitet
      duration: Math.random() * 5 + 5, // Slumpmässig fallhastighet
    }));
    setSnowflakes(flakes);
  }, [count]);

  return (
    <SnowContainer>
      {snowflakes.map(({ id, left, size, opacity, duration }) => (
        <Snowflake
          key={id}
          left={left}
          size={size}
          opacity={opacity}
          duration={duration}
        >
          ❄
        </Snowflake>
      ))}
    </SnowContainer>
  );
};

export default Snowflakes;
