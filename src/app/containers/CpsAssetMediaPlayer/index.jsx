import React from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';
import MediaPlayerContainer from '../MediaPlayer';
import { GridItemConstrainedLarge } from '#lib/styledGrid';
import {
  mediaPlayerPropTypes,
  emptyBlockArrayDefaultProps,
} from '#models/propTypes';

const Wrapper = styled(GridItemConstrainedLarge)`
  margin-bottom: 1.5rem;
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
