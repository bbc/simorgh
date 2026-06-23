import { css, Theme } from '@emotion/react';

export default {
  articleMessageBannerWrapper: ({ spacings }: Theme) =>
    css({
      maxWidth: `63rem`,
      margin: `0 auto`,
      paddingTop: `${spacings.TRIPLE}rem`,
      paddingBottom: `${spacings.TRIPLE}rem`,
    }),
  mainText: ({ palette, spacings }: Theme) =>
    css({
      display: 'block',
      paddingTop: `${spacings.TRIPLE}rem`,
      paddingBottom: `${spacings.FULL}rem`,
      color: palette.WHITE,
    }),
};
