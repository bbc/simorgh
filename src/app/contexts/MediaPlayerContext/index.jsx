import React, { createContext, useState } from 'react';
import { node } from 'prop-types';

const MediaPlayerContext = createContext({});

const MediaPlayerContextProvider = ({ children }) => {
  const [mediaPlayerProps, setMediaPlayerProps] = useState(null);
  const [showMediaPlayer, setShowMediaPlayer] = useState(false);
  const toggleMediaPlayer = () => setShowMediaPlayer(!showMediaPlayer);
  const initialiseMediaPlayer = _mediaPlayerProps =>
    setMediaPlayerProps(_mediaPlayerProps);

  return (
    <MediaPlayerContext.Provider
      value={{
        showMediaPlayer,
        setShowMediaPlayer,
        toggleMediaPlayer,
        initialiseMediaPlayer,
        mediaPlayerProps,
      }}
    >
      {children}
    </MediaPlayerContext.Provider>
  );
};

const MediaPlayerContextConsumer = MediaPlayerContext.Consumer;

MediaPlayerContextProvider.propTypes = {
  children: node.isRequired,
};

export {
  MediaPlayerContext,
  MediaPlayerContextProvider,
  MediaPlayerContextConsumer,
};
