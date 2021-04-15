import React, { useState } from 'react';
import styled from '@emotion/styled';
import { arrayOf, shape, func } from 'prop-types';
import StoryPromo from '#components/TeamJellyHack/StoryPromo';
import StoryNav from '#components/TeamJellyHack/StoryNav';

const StoryPlayerOverlay = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 100;
  top: 0;
  left: 0;
`;

const CloseButton = styled.button`
  /* styles */
`;

const StoryPlayer = ({ stories, onClose }) => {
  const [currentPage, setCurrentPage] = useState(0);
  return (
    <>
      <StoryPlayerOverlay>
        <StoryNav
          numStories={stories.length}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <CloseButton onClick={onClose} />
        <StoryPromo {...stories[currentPage]} />
      </StoryPlayerOverlay>
    </>
  );
};

StoryPlayer.propTypes = {
  stories: arrayOf(shape({})).isRequired,
  onClose: func.isRequired,
};

export default StoryPlayer;
