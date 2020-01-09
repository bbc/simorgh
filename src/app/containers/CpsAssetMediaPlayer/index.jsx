import React from 'react';
import { string } from 'prop-types';
import MediaPlayerContainer from '../MediaPlayer';
import Grid from '#app/components/Grid';
import { emptyBlockArrayDefaultProps, mediaPlayerPropTypes } from '#models/propTypes';

const CpsAssetMediaPlayerContainer = ({ blocks, assetUri }) => {
  if (!assetUri) return null;

  return (
    <Grid
      item
      startOffset={{
        group0: 1,
        group1: 1,
        group2: 1,
        group3: 1,
        group4: 2,
        group5: 5,
      }}
      columns={{
        group0: 6,
        group1: 6,
        group2: 6,
        group3: 6,
        group4: 8,
        group5: 12,
      }}
    >
      <MediaPlayerContainer
        blocks={blocks}
        assetId={assetUri.substr(1)}
        assetType="cps"
        showPlaceholder={false}
      />
    </Grid>
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
