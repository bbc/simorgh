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

      // Gradient only in vertical layout
      [mq.GROUP_2_MIN_WIDTH]: {
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

  content: ({ mq, spacings }: Theme) =>
    css({
      display: 'flex',
      flexDirection: 'column',
      flex: '0 0 66.66%',
      paddingInlineStart: `${spacings.FULL}rem`,
      paddingBottom: `${spacings.DOUBLE}rem`,
      height: '100%',
      textAlign: 'start',
      zIndex: 2,

      [mq.GROUP_2_MIN_WIDTH]: {
        flex: '1',
        paddingInline: `${spacings.FULL}rem`,
        marginTop: `-${spacings.TRIPLE}rem`,
      },
    }),

  heading: ({ spacings }: Theme) =>
    css({
      marginBottom: `${spacings.HALF + spacings.FULL}rem`,
    }),

  headingLink: ({ palette }: Theme) =>
    css({
      color: palette.GREY_2,

      '&:hover, &:focus': {
        textDecorationThickness: '2px',
      },

      '&:visited, &:visited:hover': {
        color: palette.GREY_4,
      },
    }),

  divider: ({ spacings }: Theme) =>
    css({
      marginTop: 'auto',
      marginBottom: `${spacings.HALF + spacings.FULL}rem`,
      height: `${pixelsToRem(3)}rem`,
      width: `${pixelsToRem(40)}rem`,
      background: '#EB0000',
    }),

  subject: ({ palette, fontSizes, fontVariants, spacings }: Theme) =>
    css({
      ...fontSizes.brevier,
      ...fontVariants.sansBold,
      color: palette.GREY_2,
      position: 'relative',
      alignSelf: 'flex-start',

      '&:before': {
        content: '""',
        position: 'absolute',
        top: `-${spacings.FULL + spacings.HALF}rem`,
        bottom: `-${spacings.DOUBLE}rem`,
        left: `-${spacings.FULL}rem`,
        right: `-${spacings.FULL}rem`,
        minHeight: `${pixelsToRem(46)}rem`,
        minWidth: `${pixelsToRem(46)}rem`,
      },

      '&:hover, &:focus': {
        color: palette.GREY_2,
      },

      '&:visited, &:visited:hover': {
        color: palette.GREY_4,
      },
    }),
};
