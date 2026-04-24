import { css, Theme, keyframes } from '@emotion/react';
import pixelsToRem from '#app/utilities/pixelsToRem';

const spinAnimation = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

const styles = {
  buttonWrapper: ({ mq, palette, spacings, fontVariants }: Theme) =>
    css({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '2.75rem',
      ...fontVariants.sansBold,
      gap: '0.5rem',
      whiteSpace: 'nowrap',
      width: '100%',
      padding: `${spacings.FULL}rem ${spacings.DOUBLE}rem`,
      cursor: 'pointer',
      backgroundColor: palette.WHITE,
      color: palette.GREY_8,
      border: `${pixelsToRem(1)}rem solid ${palette.GREY_8}`,
      ':hover, :focus-visible': {
        backgroundColor: palette.GREY_8,
        color: palette.WHITE,
        '& svg': {
          fill: palette.WHITE,
        },
      },
      ':focus-visible': {
        outline: `${pixelsToRem(3)}rem solid ${palette.GREY_8}`,
        boxShadow: `0 0 0 ${pixelsToRem(4)}rem ${palette.WHITE}, 0 0 0 ${pixelsToRem(9)}rem ${palette.GREY_8}`,
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
      animation: `${spinAnimation} 1s linear 0s infinite normal none running`,
      '& svg': { fill: palette.WHITE },
    }),
};

export default styles;
