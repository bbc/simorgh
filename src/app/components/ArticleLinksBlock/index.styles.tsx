import pixelsToRem from '#app/utilities/pixelsToRem';
import { css, type Theme } from '@emotion/react';

export default {
  promoContainer: ({ mq, spacings }: Theme) =>
    css({
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
      width: '100%',
      height: `${spacings.QUADRUPLE}rem`,
      color: isDarkUi ? palette.GREY_2 : palette.SHADOW,
      padding: `0 ${spacings.DOUBLE}rem`,

      [mq.FORCED_COLOURS]: {
        border: `solid ${pixelsToRem(3)}rem transparent`,
        borderBottom: 'transparent',
      },

      [mq.GROUP_4_MIN_WIDTH]: {
        padding: 0,
      },
    }),
};
