import React, { useContext } from 'react';
import { RequestContext } from '#contexts/RequestContext';
import { GridItemMediumNoMargin } from '#components/Grid';
import {
  mediaPlayerPropTypes,
  emptyBlockArrayDefaultProps,
} from '#models/propTypes';
import MediaPlayerContainer from '../MediaPlayer';

const MorphLivePageMediaPlayer = ({ blocks, className }) => {
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

MorphLivePageMediaPlayer.propTypes = mediaPlayerPropTypes;
MorphLivePageMediaPlayer.defaultProps = {
  ...emptyBlockArrayDefaultProps,
};

export default MorphLivePageMediaPlayer;
