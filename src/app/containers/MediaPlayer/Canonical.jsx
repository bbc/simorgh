import React, { useState } from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';
import Image from '@bbc/psammead-image';

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
    src={src}
    scrolling="no"
    allow="autoplay; fullscreen"
    gesture="media"
  />
);

const Canonical = ({ embedSrc, placeholderSrc }) => {
  const [showMediaPlayer, setShowMediaPlayer] = useState(false);
  const handlePlaceholderClick = () => setShowMediaPlayer(true);

  return showMediaPlayer ? (
    <MediaPlayer src={embedSrc} />
  ) : (
    <StyledPlaceholder onClick={handlePlaceholderClick}>
      <Image alt="Image Alt" src={placeholderSrc} />
    </StyledPlaceholder>
  );
};

MediaPlayer.propTypes = {
  src: string.isRequired,
};

Canonical.propTypes = {
  embedSrc: string.isRequired,
  placeholderSrc: string.isRequired,
};

export default Canonical;
