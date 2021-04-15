/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import styled from '@emotion/styled';
import StoryPlayer from '../StoryPlayer';
import data from 'stories-content.json';

const StoryItem = ({ className, showStory, id, name, src }) => {
  return (
    <li id={id} onClick={() => showStory(id)} className={className}>
      <img src={src} alt={name} />
      <h4>{name}</h4>
    </li>
  );
};

const StyledStoryItem = styled(StoryItem)`
  ${({ hasViewed }) => /* hasViewed styles */}
`;

const StoryList = () => {
  const [isStoryOverlayVisible, setStoryOverlayVisible] = useState(false);
  const [activeStoryId, setActiveStoryId] = useState(null);
  const [storiesState, setStoriesState] = useState(data);


  const showStory = (id) => {
    setStoryOverlayVisible(true);
    setActiveStoryId(id);

  }

  const topics = data.map(({ id, name, src, hasViewed }) => {
    return (
      <StyledStoryItem
        key={id}
        id={id}
        name={name}
        src={src}
        hasViewed={hasViewed}
        showStory={showStory}
      />
    );
  });

  return (
    <>
      {isStoryOverlayVisible && <StoryPlayer stories={storiesState.activeStoryId}/>}
      <ol>{topics}</ol>
    </>
  );
};

export default StoryList;
