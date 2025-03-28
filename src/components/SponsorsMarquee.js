import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { firestore } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const ScrollingContainer = styled.div`
  width: 100%;
  overflow: hidden;
  background-color: #f9f9f9;
  padding: 10px 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  white-space: nowrap;
  position: relative;
`;

const ScrollingContent = styled.div`
  display: flex;
  gap: 30px; /* Ökad mellanrum för bättre synlighet */
  width: max-content; /* Gör att raden sträcker sig så långt det behövs */
  animation: scroll 150s linear infinite; /* Långsammare scroll */

  &:hover {
    animation-play-state: paused; /* Pausa vid hover */
  }

  @keyframes scroll {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(-100%);
    }
  }
`;

const SponsorLogo = styled.img`
  height: 80px;
  width: auto;
  object-fit: contain;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.1);
  }
`;

const SponsorsMarquee = () => {
  const [sponsors, setSponsors] = useState([]);

  useEffect(() => {
    const fetchSponsors = async () => {
      const querySnapshot = await getDocs(collection(firestore, 'sponsors'));
      const sponsorList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSponsors(sponsorList);
    };

    fetchSponsors();
  }, []);

  return (
    <ScrollingContainer>
      <ScrollingContent>
        {[...sponsors, ...sponsors].map((sponsor, index) => ( // Dubbel lista för sömlös scroll
          sponsor.sponsorLink ? (
            <a key={index} href={sponsor.sponsorLink} target="_blank" rel="noopener noreferrer">
              <SponsorLogo src={sponsor.imageUrl} alt="Sponsor" />
            </a>
          ) : (
            <SponsorLogo key={index} src={sponsor.imageUrl} alt="Sponsor" />
          )
        ))}
      </ScrollingContent>
    </ScrollingContainer>
  );
};

export default SponsorsMarquee;


