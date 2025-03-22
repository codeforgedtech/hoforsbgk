import React, { useEffect } from 'react';
import styled from 'styled-components';

const InstagramContainer = styled.div`
  text-align: center;
  margin-top: 40px;
`;

const InstagramEmbed = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <InstagramContainer>
      <h2>📸 Följ oss på Instagram</h2>
      <blockquote className="instagram-media"
        data-instgrm-permalink="https://www.instagram.com/p/Ct8XZg4uWq1/"
        data-instgrm-version="14"
        style={{ margin: '20px auto' }}
      ></blockquote>
    </InstagramContainer>
  );
};

export default InstagramEmbed;


