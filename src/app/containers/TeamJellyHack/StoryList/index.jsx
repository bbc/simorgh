/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';

import StoryPlayer from '#containers/TeamJellyHack/StoryPlayer';
import StoryItem from '#components/TeamJellyHack/StoryItem';
import storiesData from './stories.json';

const StoryList = () => {
  const [isStoryOverlayVisible, setStoryOverlayVisible] = useState(false);
  const [activeStoryId, setActiveStoryId] = useState(null);
  const [stories, setStories] = useState(storiesData);

  const showStory = id => {
    setStoryOverlayVisible(true);
    setActiveStoryId(id);
  };

  return (
    <>
      {isStoryOverlayVisible && (
        <StoryPlayer stories={stories[activeStoryId]} />
      )}
      {/* <StoryItem
        key={id}
        id={id}
        name={name}
        src={src}
        hasViewed={hasViewed}
        handleClick={showStory}
      /> */}
    </>
  );
};

export default StoryList;
