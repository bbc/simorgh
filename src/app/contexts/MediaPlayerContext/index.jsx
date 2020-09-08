import React, { createContext, useState } from 'react';
import { node } from 'prop-types';

const MediaPlayerContext = createContext({});

const MediaPlayerContextProvider = ({ children }) => {
  const [showMediaPlayer, setShowMediaPlayer] = useState(false);
  const toggleMediaPlayer = () => setShowMediaPlayer(!showMediaPlayer);

  return (
    <MediaPlayerContext.Provider
      value={{ showMediaPlayer, setShowMediaPlayer, toggleMediaPlayer }}
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
