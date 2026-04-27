import { css, Theme } from '@emotion/react';

const styles = {
  section: ({ spacings, mq }: Theme) =>
    css({
      padding: `0 ${spacings.DOUBLE}rem ${spacings.FULL}rem ${spacings.DOUBLE}rem`,

      [mq.GROUP_4_MIN_WIDTH]: {
        padding: 0,
      },
    }),

  heading: ({ palette, spacings, fontSizes, fontVariants }: Theme) =>
    css({
      ...fontVariants.sansBold,
      ...fontSizes.doublePica,
      color: palette.GREY_10,
      margin: 0,
      paddingBottom: `${spacings.DOUBLE}rem`,
    }),

  tabPanel: ({ spacings, mq }: Theme) =>
    css({
      paddingTop: `${spacings.DOUBLE}rem`,

      [mq.GROUP_2_MAX_WIDTH]: {
        li: {
          width: `calc(50% - ${spacings.FULL}rem)`,
          marginInlineEnd: `${spacings.DOUBLE}rem`,
          borderTop: 'none',
          paddingTop: 0,

          '&:nth-of-type(2n)': {
            marginInlineEnd: 0,
          },

          '.promo-image': {
            width: '100%',
            display: 'block',
          },

          '.promo-text': {
            width: '100%',
            display: 'block',
            paddingInlineStart: 0,
          },
        },
      },
    }),
  moreFromLink: ({ palette, spacings, fontSizes, fontVariants }: Theme) =>
    css({
      ...fontVariants.sansBold,
      ...fontSizes.longPrimer,
      color: palette.BLACK,
      display: 'inline-block',
      marginTop: `${spacings.DOUBLE}rem`,
      textDecoration: 'none',

      '&:hover': {
        textDecoration: 'underline',
      },
    }),
};

export default styles;
