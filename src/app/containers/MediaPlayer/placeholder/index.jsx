import React, { useState } from 'react';
import styled from 'styled-components';
import { string, node } from 'prop-types';
import Image from '@bbc/psammead-image';

const StyledPlaceholder = styled.div`
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const MediaPlayerPlaceholder = ({ src, children }) => {
  const [mediaPlayerActive, setMediaPlayerActive] = useState(false);
  const handlePlaceholderClick = () => setMediaPlayerActive(true);

  return mediaPlayerActive ? (
    <React.Fragment>{children}</React.Fragment>
  ) : (
    <StyledPlaceholder onClick={handlePlaceholderClick}>
      <Image alt="Image Alt" src={src} />
    </StyledPlaceholder>
  );
};

MediaPlayerPlaceholder.propTypes = {
  src: string.isRequired,
  children: node.isRequired,
};

export default MediaPlayerPlaceholder;
