import pixelsToRem from '#app/utilities/pixelsToRem';
import { css, Theme } from '@emotion/react';

const styles = {
  banner: ({ mq, spacings, palette }: Theme) =>
    css({
      position: 'relative',
      margin: '0 auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: `linear-gradient(to bottom left, ${palette.POSTBOX} 0%, ${palette.BLACK} 50%, ${palette.POSTBOX} 100%)`,
      padding: `${spacings.DOUBLE}rem`,
      minHeight: `${pixelsToRem(170)}rem`,
      maxHeight: `${pixelsToRem(370)}rem`,
      height: 'auto',

      width: '100%',
      minWidth: `${pixelsToRem(288)}rem`,

      [mq.GROUP_0_MAX_WIDTH]: {
        minWidth: 'auto',
      },
      [mq.GROUP_1_MIN_WIDTH]: {
        minWidth: 'auto',
      },
    }),

  innerContainer: ({ mq }) =>
    css({
      width: '100%',
      padding: 0,
      [mq.GROUP_4_MIN_WIDTH]: {
        maxWidth: `${pixelsToRem(900)}rem`,
      },
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

  description: ({ spacings, mq, palette, fontVariants }: Theme) =>
    css({
      color: palette.GREY_2,
      marginBottom: 0,
      marginTop: `${spacings.FULL}rem`,
      marginRight: `${spacings.TRIPLE}rem`,
      height: 'auto',
      fontFamily: fontVariants.sansRegular.fontFamily,
      fontWeight: fontVariants.sansRegular.fontWeight,
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

  primaryButton: ({ mq, spacings, palette, fontVariants }: Theme) =>
    css({
      color: palette.BLACK,
      backgroundColor: palette.WHITE,
      border: 'none',
      width: 'auto',
      height: `${pixelsToRem(44)}rem`,
      padding: `${spacings.FULL}rem`,
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      fontFamily: fontVariants.sansBold.fontFamily,
      fontWeight: fontVariants.sansBold.fontWeight,
      fontSize: `${pixelsToRem(15)}rem`,
      lineHeight: `${pixelsToRem(20)}rem`,
      position: 'relative',
      '&:focus, &:hover': {
        backgroundColor: palette.WHITE,
        color: palette.BLACK,
        textDecoration: 'underline',
        textDecorationColor: palette.BLACK,
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

  dividerText: ({ palette, fontVariants }: Theme) =>
    css({
      color: palette.GREY_2,
      fontSize: `${pixelsToRem(15)}rem`,
      height: `${pixelsToRem(28)}rem`,
      lineHeight: `${pixelsToRem(28)}rem`,
      fontWeight: fontVariants.sansBold.fontWeight,
      margin: 0,
      alignText: 'center',
      fontFamily: fontVariants.sansBold.fontFamily,
    }),

  secondaryButton: ({ mq, spacings, palette, fontVariants }: Theme) =>
    css({
      color: palette.WHITE,
      backgroundColor: 'transparent',
      border: 'none',
      textDecoration: 'underline',
      textUnderlineOffset: `${pixelsToRem(5)}rem`,
      textDecorationColor: palette.GREY_4,
      fontWeight: fontVariants.sansBold.fontWeight,
      height: `${pixelsToRem(44)}rem`,
      padding: `${spacings.HALF}rem`,
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      fontFamily: fontVariants.sansBold.fontFamily,
      [mq.GROUP_1_MAX_WIDTH]: {
        padding: 0,
      },
      '&:focus, &:hover': {
        backgroundColor: palette.WHITE,
        color: palette.BLACK,
        textDecoration: 'underline',
        textDecorationColor: palette.BLACK,
        textDecorationThickness: `${pixelsToRem(2)}rem`,
      },
    }),

  closeButton: ({ palette }: Theme) =>
    css({
      position: 'absolute',
      top: `${pixelsToRem(-16)}rem`,
      right: `${pixelsToRem(-16)}rem`,
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
        outlineOffset: `${pixelsToRem(2)}rem`,
        backgroundColor: palette.POSTBOX,
        fill: palette.WHITE,
        color: palette.WHITE,
      },
    }),

  closeButtonIcon: ({ palette }: Theme) =>
    css({
      position: 'absolute',
      top: `${pixelsToRem(-3)}rem`,
      right: `${pixelsToRem(-3)}rem`,
      color: palette.WHITE,
      fill: 'currentColor',
      width: `${pixelsToRem(18)}rem`,
      height: `${pixelsToRem(18)}rem`,
      pointerEvents: 'none',
    }),
};

export default styles;
