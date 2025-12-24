import { css, Theme } from '@emotion/react';

export default {
  link: ({ fontSizes, fontVariants, isDarkUi, palette }: Theme) =>
    css({
      ...fontSizes.pica,
      ...fontVariants.serifBold,
      display: 'webkit-box',
      width: '100%',
      textDecoration: 'none',
      overflowX: 'hidden',
      overflowY: 'hidden',
      WebkitLineClamp: 4,
      WebkitBoxOrient: 'vertical',
      '&:hover, &:focus': {
        textDecoration: 'underline',
      },
      color: isDarkUi ? palette.GREY_10 : palette.GREY_8,
      '&:visited': {
        color: palette.GREY_6,
      },
    }),
  promoBox: ({ isDarkUi, mq, palette, spacings }: Theme) =>
    css({
      position: 'relative',
      backgroundColor: isDarkUi ? palette.GREY_3 : palette.WHITE,
      padding: `${spacings.DOUBLE}rem`,
      marginBottom: `${spacings.TRIPLE}rem`,
      height: 'auto',
      display: 'block',
      [mq.GROUP_0_MAX_WIDTH]: {
        width: `14.8125rem`,
      },
      [mq.GROUP_3_MIN_WIDTH]: {
        width: `11.125rem`,
      },
      [mq.GROUP_4_MIN_WIDTH]: {
        width: `12.6875rem`,
      },
    }),
  operaPromoBox: ({ isDarkUi, mq, palette, spacings }: Theme) =>
    css({
      position: 'relative',
      backgroundColor: isDarkUi ? palette.GREY_3 : palette.WHITE,
      padding: `${spacings.DOUBLE}rem`,
      marginBottom: `${spacings.DOUBLE}rem`,
      width: `calc(100% - ${spacings.FULL}rem)`,
      [mq.GROUP_2_MIN_WIDTH]: {
        width: `calc(50% - ${spacings.DOUBLE}rem)`,
      },
    }),
  timestamp: ({ isDarkUi, palette, spacings }: Theme) =>
    css({
      marginTop: `${spacings.FULL}rem`,
      color: isDarkUi ? palette.GREY_6 : undefined,
    }),
};
