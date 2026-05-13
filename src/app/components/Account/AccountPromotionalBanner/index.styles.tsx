import { Theme, css } from '@emotion/react';
import pixelsToRem from '#app/utilities/pixelsToRem';

export default {
  callToActionLink: ({ mq }: Theme) =>
    css({
      padding: '1rem',
      display: 'inline-flex',
      justifyContent: 'center',
      flexDirection: 'column',
      flex: '0 0 auto',
      alignItems: 'center',
      gap: '1rem',
      [mq.GROUP_2_MIN_WIDTH]: {
        flexDirection: 'row',
      },
    }),

  buttonSeparatorText: ({ palette, spacings }: Theme) =>
    css({
      color: palette.WHITE,
      padding: `${spacings.HALF}rem`,
    }),

  signInLink: ({ palette, spacings }: Theme) =>
    css({
      height: `${pixelsToRem(44)}rem`,
      padding: `${spacings.HALF}rem`,
      color: palette.WHITE,
      textDecorationThickness: `${pixelsToRem(1)}rem`,
      backgroundColor: palette.SERVICE_NEUTRAL_CORE,
      '&:hover, &:focus': {
        backgroundColor: palette.SERVICE_NEUTRAL_DARK,
        color: palette.WHITE,
        textDecorationThickness: `${pixelsToRem(2)}rem`,
      },
      '&:visited': {
        color: palette.WHITE,
      },
    }),

  accountIcon: ({ mq, spacings }: Theme) =>
    css({
      fill: 'currentColor',
      width: `${pixelsToRem(14)}rem`,
      height: `${pixelsToRem(14)}rem`,
      alignSelf: 'center',
      marginInlineEnd: `${spacings.HALF}rem`,
      [mq.FORCED_COLOURS]: {
        fill: 'ButtonText',
      },
    }),

  registerLink: ({ palette }: Theme) =>
    css({
      height: `${pixelsToRem(44)}rem`,
      color: palette.WHITE,
      textDecoration: 'underline',
      textDecorationThickness: `${pixelsToRem(1)}rem`,
      padding: 0,
      cursor: 'pointer',
      '&&:hover, &&:focus': {
        textDecorationThickness: `${pixelsToRem(2)}rem`,
        color: palette.NEUTRAL_LIGHT,
        textDecorationColor: palette.NEUTRAL_LIGHT,
      },
      '&:visited': {
        color: palette.WHITE,
      },
    }),

  modal: css({
    position: 'fixed',
    inset: 0,
    zIndex: 2147483647,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  }),

  backdrop: css({
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(20, 20, 20, 0.9)',
    backdropFilter: 'blur(0.2rem)',
  }),

  modalContent: ({ mq }: Theme) =>
    css({
      position: 'relative',
      zIndex: 1,
      width: '45%',
      height: '50vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',

      [mq.GROUP_4_MIN_WIDTH]: {
        width: '60%',
        height: '40%',
      },

      '& > aside': {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      },

      '& > aside > div': {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      },

      '& > aside > div > div': {
        justifyContent: 'center',
        alignItems: 'center',
      },

      '& > aside > div > div > div': {
        paddingTop: '1rem',
        paddingBottom: '1rem',
      },
    }),

  modalInner: css({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  }),

  modalBannerSide: css({
    flex: 1,
    display: 'flex',
    alignItems: 'stretch',
    paddingInlineStart: '2rem',
  }),

  modalImageSide: ({ mq }: Theme) =>
    css({
      width: '100%',
      height: '12rem',
      overflow: 'hidden',
      pointerEvents: 'none',
      flexShrink: 0,

      '& img': {
        width: '100%',
        height: '100%',
      },

      [mq.GROUP_4_MIN_WIDTH]: {
        position: 'absolute',
        insetInlineEnd: '5%',
        top: '-20%',
        width: '40%',
        height: '140%',
        zIndex: 2,
      },
    }),

  imageHorizontal: ({ mq }: Theme) =>
    css({
      display: 'block',
      width: '100%',
      height: '100%',
      objectFit: 'contain',

      [mq.GROUP_4_MIN_WIDTH]: {
        display: 'none',
      },
    }),

  imageVertical: ({ mq }: Theme) =>
    css({
      display: 'none',
      width: '100%',
      height: '100%',
      objectFit: 'contain',

      [mq.GROUP_4_MIN_WIDTH]: {
        display: 'block',
      },
    }),
};
