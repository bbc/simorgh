import { css, Theme } from '@emotion/react';

export default {
  wrapper: () =>
    css({
      border: '0.1875rem solid transparent',
      height: '100%',
      width: '100%',
    }),
  promoFullWidth: () =>
    css({
      width: '100%',
    }),
  promoTitle: ({ spacings }: Theme) =>
    css({
      paddingBottom: `${spacings.FULL}rem`,
    }),
  promoTimestamp: ({ palette }: Theme) =>
    css({
      color: palette.GREY_6,
    }),
};
