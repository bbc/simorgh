import React from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';
import MediaPlayerContainer from '../MediaPlayer';
import { GridItemConstrainedLarge } from '#lib/styledGrid';
import {
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import {
  GEL_SPACING,
  GEL_SPACING_QUAD
} from '@bbc/gel-foundations/spacings';
import {
  mediaPlayerPropTypes,
  emptyBlockArrayDefaultProps,
} from '#models/propTypes';

const Wrapper = styled(GridItemConstrainedLarge)`
  margin-top: ${GEL_SPACING_QUAD};

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    padding-top: ${GEL_SPACING};
  }

  figure {
    padding-bottom: 0;
  }
`;

const CpsAssetMediaPlayerContainer = ({ blocks, assetUri }) => {
  if (!assetUri) return null;

  return (
    <Wrapper>
      <MediaPlayerContainer
        blocks={blocks}
        assetId={assetUri.substr(1)}
        assetType="cps"
        showPlaceholder={false}
      />
    </Wrapper>
  );
};

CpsAssetMediaPlayerContainer.propTypes = {
  ...mediaPlayerPropTypes,
  assetUri: string.isRequired,
};
CpsAssetMediaPlayerContainer.defaultProps = {
  ...emptyBlockArrayDefaultProps,
};

export default CpsAssetMediaPlayerContainer;
