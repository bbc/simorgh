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
  buttonWrapper: ({ mq, palette, spacings }: Theme, isSaved: boolean) =>
    css({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      whiteSpace: 'nowrap',
      width: '100%',
      padding: `${spacings.FULL}rem ${spacings.DOUBLE}rem`,
      cursor: 'pointer',
      backgroundColor: isSaved ? palette.WHITE : palette.WHITE,
      color: isSaved ? palette.GREY_8 : palette.GREY_8,
      border: `1px solid ${palette.GREY_8}`,
      ':hover': {
        backgroundColor: palette.GREY_8,
        color: palette.WHITE,
        '& svg': {
          fill: palette.WHITE,
        },
      },
      ':focus-visible': {
        backgroundColor: palette.GREY_8,
        color: palette.WHITE,
        outline: `3px solid ${palette.GREY_8}`,
        boxShadow: `0 0 0 ${palette.WHITE}, 0 0 0 9px ${palette.GREY_8}`,
        '& svg': {
          fill: palette.WHITE,
        },
      },
      ':disabled': {
        backgroundColor: palette.GREY_8,
        color: palette.WHITE,
        cursor: 'not-allowed',
        '& svg': {
          fill: palette.WHITE,
        },
      },

      [mq.GROUP_2_MIN_WIDTH]: {
        marginLeft: spacings.DOUBLE,
        marginRight: spacings.DOUBLE,
      },
      [mq.GROUP_3_MIN_WIDTH]: {
        width: '17.5rem',
        marginLeft: spacings.DOUBLE,
        marginRight: '0',
      },
    }),
  buttonAnimation: ({ palette }: Theme) =>
    css({
      display: 'block',
      height: '1rem',
      width: '1rem',
      animation: `${spinAnimation} 1s linear 0s infinite normal none running`,
      animationName: spinAnimation,
      '& svg': { fill: palette.WHITE },
    }),
};

export default styles;
