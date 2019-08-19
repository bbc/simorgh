import React, { useState } from 'react';
import styled from 'styled-components';
import { string, bool, node } from 'prop-types';
import MediaPlayerPlaceholder from '../placeholder';

const landscapeRatio = '56.25%'; // (9/16)*100 = 16:9
const portraitRatio = '177.78%'; // (16/9)*100 = 9:16

const StyledContainer = styled.div`
  padding-top: ${({ orientation }) =>
    orientation === 'Portrait' ? portraitRatio : landscapeRatio};
  position: relative;
  overflow: hidden;
`;

const MediaPlayerWrapper = ({ showPlaceholder, src, children }) => {
  const [mediaPlayerActive, setMediaPlayerActive] = useState(!showPlaceholder);
  const handlePlaceholderClick = () => setMediaPlayerActive(true);

  return (
    <StyledContainer>
      {mediaPlayerActive ? (
        <React.Fragment>{children}</React.Fragment>
      ) : (
        <MediaPlayerPlaceholder onClick={handlePlaceholderClick} src={src} />
      )}
    </StyledContainer>
  );
};

MediaPlayerWrapper.propTypes = {
  showPlaceholder: bool.isRequired,
  src: string.isRequired,
  children: node.isRequired,
};

export default MediaPlayerWrapper;
