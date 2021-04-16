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
  width: ${({ isCurrentPage }) => (isCurrentPage ? '100%' : '0%')};
  height: 3px;
  background: ${C_WHITE};
`;

const StoryNav = ({ numStories, currentStoryNum, setCurrentStoryNum }) => {
  const navButtons = new Array(numStories).fill(null).map((_, index) => {
    const isCurrentPage = index === currentStoryNum;
    return (
      <StyledButtonWrapper>
        <StyledButton
          type="button"
          isCurrentPage={isCurrentPage}
          index={index}
          setCurrentStoryNum={setCurrentStoryNum}
          onClick={() => setCurrentStoryNum(index)}
        >
          <StyledProgressBar>
            <StyledProgressBarIndicator isCurrentPage={isCurrentPage} />
          </StyledProgressBar>
        </StyledButton>
      </StyledButtonWrapper>
    );
  });

  return <StyledNav columns={numStories}>{navButtons}</StyledNav>;
};

StoryNav.propTypes = {
  numStories: number.isRequired,
  currentStoryNum: number.isRequired,
  setCurrentStoryNum: func.isRequired,
};

export default StoryNav;
