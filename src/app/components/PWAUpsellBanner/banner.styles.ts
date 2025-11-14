import pixelsToRem from '#app/utilities/pixelsToRem';
import { css, Theme } from '@emotion/react';

const styles = {
  ColoredContainer: ({ mq, spacings }: Theme) =>
    css({
      position: 'relative',
      margin: '0 auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background:
        'linear-gradient(to bottom left, #bb1919 0%, #000 50%, #bb1919 100%)',
      padding: `${spacings.DOUBLE}rem`,
      minHeight: `${pixelsToRem(170)}rem`,
      maxHeight: `${pixelsToRem(370)}rem`,
      height: 'auto',

      width: '100%',
      maxWidth: `${pixelsToRem(1008)}rem`,
      minWidth: `${pixelsToRem(288)}rem`,

      [mq.GROUP_0_MAX_WIDTH]: {
        minWidth: 'auto',
      },
      [mq.GROUP_1_MIN_WIDTH]: {
        minWidth: 'auto',
      },
    }),

  Wrap: () =>
    css({
      width: '100%',
      padding: 0,
    }),

  StyledContent: ({ spacings }: Theme) =>
    css({
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      width: '100%',
      gap: `${spacings.FULL}rem`,
    }),

  TextWrapper: ({ spacings }: Theme) => {
    css({
      display: 'flex',
      flexDirection: 'column',
      marginRight: `${spacings.SEXTUPLE}rem`,
    });
  },

  StyledTitle: ({ spacings, palette, fontVariants }: Theme) =>
    css({
      color: palette.WHITE,
      height: 'auto',
      margin: 0,
      marginRight: `${spacings.QUADRUPLE}rem`,
      fontFamily: fontVariants.sansBold.fontFamily,
      fontWeight: fontVariants.sansBold.fontWeight,
      fontSize: `${pixelsToRem(28)}rem`,
      lineHeight: `${pixelsToRem(32)}rem`,
    }),

  StyledDescription: ({ spacings, mq }: Theme) =>
    css({
      color: '#F6F6F6',
      marginBottom: 0,
      marginRight: `${spacings.TRIPLE}rem`,
      height: 'auto',
      fontFamily: 'ReithSans, Helvetica, Arial, sans-serif',
      display: 'none',
      [mq.GROUP_2_MIN_WIDTH]: {
        display: 'block',
      },
    }),

  CTAWrapper: ({ mq, spacings }: Theme) =>
    css({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      gap: `${pixelsToRem(12)}rem`,
      lineHeight: 1,
      marginBottom: 0,
      marginTop: `${spacings.DOUBLE}rem`,
      [mq.GROUP_1_MAX_WIDTH]: {
        flexDirection: 'row',
        width: `${pixelsToRem(172)}rem`,
        height: `${spacings.FULL}rem`,
      },
    }),

  StyledButtonPrimary: ({ mq, spacings }: Theme) =>
    css({
      color: '#000000',
      backgroundColor: '#FFFFFF',
      border: 'none',
      width: 'auto',
      height: `${pixelsToRem(28)}rem`,
      padding: `${spacings.HALF}rem`,
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      fontFamily: 'ReithSans, Helvetica, Arial, sans-serif',
      fontSize: `${pixelsToRem(15)}rem`,
      lineHeight: `${pixelsToRem(20)}rem`,
      fontWeight: 'bold',
      position: 'relative',

      '& .short-text': {
        display: 'inline',
        [mq.GROUP_2_MIN_WIDTH]: {
          display: 'none',
        },
      },

      '& .long-text': {
        display: 'none',
        [mq.GROUP_2_MIN_WIDTH]: {
          display: 'inline',
        },
      },
    }),

  StyledText: () =>
    css({
      color: '#F6F6F6',
      fontSize: `${pixelsToRem(15)}rem`,
      height: `${pixelsToRem(28)}rem`,
      lineHeight: `${pixelsToRem(28)}rem`,
      fontWeight: 700,
      margin: 0,
      alignText: 'center',
      fontFamily: 'ReithSans, Helvetica, Arial, sans-serif',
    }),

  StyledbuttonSecondary: ({ mq, spacings }: Theme) =>
    css({
      color: '#FFFFFF',
      backgroundColor: 'transparent',
      border: 'none',
      textDecoration: 'underline',
      textDecorationColor: '#B0B2B4',
      fontWeight: 'bold',
      height: `${pixelsToRem(28)}rem`,
      padding: `${spacings.HALF}rem`,
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      fontFamily: 'ReithSans, Helvetica, Arial, sans-serif',
      [mq.GROUP_1_MAX_WIDTH]: {
        padding: 0,
      },
    }),

  subNavCloseButton: ({ palette }: Theme) =>
    css({
      position: 'absolute',
      top: `${pixelsToRem(-16)}rem`,
      right: `${pixelsToRem(-10)}rem`,
      border: 'none',
      background: 'transparent',
      padding: 0,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: `${pixelsToRem(44)}rem`,
      height: `${pixelsToRem(44)}rem`,
      color: palette.WHITE,
      '&:hover, &:focus': {
        outline: `${pixelsToRem(1)}rem solid ${palette.WHITE}`,
        outlineOffset: `${pixelsToRem(1)}rem`,
        backgroundColor: palette.POSTBOX,
        fill: palette.WHITE,
        color: palette.WHITE,
      },
    }),

  subNavCloseButtonIcon: ({ palette }: Theme) =>
    css({
      position: 'absolute',
      top: `${pixelsToRem(-2)}rem`,
      right: `${pixelsToRem(3)}rem`,
      color: palette.WHITE,
      fill: 'currentColor',
      width: `${pixelsToRem(18)}rem`,
      height: `${pixelsToRem(18)}rem`,
      pointerEvents: 'none',
    }),
};

export default styles;
