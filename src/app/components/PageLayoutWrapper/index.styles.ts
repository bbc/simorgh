import { css, Theme } from '@emotion/react';

export default {
  wrapper: ({ isDarkUi, palette }: Theme) =>
    css({
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      backgroundColor: isDarkUi ? palette.GREY_10 : palette.GHOST,
    }),
  content: css({
    flexGrow: 1,
    position: 'relative',
  }),
};
