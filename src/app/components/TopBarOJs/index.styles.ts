import pixelsToRem from '#app/utilities/pixelsToRem';
import { css, Theme } from '@emotion/react';

export default {
  topBarOJWrapper: ({ isDarkUi, palette, spacings, mq }: Theme) =>
    css({
      backgroundColor: isDarkUi ? palette.GREY_10 : palette.GREY_2,

      [mq.GROUP_3_MIN_WIDTH]: {
        marginInlineStart: `-${spacings.FULL}rem`,
      },

      [mq.GROUP_4_MIN_WIDTH]: {
        display: 'none',
      },
    }),
  promoContainer: ({ palette, mq, spacings }: Theme) =>
    css({
      background: palette.GREY_2,
      padding: `0 ${spacings.FULL}rem ${spacings.DOUBLE}rem`,
      margin: 0,
      display: 'flex',
      overflowX: 'auto',
      width: '100vw',
      '-ms-overflow-style': 'none',
      scrollbarWidth: 'none',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
      [mq.GROUP_2_MIN_WIDTH]: {
        padding: `0 ${spacings.DOUBLE}rem ${spacings.DOUBLE}rem`,
        margin: '0 -0.2rem',
      },
      [mq.GROUP_3_MIN_WIDTH]: {
        padding: `0 ${spacings.DOUBLE}rem ${spacings.DOUBLE}rem`,
      },

      [mq.FORCED_COLOURS]: {
        border: `solid ${pixelsToRem(3)}rem transparent`,
        borderTop: 'transparent',
      },
    }),
  labelComponent: ({
    isDarkUi,
    fontSizes,
    fontVariants,
    mq,
    palette,
    spacings,
  }: Theme) =>
    css({
      ...fontSizes.brevier,
      ...fontVariants.sansRegular,
      display: 'flex',
      alignItems: 'center',
      backgroundColor: palette.GREY_2,
      width: '100vw',
      height: `${spacings.QUADRUPLE}rem`,
      color: isDarkUi ? palette.GREY_2 : palette.SHADOW,
      padding: `0 ${spacings.FULL}rem`,
      [mq.FORCED_COLOURS]: {
        border: `solid ${pixelsToRem(3)}rem transparent`,
        borderBottom: 'transparent',
      },

      [mq.GROUP_0_MAX_WIDTH]: {
        marginInlineStart: `${spacings.FULL}rem`,
        margin: 0,
      },
      [mq.GROUP_2_MIN_WIDTH]: {
        marginInlineStart: `${spacings.DOUBLE}rem`,
        padding: `0 ${spacings.DOUBLE}rem`,
        margin: '0 -0.2rem',
      },
    }),
};
