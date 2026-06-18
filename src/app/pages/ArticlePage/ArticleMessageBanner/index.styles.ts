import { css, Theme } from '@emotion/react';

export default {
  articleMessageBannerWrapper: css({
    maxWidth: `63rem`,
    margin: `0 auto`,
    paddingTop: '2rem',
    paddingBottom: '2rem',
  }),
  mainText: ({ palette }: Theme) =>
    css({
      display: 'block',
      paddingTop: '1.5rem',
      paddingBottom: '0.5rem',
      color: palette.WHITE,
    }),
};
