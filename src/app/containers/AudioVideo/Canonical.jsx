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
`;

const StyledPlaceholder = styled.div`
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const StyledContainer = styled.div`
  padding-top: 56.25%;
  position: relative;
  overflow: hidden;
`;

const MediaPlayer = () => (
  <StyledIframe
    title="Canonical Media Player"
    src="https://www.bbc.co.uk/news/uk-politics-46827301/embed/p06w3lfm"
    allowFullScreen
  />
);

const Canonical = () => {
  const [showMediaPlayer, setShowMediaPlayer] = useState(false);

  return (
    <StyledContainer>
      {showMediaPlayer ? (
        <MediaPlayer />
      ) : (
        <StyledPlaceholder onClick={() => setShowMediaPlayer(true)}>
          <Image alt="Img alt" src={IMG_SRC} />
        </StyledPlaceholder>
      )}
    </StyledContainer>
  );
};

export default Canonical;
