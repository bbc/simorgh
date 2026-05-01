import pixelsToRem from '#app/utilities/pixelsToRem';
import { css, Theme } from '@emotion/react';

const styles = {
  section: ({ spacings, mq }: Theme) =>
    css({
      padding: `0 ${spacings.DOUBLE}rem ${spacings.FULL}rem ${spacings.DOUBLE}rem`,

      [mq.GROUP_4_MIN_WIDTH]: {
        marginTop: `${spacings.TRIPLE}rem`,
        padding: 0,
      },
    }),

  heading: ({ palette, spacings, fontSizes, fontVariants }: Theme) =>
    css({
      ...fontVariants.sansBold,
      ...fontSizes.doublePica,
      color: palette.GREY_10,
      margin: 0,
      padding: `${spacings.DOUBLE}rem 0`,
    }),

  tabPanel: ({ spacings, mq }: Theme) =>
    css({
      paddingTop: `${spacings.DOUBLE}rem`,

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

          'div div:last-child': {
            div: {
              padding: `${spacings.FULL}rem`,
              position: 'absolute',
              bottom: 0,

              svg: {
                width: `${spacings.DOUBLE}rem`,
                height: `${spacings.DOUBLE}rem`,
              },

              [mq.GROUP_2_MIN_WIDTH]: {
                position: 'relative',
              },
            },
          },
        },

        '.promo-text': {
          width: '100%',
          display: 'block',
          paddingInlineStart: 0,
        },
      },

      [mq.GROUP_3_MIN_WIDTH]: {
        li: {
          width: `calc(25% - 0.75rem)`,

          '&:nth-of-type(2n):not(:last-of-type)': {
            marginInlineEnd: `${spacings.DOUBLE}rem`,
          },
        },
      },
    }),
  skeletonGrid: ({ spacings, mq }: Theme) =>
    css({
      display: 'grid',
      gap: `${spacings.DOUBLE}rem`,
      gridTemplateColumns: '1fr 1fr',

      [mq.GROUP_3_MIN_WIDTH]: {
        gridTemplateColumns: 'repeat(4, 1fr)',
      },
    }),
  skeletonCard: ({ spacings }: Theme) =>
    css({
      display: 'flex',
      flexDirection: 'column',
      gap: `${spacings.FULL}rem`,
    }),
  skeletonImage: ({ palette }: Theme) =>
    css({
      width: '100%',
      aspectRatio: '16 / 9',
      background: `linear-gradient(to right, ${palette.GREY_4} 0%, ${palette.GREY_3} 100%)`,
    }),
  skeletonTextLines: ({ spacings }: Theme) =>
    css({
      display: 'flex',
      flexDirection: 'column',
      gap: `${spacings.HALF}rem`,
    }),
  skeletonLine: ({ palette }: Theme) =>
    css({
      height: `${pixelsToRem(12)}rem`,
      background: `linear-gradient(to right, ${palette.GREY_4} 0%, ${palette.GREY_3} 100%)`,
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
