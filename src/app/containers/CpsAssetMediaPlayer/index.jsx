import React from 'react';
import path from 'ramda/src/path';
import { string, bool } from 'prop-types';
import styled from 'styled-components';
import {
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
  GEL_SPACING_QUAD,
} from '@bbc/gel-foundations/spacings';

import MediaPlayerContainer from '../MediaPlayer';
import { GridItemConstrainedLargeNoMargin } from '#lib/styledGrid';
import {
  mediaPlayerPropTypes,
  emptyBlockArrayDefaultProps,
} from '#models/propTypes';
import filterForBlockType from '#lib/utilities/blockHandlers';

const Wrapper = styled(GridItemConstrainedLargeNoMargin)`
  margin-top: ${GEL_SPACING};

  ${props =>
    !props.hasBottomPadding &&
    `figure {
      padding-bottom: ${GEL_SPACING_DBL};
    }`}

  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    margin-top: ${GEL_SPACING_DBL};
  }

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    padding: 0 ${GEL_SPACING_DBL};
  }

  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    padding: ${GEL_SPACING} 0 0;
    margin-top: ${GEL_SPACING_QUAD};
    ${props =>
      !props.hasBottomPadding &&
      `figure {
        padding-bottom: ${GEL_SPACING_TRPL};
      }`}
  }
`;

const CpsAssetMediaPlayer = ({
  blocks,
  assetUri,
  isLegacyMedia,
  showLoadingImage,
  hasBottomPadding,
  showCaption,
}) => {
  if (!assetUri) return null;

  const mediaBlock = filterForBlockType(blocks, 'aresMedia');
  const metadataBlock = filterForBlockType(
    path(['model', 'blocks'], mediaBlock),
    'aresMediaMetadata',
  );

  const available = path(['model', 'available'], metadataBlock);

  return (
    <Wrapper hasBottomPadding={hasBottomPadding}>
      <MediaPlayerContainer
        blocks={blocks}
        assetId={assetUri.substr(1)}
        assetType={isLegacyMedia ? 'legacy' : 'cps'}
        showPlaceholder={false}
        available={available}
        isLegacyMedia={isLegacyMedia}
        showLoadingImage={showLoadingImage}
        showCaption={showCaption}
      />
    </Wrapper>
  );
};

CpsAssetMediaPlayer.propTypes = {
  ...mediaPlayerPropTypes,
  assetUri: string.isRequired,
  isLegacyMedia: bool,
  showLoadingImage: bool,
  hasBottomPadding: bool,
  showCaption: bool,
};
CpsAssetMediaPlayer.defaultProps = {
  ...emptyBlockArrayDefaultProps,
  isLegacyMedia: false,
  showLoadingImage: false,
  hasBottomPadding: true,
  showCaption: true,
};

export default CpsAssetMediaPlayer;
