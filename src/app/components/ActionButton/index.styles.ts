import { css, Theme, keyframes } from '@emotion/react';

const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const styles = {
  buttonWrapper: ({ mq }: Theme) =>
    css({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      whiteSpace: 'nowrap',
      width: '100%',
      padding: '0.75rem 1rem',
      cursor: 'pointer',
      backgroundColor: 'transparent',
      color: '#000',
      border: '2px solid #000',
      marginTop: '1rem',
      marginBottom: '1rem',
      marginLeft: '0.5rem',
      marginRight: '0.5rem',
      [mq.GROUP_2_MIN_WIDTH]: {
        marginLeft: '1rem',
        marginRight: '1rem',
      },
      [mq.GROUP_3_MIN_WIDTH]: {
        width: '17.5rem',
        marginLeft: '1rem',
        marginRight: '0',
      },
    }),

  buttonAnimation: () =>
    css({
      display: 'block',
      height: '1rem',
      width: '1rem',
      animation: `${spinAnimation} 1s linear 0s infinite normal none running`,
      animationName: spinAnimation,
    }),
};

export default styles;
