import React from 'react';
import styled from '@emotion/styled';
import { number, func } from 'prop-types';
import { GEL_SPACING } from '@bbc/gel-foundations/spacings';

const StyledButton = styled.button`
  padding: ${GEL_SPACING};
`;

const StoryNav = ({ numStories, currentStoryNum, setCurrentStoryNum }) => {
  const navButtons = new Array(numStories).fill(null).map((_, index) => (
    <li>
      <StyledButton
        type="button"
        isCurrentPage={index === currentStoryNum}
        index={index}
        setCurrentStoryNum={setCurrentStoryNum}
        onClick={() => setCurrentStoryNum(index)}
      />
    </li>
  ));

  return <ol>{navButtons}</ol>;
};

StoryNav.propTypes = {
  numStories: number.isRequired,
  currentStoryNum: number.isRequired,
  setCurrentStoryNum: func.isRequired,
};

export default StoryNav;
