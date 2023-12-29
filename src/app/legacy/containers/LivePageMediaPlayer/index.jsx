import React, { useContext } from 'react';
import { RequestContext } from '#contexts/RequestContext';
import { GridItemMediumNoMargin } from '#components/Grid';
import {
  mediaPlayerPropTypes,
  emptyBlockArrayDefaultProps,
} from '#models/propTypes';
import MediaPlayer from '../../../components/MediaPlayer';

const LivePageMediaPlayer = ({ blocks, className }) => {
  const { id, pageType } = useContext(RequestContext);

  return (
    <GridItemMediumNoMargin className={className}>
      <MediaPlayer blocks={blocks} assetId={id} pageType={pageType} />
    </GridItemMediumNoMargin>
  );
};

LivePageMediaPlayer.propTypes = mediaPlayerPropTypes;
LivePageMediaPlayer.defaultProps = {
  ...emptyBlockArrayDefaultProps,
};

export default LivePageMediaPlayer;
