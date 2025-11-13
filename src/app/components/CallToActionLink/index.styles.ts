import { css, Theme } from '@emotion/react';

export default {
  link: ({ palette, mq }: Theme) =>
    css({
      color: palette.GREY_10,
      textDecoration: 'none',
      '&:visited': {
        color: palette.METAL,
      },
      '&:focus, &:hover': {
        color: palette.POSTBOX,
        textDecoration: 'none',
      },
      [mq.FORCED_COLOURS]: {
        fill: 'linkText',
        '&:visited': {
          fill: 'visitedText',
        },
        '&:active': {
          fill: 'activeText',
        },
      },
    }),
  alignWithMargin: () =>
    css({
      display: 'inline-block',
    }),
};
