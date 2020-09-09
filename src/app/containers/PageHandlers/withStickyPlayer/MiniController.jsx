import React, { useContext } from 'react';
import { MediaPlayerContext } from '../../../contexts/MediaPlayerContext';

export default () => {
  const { isPlaying, setIsPlaying } = useContext(MediaPlayerContext);

  return (
    <button
      onClick={() => {
        setIsPlaying(!isPlaying);
      }}
      type="button"
    >
      Player/Pause button here
    </button>
  );
};
