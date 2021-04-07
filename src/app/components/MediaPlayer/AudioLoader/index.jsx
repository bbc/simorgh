import React from 'react';
import styled from '@emotion/styled';

const Wrapper = styled.div`
  position: relative;
`;

const Overlay = styled.div`
  position: absolute;
  background-color: black;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const AudioLoader = ({ children }) => {
  return (
    <Wrapper>
      {true && <Overlay />}
      {children}
    </Wrapper>
  );
};

export default AudioLoader;
