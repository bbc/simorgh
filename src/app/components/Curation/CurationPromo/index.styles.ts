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
  relatedTopicLink: ({ fontSizes, fontVariants, palette, spacings }: Theme) =>
    css({
      ...fontSizes.longPrimer,
      ...fontVariants.sansRegular,
      color: palette.GREY_10,
      display: 'inline-flex',
      alignItems: 'center',
      marginTop: 0,
      textDecoration: 'none',
      paddingBottom: `${spacings.FULL}rem`,
      '&:hover, &:focus': {
        textDecoration: 'underline',
      },
    }),
};
