/** @jsx jsx */
import { jsx } from '@emotion/react';
import {
  mediaPlayerPropTypes,
  emptyBlockArrayDefaultProps,
} from '#models/propTypes';
import MediaPlayer from '../../../components/MediaPlayer';

const LivePageMediaPlayer = ({ blocks, className }) => {
  return (
    <div className={className}>
      <MediaPlayer blocks={blocks} />
    </div>
  );
};

LivePageMediaPlayer.propTypes = mediaPlayerPropTypes;
LivePageMediaPlayer.defaultProps = {
  ...emptyBlockArrayDefaultProps,
};

export default LivePageMediaPlayer;
