import { css, Theme } from '@emotion/react';
import pixelsToRem from '#app/utilities/pixelsToRem';

export default {
  liteCTAContainer: ({ mq }: Theme) =>
    css({
      marginBottom: `${pixelsToRem(20)}rem`,
      [mq.GROUP_3_MIN_WIDTH]: {
        marginBottom: `${pixelsToRem(28)}rem`,
      },
    }),
  liteCTA: ({ spacings, mq }: Theme) =>
    css({
      display: 'inline-block',
      marginInlineStart: `${spacings.FULL}rem`,

      [mq.GROUP_2_MIN_WIDTH]: {
        marginInlineStart: `${spacings.DOUBLE}rem`,
      },
      [mq.GROUP_4_MIN_WIDTH]: {
        marginInlineStart: 0,
      },
    }),
  headlineStylesOverride: ({ spacings, mq }: Theme) =>
    css({
      paddingBottom: `${spacings.HALF}rem`,
      [mq.GROUP_3_MIN_WIDTH]: {
        paddingBottom: `${pixelsToRem(12)}rem`,
      },
    }),
};
