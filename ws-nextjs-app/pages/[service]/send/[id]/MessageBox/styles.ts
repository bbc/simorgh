import pixelsToRem from '#app/utilities/pixelsToRem';
import { Theme, css } from '@emotion/react';

export default {
  link: ({ palette, fontSizes }: Theme) =>
    css({
      ...fontSizes.minion,
      color: palette.WHITE,
      display: 'inline-block',
      // To CHECK
      padding: `${pixelsToRem(6)}rem 0`,
      // borderBottom: `${pixelsToRem(1)}rem solid ${palette.WHITE}`,
      '&:visited': {},
      '&:focus, &:hover': {
        // TO CHECK
        textDecoration: 'none',
        // borderBottom: `${pixelsToRem(2)}rem solid ${palette.WHITE}`,
      },
    }),

  list: () =>
    css({
      marginBottom: 0,
    }),

  singleItem: () =>
    css({
      // check
      marginInlineStart: '2rem',
    }),
};
