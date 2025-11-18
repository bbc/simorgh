import pixelsToRem from '#app/utilities/pixelsToRem';
import { css, Theme } from '@emotion/react';
import {
  BLACK,
  GREY_2,
  GREY_4,
  POSTBOX,
  WHITE,
} from '../ThemeProvider/palette';
import { REITH_SANS } from '../ThemeProvider/fontFamilies';

const styles = {
  banner: ({ mq, spacings }: Theme) =>
    css({
      position: 'relative',
      margin: '0 auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: `linear-gradient(to bottom left, ${POSTBOX} 0%, ${BLACK} 50%, ${POSTBOX} 100%)`,
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

  innerContainer: () =>
    css({
      width: '100%',
      padding: 0,
    }),

  content: ({ spacings }: Theme) =>
    css({
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      width: '100%',
      gap: `${spacings.FULL}rem`,
    }),

  textContainer: ({ spacings }: Theme) =>
    css({
      display: 'flex',
      flexDirection: 'column',
      marginRight: `${spacings.SEXTUPLE}rem`,
    }),
  title: ({ spacings, palette, fontVariants }: Theme) =>
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

  description: ({ spacings, mq }: Theme) =>
    css({
      color: GREY_2,
      marginBottom: 0,
      marginTop: `${spacings.FULL}rem`,
      marginRight: `${spacings.TRIPLE}rem`,
      height: 'auto',
      fontFamily: REITH_SANS,
      display: 'none',
      [mq.GROUP_2_MIN_WIDTH]: {
        display: 'block',
      },
    }),

  actionsContainer: ({ mq, spacings }: Theme) =>
    css({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      gap: `${pixelsToRem(12)}rem`,
      lineHeight: 1,
      marginBottom: 0,
      marginTop: `${spacings.DOUBLE}rem`,
      [mq.GROUP_1_MAX_WIDTH]: {
        marginTop: `${spacings.TRIPLE}rem`,
        flexDirection: 'row',
        width: `${pixelsToRem(172)}rem`,
        height: `${spacings.FULL}rem`,
      },
    }),

  primaryButton: ({ mq, spacings }: Theme) =>
    css({
      color: BLACK,
      backgroundColor: WHITE,
      border: 'none',
      width: 'auto',
      height: `${pixelsToRem(30)}rem`,
      padding: `${spacings.HALF}rem`,
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      fontFamily: REITH_SANS,
      fontSize: `${pixelsToRem(15)}rem`,
      lineHeight: `${pixelsToRem(20)}rem`,
      fontWeight: '700',
      position: 'relative',
      '&:focus, &:hover': {
        backgroundColor: WHITE,
        color: BLACK,
        textDecoration: 'underline',
        textDecorationColor: BLACK,
        textDecorationThickness: `${pixelsToRem(2)}rem`,
        textUnderlineOffset: `${pixelsToRem(5)}rem`,
      },

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

  dividerText: () =>
    css({
      color: GREY_2,
      fontSize: `${pixelsToRem(15)}rem`,
      height: `${pixelsToRem(28)}rem`,
      lineHeight: `${pixelsToRem(28)}rem`,
      fontWeight: 700,
      margin: 0,
      alignText: 'center',
      fontFamily: REITH_SANS,
    }),

  secondaryButton: ({ mq, spacings }: Theme) =>
    css({
      color: WHITE,
      backgroundColor: 'transparent',
      border: 'none',
      textDecoration: 'underline',
      textUnderlineOffset: `${pixelsToRem(5)}rem`,
      textDecorationColor: GREY_4,
      fontWeight: '700',
      height: `${pixelsToRem(30)}rem`,
      padding: `${spacings.HALF}rem`,
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      fontFamily: REITH_SANS,
      [mq.GROUP_1_MAX_WIDTH]: {
        padding: 0,
      },
      '&:focus, &:hover': {
        backgroundColor: WHITE,
        color: BLACK,
        textDecoration: 'underline',
        textDecorationColor: BLACK,
        textDecorationThickness: `${pixelsToRem(2)}rem`,
      },
    }),

  closeButton: ({ palette }: Theme) =>
    css({
      position: 'absolute',
      top: `${pixelsToRem(-12)}rem`,
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
        outlineOffset: `${pixelsToRem(2)}rem`,
        backgroundColor: palette.POSTBOX,
        fill: palette.WHITE,
        color: palette.WHITE,
      },
    }),

  closeButtonIcon: ({ palette }: Theme) =>
    css({
      position: 'absolute',
      top: `${pixelsToRem(1)}rem`,
      right: `${pixelsToRem(3)}rem`,
      color: palette.WHITE,
      fill: 'currentColor',
      width: `${pixelsToRem(18)}rem`,
      height: `${pixelsToRem(18)}rem`,
      pointerEvents: 'none',
    }),
};

export default styles;
