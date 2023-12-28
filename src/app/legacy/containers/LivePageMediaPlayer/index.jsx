import React, { useContext } from 'react';
import { RequestContext } from '#contexts/RequestContext';
import { GridItemMediumNoMargin } from '#components/Grid';
import {
  mediaPlayerPropTypes,
  emptyBlockArrayDefaultProps,
} from '#models/propTypes';
import MediaPlayer from '../../../components/MediaPlayer';

const LivePageMediaPlayer = ({ blocks, className }) => {
  const { id, isAmp, pageType } = useContext(RequestContext);

  return (
    <GridItemMediumNoMargin className={className}>
      <MediaPlayer
        blocks={blocks}
        assetId={'p0gv2ph2'}
        pageType={pageType}
        isAmp={isAmp}
      />
    </GridItemMediumNoMargin>
  );
};

LivePageMediaPlayer.propTypes = mediaPlayerPropTypes;
LivePageMediaPlayer.defaultProps = {
  ...emptyBlockArrayDefaultProps,
};

export default LivePageMediaPlayer;
