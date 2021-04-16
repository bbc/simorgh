import React from 'react';
import styled from '@emotion/styled';
import { number, func } from 'prop-types';
import { GEL_SPACING, GEL_SPACING_TRPL } from '@bbc/gel-foundations/spacings';

import { C_RHINO, C_WHITE } from '@bbc/psammead-styles/colours';

const StyledNav = styled.ol`
  display: grid;
  grid-template-columns: repeat(${({ columns }) => columns}, 1fr);
  gap: ${GEL_SPACING};
  list-style: none;
  padding: 0;
  margin-top: ${GEL_SPACING_TRPL};
`;

const StyledButtonWrapper = styled.li`
  display: block;
`;

const StyledButton = styled.button`
  display: block;
  width: 100%;
  height: 2px;
  border: none;
  margin: 0;
  background: none;
  padding: ${GEL_SPACING} 0;
  outline: none;
  cursor: pointer;
`;

const StyledProgressBar = styled.div`
  display: block;
  height: 3px;
  background: ${C_RHINO};
`;

const StyledProgressBarIndicator = styled.div`
  width: ${({ isActiveStory }) => (isActiveStory ? '100%' : '0%')};
  height: 3px;
  background: ${C_WHITE};
`;

const StoryNav = ({ numStories, currentStoryIndex, setCurrentStoryIndex }) => {
  const navButtons = new Array(numStories).fill(null).map((_, index) => {
    const isActiveStory = index === currentStoryIndex;
    return (
      <StyledButtonWrapper>
        <StyledButton
          type="button"
          isActiveStory={isActiveStory}
          index={index}
          setCurrentStoryIndex={setCurrentStoryIndex}
          onClick={() => setCurrentStoryIndex(index)}
        >
          <StyledProgressBar>
            <StyledProgressBarIndicator isActiveStory={isActiveStory} />
          </StyledProgressBar>
        </StyledButton>
      </StyledButtonWrapper>
    );
  });

  return <StyledNav columns={numStories}>{navButtons}</StyledNav>;
};

StoryNav.propTypes = {
  numStories: number.isRequired,
  currentStoryIndex: number.isRequired,
  setCurrentStoryIndex: func.isRequired,
};

export default StoryNav;
