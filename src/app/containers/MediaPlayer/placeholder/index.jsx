import React from 'react';
import styled from 'styled-components';
import { string, func } from 'prop-types';
import Image from '@bbc/psammead-image';

const StyledPlaceholder = styled.div`
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const MediaPlayerPlaceholder = ({ onClick, src }) => (
  <StyledPlaceholder onClick={onClick}>
    <Image alt="Image Alt" src={src} />
  </StyledPlaceholder>
);

MediaPlayerPlaceholder.propTypes = {
  onClick: func.isRequired,
  src: string.isRequired,
};

export default MediaPlayerPlaceholder;
