import { css, Theme, keyframes } from '@emotion/react';
import pixelsToRem from '#app/utilities/pixelsToRem';

const spinAnimation = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

const styles = {
  buttonWrapper: ({ palette, spacings, fontVariants, fontSizes }: Theme) =>
    css({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '2.75rem',
      ...fontVariants.sansBold,
      ...fontSizes.pica,
      gap: `${spacings.FULL}rem`,
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
    }),

  mutatingState: ({ palette }: Theme) =>
    css({
      backgroundColor: palette.BLACK,
      color: palette.WHITE,
      border: `${pixelsToRem(1)}rem solid ${palette.BLACK}`,
      '& svg': {
        fill: palette.WHITE,
      },
      ':disabled': {
        backgroundColor: palette.BLACK,
        cursor: 'not-allowed',
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
