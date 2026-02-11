import pixelsToRem from '#app/utilities/pixelsToRem';
import { css, Theme } from '@emotion/react';

export default {
  promoContainer: ({ isDarkUi, palette, mq, spacings }: Theme) =>
    css({
      background: isDarkUi ? palette.GREY_10 : palette.WHITE,
      padding: `0 ${spacings.DOUBLE}rem ${spacings.TRIPLE}rem`,
      margin: 0,
      display: 'flex',
      overflowX: 'auto',
      width: '100%',
      [mq.GROUP_4_MIN_WIDTH]: {
        margin: `0 -${spacings.DOUBLE}rem`,
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
      width: '100%',
      height: `${spacings.QUADRUPLE}rem`,
      color: isDarkUi ? palette.GREY_2 : palette.SHADOW,
      padding: `0 ${spacings.FULL}rem`,
      [mq.FORCED_COLOURS]: {
        border: `solid ${pixelsToRem(3)}rem transparent`,
        borderBottom: 'transparent',
      },

      [mq.GROUP_0_MAX_WIDTH]: {
        marginInline: `${spacings.FULL}rem`,
        margin: 0,
      },
      [mq.GROUP_2_MIN_WIDTH]: {
        marginInline: `${spacings.DOUBLE}rem`,
        padding: `0 ${spacings.DOUBLE}rem`,
        margin: '0 -0.2rem',
      },
    }),
};
