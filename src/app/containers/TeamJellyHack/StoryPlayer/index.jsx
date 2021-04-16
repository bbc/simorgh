import React, { useState } from 'react';
import styled from '@emotion/styled';
import { arrayOf, shape, func } from 'prop-types';
import {
  GEL_SPACING,
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
  margin-right: auto;
  margin-left: auto;
  max-width: ${MAX_WIDTH};
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: ${GEL_SPACING_DBL} ${GEL_SPACING};

  svg {
    width: ${GEL_SPACING_QUAD};
    height: ${GEL_SPACING_QUAD};
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const StoryPlayer = ({ stories, onClose }) => {
  const [currentStoryNum, setCurrentStoryNum] = useState(0);

  return (
    <Overlay>
      <Container>
        <StoryNav
          numStories={stories.length}
          currentStoryNum={currentStoryNum}
          setCurrentStoryNum={setCurrentStoryNum}
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
        <StoryPromo {...stories[currentStoryNum]} />
      </Container>
    </Overlay>
  );
};

StoryPlayer.propTypes = {
  stories: arrayOf(shape({})).isRequired,
  onClose: func.isRequired,
};

export default StoryPlayer;
