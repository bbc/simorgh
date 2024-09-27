import BASE64_PLACEHOLDER_IMAGE from '#app/components/Image/base64Placeholder';
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
  ampIframeWrapper: ({ palette }: Theme) =>
    css({
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: palette.LUNAR,
      height: '100%',
    }),
  ampIframePlaceholder: ({ mq }: Theme) =>
    css({
      backgroundImage: `url(${BASE64_PLACEHOLDER_IMAGE})`,
      backgroundPosition: 'center center',
      backgroundRepeat: ' no-repeat',
      backgroundSize: '60px 17px',

      [mq.GROUP_2_MIN_WIDTH]: {
        backgroundSize: ' 77px 22px',
      },
      [mq.GROUP_4_MIN_WIDTH]: {
        backgroundSize: ' 93px 27px',
      },
    }),
};
