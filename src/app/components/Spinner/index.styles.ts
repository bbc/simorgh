import { css, keyframes } from '@emotion/react';

const spinAnimation = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

const styles = {
  spinner: css({
    display: 'block',
    animation: `${spinAnimation} 1s linear 0s infinite normal none running`,
  }),
};

export default styles;
