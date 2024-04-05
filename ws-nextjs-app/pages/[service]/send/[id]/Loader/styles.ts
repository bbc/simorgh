import { css, keyframes } from '@emotion/react';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export default {
  loader: () =>
    css({
      animationDuration: '1s',
      animationIterationCount: 'infinite',
      animationName: spin,
      animationTimingFunction: 'linear',
    }),
};
