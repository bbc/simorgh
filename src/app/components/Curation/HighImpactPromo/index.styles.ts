import { css, Theme } from '@emotion/react';

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

  imageContainer: ({ mq }: Theme) =>
    css({
      position: 'relative',
      flex: '0 0 33.33%',

      [mq.GROUP_2_MIN_WIDTH]: {
        flex: 'none',
        width: '100%',
      },
    }),

  image: () =>
    css({
      width: '100%',
      height: 'auto',
      display: 'block',
    }),

  gradient: ({ palette, mq }: Theme) =>
    css({
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '50%',
      background: `linear-gradient(to top, ${palette.GREY_8} 0%, transparent 100%)`,
      pointerEvents: 'none',

      // Only show gradient in vertical layout
      display: 'none',

      [mq.GROUP_2_MIN_WIDTH]: {
        display: 'block',
      },
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
        color: palette.GREY_2,
      },

      '&:visited': {
        color: palette.GREY_2,
      },

      '&:visited:hover': {
        color: palette.GREY_5,
        textDecoration: 'underline',
        textDecorationThickness: '2px',
      },

      '&:focus': {
        outline: '3px solid white',
        outlineOffset: '0px',
        boxShadow: '0 0 0 6px black',
        color: palette.GREY_2,
        textDecoration: 'none',
      },

      '&:focus:visited': {
        color: palette.GREY_5,
      },
    }),
};
