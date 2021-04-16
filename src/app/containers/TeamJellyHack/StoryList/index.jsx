import React, { useReducer, useState } from 'react';
import styled from '@emotion/styled';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
} from '@bbc/gel-foundations/dist/spacings';

import StoryPlayer from '#containers/TeamJellyHack/StoryPlayer';
import StoryItem from '#components/TeamJellyHack/StoryItem';
import storiesInitialData from './stories.json';

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

const Container = styled.div`
  margin-top: ${GEL_SPACING_DBL};
`;

const StoryItems = styled.ol`
  display: flex;
  list-style: none;
  margin: 0 ${GEL_SPACING};
  overflow-x: auto;
  padding-bottom: ${GEL_SPACING};
  padding-left: 0;
`;

const StoryList = () => {
  const [isStoryPlayerVisible, setIsStoryPlayerVisible] = useState(false);
  const [activeStoryId, setActiveStoryId] = useState(null);
  const [storiesData, dispatch] = useReducer(
    storiesReducer,
    storiesInitialData,
  );

  const handleStoryClick = id => {
    setActiveStoryId(id);
    setIsStoryPlayerVisible(true);
    dispatch({ type: 'VIEWED', storyId: id });
  };

  const hideStoryPlayer = () => {
    setIsStoryPlayerVisible(isVisible => !isVisible);
  };

  return (
    <Container>
      {isStoryPlayerVisible && (
        <StoryPlayer
          stories={storiesData[activeStoryId].stories}
          onClose={hideStoryPlayer}
        />
      )}
      <StoryItems>
        {Object.entries(storiesData).map(([id, { hasViewed, name, src }]) => (
          <StoryItem
            key={id}
            id={id}
            hasViewed={hasViewed}
            name={name}
            src={src}
            onClick={handleStoryClick}
          />
        ))}
      </StoryItems>
    </Container>
  );
};

export default StoryList;
