import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { arrayOf, shape, func } from 'prop-types';
import {
  GEL_SPACING_DBL,
  GEL_SPACING_QUAD,
} from '@bbc/gel-foundations/dist/spacings';
import StoryPromo from '#components/TeamJellyHack/StoryPromo';
import StoryNav from '#components/TeamJellyHack/StoryNav';

const MAX_WIDTH = '30rem';

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.9);
  height: 100vh;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 100;
`;

const Container = styled.div`
  max-width: ${MAX_WIDTH};
  padding: 0 ${GEL_SPACING_DBL};
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-bottom: ${GEL_SPACING_DBL};

  svg {
    width: ${GEL_SPACING_QUAD};
    height: ${GEL_SPACING_QUAD};
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;

const StoryPlayer = ({ stories, onClose }) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (currentStoryIndex < stories.length - 1) {
        setCurrentStoryIndex(s => s + 1);
      }
    }, 3000);
    return () => clearTimeout(timerId);
  }, [currentStoryIndex, stories.length]);

  return (
    <Overlay>
      <Container>
        <StoryNav
          numStories={stories.length}
          currentStoryIndex={currentStoryIndex}
          setCurrentStoryIndex={setCurrentStoryIndex}
        />
        <Header>
          <CloseButton onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#FFFFFF"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </CloseButton>
        </Header>
        <StoryPromo {...stories[currentStoryIndex]} />
      </Container>
    </Overlay>
  );
};

StoryPlayer.propTypes = {
  stories: arrayOf(shape({})).isRequired,
  onClose: func.isRequired,
};

export default StoryPlayer;
