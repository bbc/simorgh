import React, { useContext } from 'react';
import styled from 'styled-components';
import { GEL_SPACING_QUAD } from '@bbc/gel-foundations/spacings';
import { string } from 'prop-types';
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

const OnDemandRadioContainer = ({ externalId, id }) => {
  const { platform } = useContext(RequestContext);
  const isValidPlatform = ['amp', 'canonical'].includes(platform);

  if (!isValidPlatform || !externalId || !id) return null;

  return (
    <MediaPlayerOuterWrapper>
      <MediaPlayerInnerWrapper>
        <MediaMessage />
      </MediaPlayerInnerWrapper>
    </MediaPlayerOuterWrapper>
  );
};

OnDemandRadioContainer.propTypes = {
  externalId: string,
  id: string.isRequired,
};

OnDemandRadioContainer.defaultProps = {
  externalId: 'bbc_pashto_radio',
};

export default OnDemandRadioContainer;
