import React from 'react';
import AudioVideo from '../../components/AudioVideo';
import { audioVideoPropTypes } from '../../models/propTypes';
import MediaPlayerSettings from './MediaPlayerSettings';

const Canonical = ({ blocks }) => {
  if (!blocks) {
    return null;
  }

  return (
    <AudioVideo
      idArray={['mediaPlayer1', 'mediaPlayer2', 'mediaPlayer3']}
      mediaPlayerSettings={MediaPlayerSettings({ blocks })}
      width="100%"
      height="26em"
    />
  );
};

Canonical.propTypes = {
  ...audioVideoPropTypes,
};

export default Canonical;
