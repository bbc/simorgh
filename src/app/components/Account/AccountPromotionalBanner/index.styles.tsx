import { Theme, css } from '@emotion/react';
import pixelsToRem from '#app/utilities/pixelsToRem';
import { DISPLAY_ACCOUNT_PROMOTIONAL_BANNER_CSS_CLASS } from './utilities';

export default {
  bannerWrapper: () =>
    css({
      display: 'none',
      [`.${DISPLAY_ACCOUNT_PROMOTIONAL_BANNER_CSS_CLASS} &`]: {
        display: 'block',
      },
    }),
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

  signInLink: ({ palette, spacings, mq }: Theme) =>
    css({
      height: `${pixelsToRem(44)}rem`,
      padding: `${spacings.HALF}rem`,
      [mq.GROUP_1_MIN_WIDTH]: {
        paddingInline: `${spacings.FULL}rem`,
      },
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

  modalContent: css({
    position: 'relative',
    zIndex: 1,
    width: '90%',
    maxWidth: '34rem',
    borderRadius: '0.5rem',
    overflow: 'hidden',
    backgroundColor: '#1a1a1a',
  }),

  modalImageSide: ({ palette }: Theme) =>
    css({
      width: '100%',
      height: '20rem',
      overflow: 'hidden',
      flexShrink: 0,
      background: `linear-gradient(to bottom left, ${palette.POSTBOX} 0%, ${palette.BLACK} 50%, ${palette.POSTBOX} 100%)`,
      '& img': {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block',
      },
    }),

  image: css({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  }),
};
