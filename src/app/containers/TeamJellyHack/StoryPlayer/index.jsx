import React, { useState } from 'react';
import styled from '@emotion/styled';
import StoryPromo from '#components/TeamJellyHack/StoryPromo';
import StoryNav from '#components/TeamJellyHack/StoryNav';

const StoryPlayerOverlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: black;
`;

const CloseButton = styled.button`
  /* styles */
`;

const StoryPlayer = ({ data, onClose }) => {
  const [currentPage, setCurrentPage] = useState(0);
  return (
    <>
      <StoryPlayerOverlay>
        <StoryNav
          numStories={data.stories.length}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <CloseButton onClick={onClose} />
        <StoryPromo {...data.stories[currentPage]} />
      </StoryPlayerOverlay>
    </>
  );
};

export default StoryPlayer;
