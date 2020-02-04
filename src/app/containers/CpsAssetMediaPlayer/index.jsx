import React from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';
import { GEL_GROUP_4_SCREEN_WIDTH_MIN } from '@bbc/gel-foundations/breakpoints';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_QUAD,
} from '@bbc/gel-foundations/spacings';

import MediaPlayerContainer from '../MediaPlayer';
import { GridItemConstrainedLarge } from '#lib/styledGrid';
import {
  mediaPlayerPropTypes,
  emptyBlockArrayDefaultProps,
} from '#models/propTypes';
import filterForBlockType from '#lib/utilities/blockHandlers';

const Wrapper = styled(GridItemConstrainedLarge)`
  margin-top: ${GEL_SPACING_DBL};

  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    padding-top: ${GEL_SPACING};
    margin-top: ${GEL_SPACING_QUAD};
  }

  figure {
    padding-bottom: 0;
  }
`;

const CpsAssetMediaPlayerContainer = ({ blocks, assetUri }) => {
  if (!assetUri) return null;

  const mediaBlock = filterForBlockType(blocks, 'aresMedia');
  const metadataBlock = filterForBlockType(
    mediaBlock.model.blocks,
    'aresMediaMetadata',
  );

  const { available } = metadataBlock.model;

  return (
    <Wrapper>
      <MediaPlayerContainer
        blocks={blocks}
        assetId={assetUri.substr(1)}
        assetType="cps"
        showPlaceholder={false}
        available={available}
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
