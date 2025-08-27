import { css, Theme } from '@emotion/react';
import pixelsToRem from '#app/utilities/pixelsToRem';

export default {
  promo: ({ palette, mq, spacings }: Theme) =>
    css({
      maxWidth: '100%',
      background: palette.GREY_8,
      position: 'relative',
      height: '100%',

      // 0 - 399px: Horizontal layout
      display: 'flex',
      flexDirection: 'row',
      paddingTop: `${spacings.FULL}rem`,
      paddingBottom: `${spacings.DOUBLE}rem`,
      paddingInline: `${spacings.FULL}rem`,

      // 400px and above: vertical layout
      [mq.GROUP_2_MIN_WIDTH]: {
        flexDirection: 'column',
        paddingTop: 0,
        paddingInline: 0,
      },
    }),

  imageContainer: ({ mq, palette }: Theme) =>
    css({
      position: 'relative',
      flex: '0 0 33.333%',

      [mq.GROUP_1_MAX_WIDTH]: {
        flex: '0 0 33.333%',
      },

      // Gradient only in vertical layout
      [mq.GROUP_2_MIN_WIDTH]: {
        flex: 'none',
        width: '100%',

        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '50%',
          background: `linear-gradient(to top, ${palette.GREY_8} 0%, transparent 100%)`,
          pointerEvents: 'none',
        },
      },
    }),

  image: () =>
    css({
      width: '100%',
      height: 'auto',
      display: 'block',
    }),

  content: ({ mq, spacings }: Theme) =>
    css({
      display: 'flex',
      flexDirection: 'column',
      flex: '0 0 66.66%',
      justifyContent: 'center',
      paddingLeft: `${spacings.FULL}rem`,

      [mq.GROUP_2_MIN_WIDTH]: {
        flex: 'none',
        width: '100%',
        justifyContent: 'flex-start',
        paddingInline: `${spacings.FULL}rem`,
        marginTop: `-${spacings.TRIPLE + spacings.HALF}rem`,
        position: 'relative',
      },
    }),

  heading: ({ palette }: Theme) =>
    css({
      color: palette.GREY_2,
      textDecoration: 'none',
      outline: 'none',

      '&:hover': {
        textDecoration: 'underline',
        textDecorationThickness: '2px',
      },

      '&:visited': {
        color: palette.GREY_4,
      },

      '&:visited:hover': {
        color: palette.GREY_4,
      },
    }),

  divider: ({ spacings }: Theme) =>
    css({
      marginTop: `${spacings.HALF}rem`,
      marginBottom: `${spacings.HALF + spacings.FULL}rem`,
      height: `${pixelsToRem(3)}rem`,
      width: `${pixelsToRem(40)}rem`,
      background: '#EB0000',
    }),

  subject: ({ palette, fontSizes, fontVariants }: Theme) =>
    css({
      ...fontSizes.brevier,
      ...fontVariants.sansBold,
      color: palette.GREY_2,
      position: 'relative',

      '&:hover': {
        textDecoration: 'underline',
        color: palette.GREY_2,
      },

      '&:visited': {
        color: palette.GREY_4,
      },

      '&:visited:hover': {
        color: palette.GREY_4,
      },
    }),
};
