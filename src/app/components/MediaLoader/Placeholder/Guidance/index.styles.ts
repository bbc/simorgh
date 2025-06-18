import { css, Theme } from '@emotion/react';
import NO_JS_CLASSNAME from '#app/lib/noJs.const';

const GUIDANCE_BACKGROUND = 'rgba(34, 34, 34, 0.75)';

const styles = {
  guidanceWrapper: ({ palette, fontSizes, fontVariants, mq }: Theme) =>
    css({
      ...fontSizes.longPrimer,
      ...fontVariants.sansRegular,
      width: '100%',
      height: '100%',
      position: 'absolute',
      border: '0.0625rem solid transparent',
      color: palette.WHITE,

      [`.${NO_JS_CLASSNAME} &`]: {
        backgroundColor: GUIDANCE_BACKGROUND,

        [mq.FORCED_COLOURS]: {
          backgroundColor: 'transparent',
        },
        '.guidance-message': {
          display: 'none',
        },
      },
    }),
  guidanceWrapperWithMessage: ({ mq }: Theme) =>
    css({
      backgroundColor: GUIDANCE_BACKGROUND,

      [mq.FORCED_COLOURS]: {
        backgroundColor: 'transparent',
      },
    }),
  guidanceMessage: ({ spacings, mq }: Theme) =>
    css({
      display: 'block',
      fontWeight: 'normal',
      padding: `${spacings.FULL}rem`,
      borderBottom: '0.0625rem solid transparent',

      [mq.FORCED_COLOURS]: {
        backgroundColor: 'window',
      },
      [mq.GROUP_2_MIN_WIDTH]: {
        padding: `${spacings.DOUBLE}rem`,
      },
    }),
  noscript: () =>
    css({
      position: 'absolute',
      bottom: 0,

      strong: {
        fontWeight: 'normal',
      },
    }),
};
export default styles;
