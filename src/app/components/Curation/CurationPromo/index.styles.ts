import { css, Theme } from '@emotion/react';

export default {
  promo: ({ isLite }: Theme) =>
    css({
      ...(isLite && {
        '.promo-image': {
          display: 'none',
        },
      }),
    }),
  icon: ({ isLite, spacings, mq }: Theme) =>
    css({
      ...(isLite && {
        [mq.GROUP_2_MAX_WIDTH]: {
          marginTop: `${spacings.FULL}rem`,
        },
      }),
    }),
  image: () =>
    css({
      position: 'relative',
    }),
  billboardPromoText: ({ palette }: Theme) =>
    css({
      color: `${palette.WHITE}`,
      '&:visited': {
        color: `${palette.GREY_5}`,
      },
    }),
  body: ({ spacings, palette, fontSizes }: Theme) =>
    css({
      marginTop: 0,
      marginBottom: `${spacings.DOUBLE}rem`,
      color: `${palette.WHITE}`,
      '&:visited': {
        color: `${palette.GREY_5}`,
      },
      ...fontSizes.longPrimer,
    }),
};
