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
      padding: '0.5rem 1rem',
      cursor: 'pointer',
      backgroundColor: '#FFFFFF',
      color: '#202224',
      border: '1px solid #202224',
      marginTop: '1rem',
      marginBottom: '1rem',
      marginLeft: '0.5rem',
      marginRight: '0.5rem',
      ':hover': {
        backgroundColor: '#202224',
        color: '#FFFFFF',
        '& svg': {
          fill: '#FFFFFF',
        },
      },
      ':focus-visible': {
        backgroundColor: '#202224',
        color: '#FFFFFF',
        outline: '3px solid #202224',
        boxShadow: '0 0 0 6px #fff, 0 0 0 9px #202224',
        '& svg': {
          fill: '#FFFFFF',
        },
      },
      ':disabled': {
        backgroundColor: '#202224',
        color: '#FFFFFF',
        cursor: 'not-allowed',
        '& svg': {
          fill: '#FFFFFF',
        },
      },

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
