// Komponenten MediaItem.jsx
import React from 'react';
import styled from 'styled-components';

const MediaItemWrapper = styled.div`
  max-width: calc(25% - 20px);
  width: 100%;
  height: auto;
  margin: 10px;
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  @media (max-width: 768px) {
    max-width: calc(50% - 20px);
  }
`;

const Thumbnail = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

const YouTubePlayer = styled.iframe`
  width: 100%;
  height: 220px;
  display: block;
  border: none;
  @media (max-width: 768px) {
    height: 150px; /* Justera höjden för att passa bättre på mindre skärmar */
    max-width: 100%; /* Säkerställ att det tar upp hela bredden på mobila enheter */
  }

`;

const MediaItem = ({ media, index, onMediaClick }) => {
  const handleClick = () => {
    onMediaClick(index);
  };

  if (media.type === 'image') {
    return (
      <MediaItemWrapper onClick={handleClick}>
        <Thumbnail
          src={media.url}
          alt={`Thumbnail ${index + 1}`}
        />
      </MediaItemWrapper>
    );
  } else if (media.type === 'video') {
    const videoId = media.youtubeLink.split('v=')[1];
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;

    return (
      <MediaItemWrapper onClick={handleClick}>
        <YouTubePlayer
          src={embedUrl}
          title={`YouTube Video ${index + 1}`}
          allowFullScreen
        />
      </MediaItemWrapper>
    );
  } else {
    return null;
  }
};

export default MediaItem;
