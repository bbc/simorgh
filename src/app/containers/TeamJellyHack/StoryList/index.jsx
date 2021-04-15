/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import styled from '@emotion/styled';

const StoryItem = ({ className, showStory, id, name, src, hasViewed }) => {
  return (
    <li
      id={id}
      onClick={() => showStory(id)}
      className={`${className} ${hasViewed && 'has-viewed'}`}
    >
      <img src={src} alt={name} />
      <h4>{name}</h4>
    </li>
  );
};

const StyledStoryItem = styled(StoryItem)``;

const StoryList = ({ data, showStory }) => {
  const topics = data.map(({ id, name, src, hasViewed }) => {
    return (
      <StoryItem
        key={id}
        id={id}
        name={name}
        src={src}
        hasViewed={hasViewed}
        showStory={showStory}
      />
    );
  });

  return <ol>{topics}</ol>;
};

export default StoryList;
