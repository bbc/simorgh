/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useReducer, useState } from 'react';

import StoryPlayer from '#containers/TeamJellyHack/StoryPlayer';
import StoryItem from '#components/TeamJellyHack/StoryItem';
import storiesData from './stories.json';

const storiesReducer = (state, action) => {
  switch (action.type) {
    case 'VIEWED':
      return {
        ...state,
        [action.storyId]: {
          ...state[action.storyId],
          hasViewed: true,
        },
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}.`);
  }
};
const StoryList = () => {
  const [isStoryPlayerVisible, setIsStoryPlayerVisible] = useState(false);
  const [activeStoryId, setActiveStoryId] = useState(null);
  const [stories, dispatch] = useReducer(storiesReducer, storiesData);

  const handleStoryClick = id => {
    setActiveStoryId(id);
    setIsStoryPlayerVisible(true);
    dispatch({ type: 'VIEWED', storyId: id });
  };

  const hideStoryPlayer = () => {
    setIsStoryPlayerVisible(isVisible => !isVisible);
  };

  return (
    <>
      {isStoryPlayerVisible && (
        <StoryPlayer
          stories={stories[activeStoryId]}
          onClose={hideStoryPlayer}
        />
      )}
      <ol>
        {Object.entries(stories).map(([id, { hasViewed, name, src }]) => (
          <StoryItem
            key={id}
            id={id}
            hasViewed={hasViewed}
            name={name}
            src={src}
            onClick={handleStoryClick}
          />
        ))}
      </ol>
    </>
  );
};

export default StoryList;
