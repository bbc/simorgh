import React from 'react';
import styled from 'styled-components';
import MediaPlayerContainer from '../MediaPlayer';
import { GridItemConstrainedLarge } from '#lib/styledGrid';
import {
  mediaPlayerPropTypes,
  emptyBlockArrayDefaultProps,
} from '#models/propTypes';

const Wrapper = styled(GridItemConstrainedLarge)`
  padding-bottom: 1.5rem;
`;

const CpsAssetMediaPlayerContainer = ({ blocks, assetUri }) => (
  <Wrapper>
    <MediaPlayerContainer
      block={blocks}
      assetId={assetUri}
      assetType="cps"
      showPlaceholder={false}
    />
  </Wrapper>
);

CpsAssetMediaPlayerContainer.propTypes = mediaPlayerPropTypes;
CpsAssetMediaPlayerContainer.defaultProps = {
  ...emptyBlockArrayDefaultProps,
};

export default CpsAssetMediaPlayerContainer;
