import { css, Theme } from '@emotion/react';

export default {
  link: ({ fontSizes, fontVariants, isDarkUi, palette }: Theme) =>
    css({
      ...fontSizes.pica,
      ...fontVariants.serifBold,
      display: 'inline-block',
      width: '100%',
      textDecoration: 'none',
      overflowX: 'hidden',
      overflowY: 'hidden',
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
      padding: `${spacings.FULL}rem`,
      marginBottom: 0,
      height: 'auto',
      display: 'block',
      [mq.GROUP_0_MAX_WIDTH]: {
        width: `11.5rem`,
      },
      [mq.GROUP_1_MIN_WIDTH]: {
        width: `17rem`,
      },
      [mq.GROUP_3_MIN_WIDTH]: {
        width: `15.5rem`,
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
};
