import pixelsToRem from '#app/utilities/pixelsToRem';
import { Theme, css } from '@emotion/react';

export default {
  link: ({ palette, fontSizes, mq }: Theme) =>
    css({
      ...fontSizes.minion,
      color: palette.WHITE,
      display: 'inline-block',
      padding: `${pixelsToRem(6)}rem 0`,
      '&:focus, &:hover': {
        color: palette.ERROR_CORE,
        backgroundColor: palette.WHITE,
        backgroundClip: 'content-box',
        [mq.FORCED_COLOURS]: {
          // check
          textDecoration: 'none',
        },
      },
      '&:focus-visible': {
        backgroundClip: 'padding-box',
      },
    }),

  list: ({ spacings }: Theme) =>
    css({
      marginBottom: 0,
      paddingInlineStart: 0, // reset
      marginTop: `${spacings.HALF}rem`,
    }),

  singleItem: ({ spacings }: Theme) =>
    css({
      display: 'inline-block',
      marginTop: `${spacings.HALF}rem`,
    }),

  listItem: () =>
    css({
      marginBottom: 0, // reset
    }),
};
