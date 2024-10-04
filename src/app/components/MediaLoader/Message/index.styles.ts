import { css, Theme } from '@emotion/react';

const NOJS_BACKGROUND_COLOUR = 'rgba(34, 34, 34, 0.75)';

export default {
  messageWrapper: ({ fontVariants, fontSizes, palette, mq }: Theme) =>
    css({
      ...fontVariants.sansRegular,
      ...fontSizes.longPrimer,
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      border: `0.0625rem solid transparent`,
      color: palette.WHITE,
      backgroundColor: NOJS_BACKGROUND_COLOUR,

      [mq.FORCED_COLOURS]: {
        backgroundColor: 'transparent',
      },
    }),
  message: ({ spacings, mq }: Theme) =>
    css({
      display: 'block',
      fontWeight: 'normal',
      bottom: 0,
      position: 'absolute',
      padding: `${spacings.FULL}rem`,
      [mq.GROUP_2_MIN_WIDTH]: {
        padding: `${spacings.DOUBLE}rem`,
      },
      [mq.FORCED_COLOURS]: {
        backgroundColor: 'window',
      },
    }),
  messageImage: () =>
    css({
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
    }),
};
