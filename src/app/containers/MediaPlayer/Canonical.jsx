import React, { useState } from 'react';
import styled from 'styled-components';
import Image from '@bbc/psammead-image';

const IMG_SRC =
  'https://ichef.bbci.co.uk/news/640/cpsprodpb/E7DB/production/_101655395_paulineclayton.jpg';

const StyledPlaceholder = styled.div`
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const StyledIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
  overflow: hidden;
`;

const MediaPlayer = ({ vpid }) => (
  <StyledIframe
    title="Media Player"
    src={`http://localhost.bbc.com:8080/ws/av-embeds/c3wmq4d1y3wo/${vpid}?morph_env=test`}
    scrolling="no"
    allowFullScreen
  />
);

const Canonical = ({ vpid }) => {
  const [showMediaPlayer, setShowMediaPlayer] = useState(false);
  const handlePlaceholderClick = () => setShowMediaPlayer(true);

  return showMediaPlayer ? (
    <MediaPlayer vpid={vpid} />
  ) : (
    <StyledPlaceholder onClick={handlePlaceholderClick}>
      <Image alt="Image Alt" src={IMG_SRC} />
    </StyledPlaceholder>
  );
};
export default Canonical;
