import { Theme, css } from '@emotion/react';
import pixelsToRem from '#app/utilities/pixelsToRem';

export default {
  callToActionLink: ({ mq }) =>
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
  }),

  backdrop: css({
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(20, 20, 20, 0.9)',
    backdropFilter: 'blur(0.2rem)',
  }),

  modalContent: css({
    position: 'relative',
    zIndex: 1,
    width: `${pixelsToRem(995)}rem`,
    maxWidth: '100%',
    margin: '0 1rem',
  }),
};
