import React, { useState } from 'react';
import styled from 'styled-components';
import { string, bool } from 'prop-types';
import Image from '@bbc/psammead-image';

const IMG_SRC =
  'https://ichef.bbci.co.uk/news/640/cpsprodpb/E7DB/production/_101655395_paulineclayton.jpg';

const StyledIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
  overflow: hidden;
`;

const StyledPlaceholder = styled.div`
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const MediaPlayer = () => (
  <StyledIframe
    title="Canonical Media Player"
    src="https://www.bbc.co.uk/news/uk-politics-46827301/embed/p06w3lfm"
    scrolling="no"
    allowFullScreen
  />
);

const Canonical = () => {
  const [showMediaPlayer, setShowMediaPlayer] = useState(false);
  const handlePlaceholderClick = () => setShowMediaPlayer(true);

  return showMediaPlayer ? (
    <MediaPlayer />
  ) : (
    <StyledPlaceholder onClick={handlePlaceholderClick}>
      <Image alt="Img alt" src={IMG_SRC} />
    </StyledPlaceholder>
  );
};

export default Canonical;
