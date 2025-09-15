import { css, Theme } from '@emotion/react';
import pixelsToRem from '#app/utilities/pixelsToRem';

export default {
  liteSiteLinkContainer: ({ mq }: Theme) =>
    css({
      marginBottom: `${pixelsToRem(20)}rem`,
      [mq.GROUP_3_MIN_WIDTH]: {
        marginBottom: `${pixelsToRem(28)}rem`,
      },
    }),
  liteSiteLink: ({ spacings, mq }: Theme) =>
    css({
      padding: `${pixelsToRem(13)}rem 0 ${pixelsToRem(13)}rem`,
      marginInlineStart: `${spacings.FULL}rem`,

      [mq.GROUP_2_MIN_WIDTH]: {
        marginInlineStart: `${spacings.DOUBLE}rem`,
      },
      [mq.GROUP_4_MIN_WIDTH]: {
        marginInlineStart: 0,
      },
    }),
  reducePadding: ({ spacings, mq }: Theme) =>
    css({
      paddingBottom: `${spacings.HALF}rem`,
      [mq.GROUP_3_MIN_WIDTH]: {
        paddingBottom: `${pixelsToRem(12)}rem`,
      },
    }),
  readTimeReducedPadding: ({ spacings, mq }: Theme) =>
    css({
      paddingBottom: `${spacings.TRIPLE}rem`,
      [mq.GROUP_3_MIN_WIDTH]: {
        paddingBottom: `${pixelsToRem(12)}rem`,
      },
    }),
};
