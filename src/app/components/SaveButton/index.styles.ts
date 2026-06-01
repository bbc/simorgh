import { css, Theme } from '@emotion/react';
import pixelsToRem from '#app/utilities/pixelsToRem';

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
    }),

  updatingState: ({ palette }: Theme) =>
    css({
      backgroundColor: palette.GREY_8,
      color: palette.WHITE,
      border: `${pixelsToRem(1)}rem solid ${palette.GREY_8}`,
      '& svg': {
        fill: palette.WHITE,
      },
      ':disabled': {
        backgroundColor: palette.GREY_8,
        cursor: 'not-allowed',
      },
    }),
};

export default styles;
