import React, { useState } from 'react';
import { string } from 'prop-types';
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

const MediaPlayer = ({ src }) => (
  <StyledIframe
    title="Media Player"
    src={src}
    scrolling="no"
    allow="autoplay; fullscreen"
    gesture="media"
  />
);

const Canonical = ({ embedSource }) => {
  const [showMediaPlayer, setShowMediaPlayer] = useState(false);
  const handlePlaceholderClick = () => setShowMediaPlayer(true);

  return showMediaPlayer ? (
    <MediaPlayer src={embedSource} />
  ) : (
    <StyledPlaceholder onClick={handlePlaceholderClick}>
      <Image alt="Image Alt" src={IMG_SRC} />
    </StyledPlaceholder>
  );
};

MediaPlayer.propTypes = {
  src: string.isRequired,
};

Canonical.propTypes = {
  embedSource: string.isRequired,
};

export default Canonical;
