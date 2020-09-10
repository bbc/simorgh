import React from 'react';
import styled from 'styled-components';

const OuterCircle = styled.div`
  width: 12px;
  height: 12px;
  border: solid 0.09375rem #fff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InnerCircle = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #fff;
  animation: pulse 2s infinite;

  @keyframes pulse {
    0% {
      opacity: 0.5;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.5;
    }
  }
`;

export default () => (
  <OuterCircle>
    <InnerCircle />
  </OuterCircle>
);
