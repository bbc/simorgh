import React from 'react';
import styled from '@emotion/styled';

import { keyframes } from '@emotion/react';

const Wrapper = styled.div`
  position: relative;
`;

const Overlay = styled.div`
  .no-js & {
    display: none;
  }
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

// Using pixels here as SMP does not change size based on user's font size
const Spinner = styled.svg`
  width: 64px;
  height: 64px;

  stroke: currentColor;
  @media screen and (-ms-high-contrast: active) {
    stroke: windowText;
  }

  will-change: transform;
  @media (prefers-reduced-motion: no-preference) {
    animation: ${spin} 1.1s 3 linear;
  }
`;

const AudioLoader = ({ children, isLoading = false }) => (
  <Wrapper>
    {isLoading && (
      <Overlay data-testid="audio-loader-overlay" aria-hidden="true">
        <Spinner
          xmlns="http://www.w3.org/2000/svg"
          width="38"
          height="38"
          viewBox="0 0 38 38"
          focusable="false"
          stroke="black"
        >
          <g fill="none" strokeWidth="2" transform="translate(1 1)">
            <circle strokeOpacity="0.2" cx="18" cy="18" r="18" />
            <path d="M36 18c0-9.94-8.06-18-18-18" />
          </g>
        </Spinner>
      </Overlay>
    )}
    {children}
  </Wrapper>
);

export default AudioLoader;
