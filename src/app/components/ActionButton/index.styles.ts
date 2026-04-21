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
  buttonWrapper: ({ mq, palette, spacings }: Theme) =>
    css({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacings.FULL,
      whiteSpace: 'nowrap',
      width: '100%',
      padding: `${spacings.FULL}rem ${spacings.DOUBLE}rem`,
      cursor: 'pointer',
      backgroundColor: palette.WHITE,
      color: palette.GREY_8,
      border: `pixelsToRem(1) solid ${palette.GREY_8}`,
      margin: `${spacings.DOUBLE}rem ${spacings.FULL}rem`,
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
        outline: `pixelsToRem(3) solid ${palette.GREY_8}`,
        boxShadow: `0 0 0 ${palette.WHITE}, 0 0 0 pixelsToRem(9) ${palette.GREY_8}`,
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
  buttonAnimation: ({ spacings }: Theme) =>
    css({
      display: 'block',
      height: spacings.DOUBLE,
      width: spacings.DOUBLE,
      animation: `${spinAnimation} 1s linear 0s infinite normal none running`,
      animationName: spinAnimation,
    }),
};

export default styles;
