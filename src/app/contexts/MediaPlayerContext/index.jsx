import React, { createContext, useState, useEffect } from 'react';
import { node } from 'prop-types';
import pipe from 'ramda/src/pipe';

const MediaPlayerContext = createContext({});

const MediaPlayerContextProvider = ({ children }) => {
  const [mediaPlayerProps, setMediaPlayerProps] = useState(null);
  const [showMediaPlayer, setShowMediaPlayer] = useState(false);
  const [playerIsInitialised, setPlayerIsInitialised] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const toggleMediaPlayer = () => {
    setIsPlaying(!showMediaPlayer);
    setShowMediaPlayer(!showMediaPlayer);
  };
  const initialiseMediaPlayer = _mediaPlayerProps => {
    setMediaPlayerProps(_mediaPlayerProps);
    setPlayerIsInitialised(true);
  };
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  useEffect(() => {
    const mediaPlayerIframe = document.querySelector(
      'iframe[class^="StyledIframe"]',
    );
    if (mediaPlayerIframe) {
      if (isPlaying) {
        mediaPlayerIframe.contentWindow.postMessage('play', '*');
      } else {
        mediaPlayerIframe.contentWindow.postMessage('pause', '*');
      }
    }
  }, [isPlaying]);

  return (
    <MediaPlayerContext.Provider
      value={{
        showMediaPlayer,
        setShowMediaPlayer,
        toggleMediaPlayer,
        initialiseMediaPlayer,
        mediaPlayerProps,
        playerIsInitialised,
        setIsPlaying,
        isPlaying,
        isPlayerReady,
        setIsPlayerReady,
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
