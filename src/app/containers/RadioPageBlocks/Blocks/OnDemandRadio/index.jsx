import React, { useContext } from 'react';
import styled from 'styled-components';
import { GEL_SPACING_QUAD } from '@bbc/gel-foundations/spacings';
import { RequestContext } from '#contexts/RequestContext';
import MediaMessage from '#pages/MediaAssetPage/MediaMessage';

const MediaPlayerOuterWrapper = styled.div`
  @media (min-width: 63rem) {
    display: flex;
    justify-content: center;
  }
`;

const MediaPlayerInnerWrapper = styled.div`
  flex-shrink: 0;
  width: 50rem;
  max-width: calc(100vw - ${GEL_SPACING_QUAD});
`;

const OnDemandRadioContainer = () => {
  const { platform } = useContext(RequestContext);
  const isValidPlatform = ['amp', 'canonical'].includes(platform);

  if (!isValidPlatform) return null;

  return (
    <MediaPlayerOuterWrapper>
      <MediaPlayerInnerWrapper>
        <MediaMessage />
      </MediaPlayerInnerWrapper>
    </MediaPlayerOuterWrapper>
  );
};

export default OnDemandRadioContainer;
