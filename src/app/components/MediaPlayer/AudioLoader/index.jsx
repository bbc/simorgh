import React from 'react';
import { node } from 'prop-types';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const Wrapper = styled.div`
  position: relative;
`;

const Overlay = styled.div`
  .no-js & {
    display: none;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const spin = keyframes`
0% {
  transform: rotate(0deg);
}
100% {
  transform: rotate(360deg);
}
`;

const Spinner = styled.div`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  border: 0.3rem solid rgba(0, 0, 0, 0.2);
  border-left-color: rgba(0, 0, 0, 0.8);
  animation: ${spin} 1.1s infinite linear;
`;

const AudioLoader = ({ children }) => {
  return (
    <Wrapper>
      <Overlay data-testid="audio-loader-overlay" aria-hidden="true">
        <Spinner />
      </Overlay>
      {children}
    </Wrapper>
  );
};

AudioLoader.propTypes = {
  children: node.isRequired,
};

export default AudioLoader;
