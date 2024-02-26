import React, { useContext } from 'react';
import { RequestContext } from '#contexts/RequestContext';
import { GridItemMediumNoMargin } from '#components/Grid';
import {
  mediaPlayerPropTypes,
  emptyBlockArrayDefaultProps,
} from '#models/propTypes';
import MediaPlayerContainer from '../MediaPlayer';

const LegacyLivePageMediaPlayer = ({ blocks, className }) => {
  const { id } = useContext(RequestContext);

  return (
    <GridItemMediumNoMargin className={className}>
      <MediaPlayerContainer
        blocks={blocks}
        assetId={id}
        assetType="live"
        showPlaceholder
      />
    </GridItemMediumNoMargin>
  );
};

LegacyLivePageMediaPlayer.propTypes = mediaPlayerPropTypes;
LegacyLivePageMediaPlayer.defaultProps = {
  ...emptyBlockArrayDefaultProps,
};

export default LegacyLivePageMediaPlayer;
