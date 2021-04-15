import React from 'react';
import styled from '@emotion/styled';

// ${({ hasViewed }) => /* hasViewed styles */}
const StyledStoryItem = styled.li``;

const StoryItem = ({ handleClick, id, name, src }) => {
  return (
    <StyledStoryItem id={id} onClick={() => handleClick(id)}>
      <img src={src} alt={name} />
      <h4>{name}</h4>
    </StyledStoryItem>
  );
};

export default StoryItem;
