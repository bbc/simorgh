import { css, Theme } from '@emotion/react';

export default {
  wrapper: ({ palette }: Theme) =>
    css({
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      backgroundColor: palette.GHOST,
    }),
  sportWrapper: ({ palette, isDarkUi }: Theme) =>
    css({
      'header > div > div': {
        backgroundColor: isDarkUi ? palette.BLACK : palette.SPORT_YELLOW,

        svg: {
          fill: isDarkUi ? palette.SPORT_YELLOW : palette.BLACK,
        },
      },

      'header > nav': {
        ...(isDarkUi && { filter: 'invert(1)' }),
      },

      '#NavigationLinks-Wasanni': {
        '&::after': {
          borderBottomColor: isDarkUi ? palette.SPORT_YELLOW : palette.BLACK,
        },
      },

      'footer > div:first-child': {
        backgroundColor: isDarkUi ? palette.BLACK : palette.SPORT_YELLOW,

        svg: {
          fill: isDarkUi ? palette.SPORT_YELLOW : palette.BLACK,
        },
      },
    }),
  content: css({
    flexGrow: 1,
    position: 'relative',
  }),
};
