import React from 'react';
import styled from 'styled-components';

const ScrollingContainer = styled.div`
  width: 100%;
  overflow: hidden;
  background-color: #f9f9f9;
  padding: 10px 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
`;

const ScrollingContent = styled.div`
  display: flex;
  gap: 20px;
  animation: scroll 30s linear infinite;

  @keyframes scroll {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(-100%);
    }
  }
`;

const SponsorLogo = styled.img`
  height: 100px;
  width: auto;
  object-fit: contain;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

const SponsorsMarquee = () => {
  const sponsors = [...Array(20)].map((_, index) => `${process.env.PUBLIC_URL}/assets/sponsorer/sponsor${index + 1}.jpg`);

  return (
    <ScrollingContainer>
      <ScrollingContent>
        {sponsors.concat(sponsors).map((sponsor, index) => ( // Duplicate the array for seamless scrolling
          <SponsorLogo key={index} src={sponsor} alt={`Sponsor ${index + 1}`} />
        ))}
      </ScrollingContent>
    </ScrollingContainer>
  );
};

export default SponsorsMarquee;
