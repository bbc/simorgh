import React from 'react';
import styled from '@emotion/styled';
import { bool, func, string } from 'prop-types';

// ${({ hasViewed }) => /* hasViewed styles */}
const HAS_VIEWED_STYLES = `
  opacity: 50%;
`;

const StyledStoryItem = styled.li`
  cursor: pointer;
  ${({ hasViewed }) => (hasViewed ? HAS_VIEWED_STYLES : '')}
`;

const StoryItem = ({ onClick, id, hasViewed, name, src }) => {
  return (
    <StyledStoryItem hasViewed={hasViewed} onClick={() => onClick(id)}>
      <img src={src} alt={name} />
      <h4>{name}</h4>
    </StyledStoryItem>
  );
};

StoryItem.propTypes = {
  onClick: func.isRequired,
  id: string.isRequired,
  hasViewed: bool.isRequired,
  name: string.isRequired,
  src: string.isRequired,
};

export default StoryItem;
