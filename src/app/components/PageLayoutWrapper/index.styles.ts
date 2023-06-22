import { css, Theme } from '@emotion/react';

export default {
  wrapper: ({ palette }: Theme) =>
    css({
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      backgroundColor: palette.GREY_1,
    }),
  content: css({
    flexGrow: 1,
  }),
};
