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
      padding: `${spacings.TRIPLE}rem`,
      width: '100%',
      [mq.GROUP_0_MAX_WIDTH]: {
        paddingLeft: `${spacings.FULL}rem`,
        paddingRight: `${spacings.FULL}rem`,
        paddingBottom: `${spacings.DOUBLE}rem`,
      },
    }),

  innerContainer: ({ mq }) =>
    css({
      width: '100%',
      padding: 0,
      [mq.GROUP_4_MIN_WIDTH]: {
        maxWidth: `${pixelsToRem(1008)}rem`,
      },
    }),

  content: () =>
    css({
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      width: '100%',
    }),

  textContainer: () =>
    css({
      display: 'flex',
      flexDirection: 'column',
    }),
  title: ({ spacings, palette }: Theme) =>
    css({
      color: palette.WHITE,
      margin: 0,
      marginRight: `${spacings.QUADRUPLE}rem`,
    }),

  description: ({ spacings, mq, palette }: Theme) =>
    css({
      color: palette.GREY_2,
      marginTop: `${spacings.FULL}rem`,
      [mq.GROUP_0_MAX_WIDTH]: {
        display: 'none',
      },
    }),

  actionsContainer: ({ mq, spacings }: Theme) =>
    css({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      gap: `${pixelsToRem(8)}rem`,
      marginTop: `${spacings.DOUBLE}rem`,
      [mq.GROUP_1_MAX_WIDTH]: {
        marginTop: `${spacings.TRIPLE}rem`,
        flexDirection: 'row',
      },
    }),

  primaryButton: ({ spacings, palette }: Theme) =>
    css({
      color: palette.BLACK,
      backgroundColor: palette.WHITE,
      border: 'none',
      height: `${pixelsToRem(44)}rem`,
      padding: `${spacings.FULL}rem`,
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      position: 'relative',
      '&:focus, &:hover': {
        color: palette.BLACK,
        textDecoration: 'underline',
      },
    }),

  dividerText: ({ palette }: Theme) =>
    css({
      color: palette.WHITE,
    }),

  secondaryButton: ({ spacings, palette }: Theme) =>
    css({
      color: palette.WHITE,
      backgroundColor: 'transparent',
      border: 'none',
      textDecoration: 'underline',
      height: `${pixelsToRem(44)}rem`,
      padding: `${spacings.HALF}rem`,
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      '&:focus, &:hover': {
        backgroundColor: palette.CONSENT_ACTION,
        color: palette.BLACK,
      },
    }),

  closeButton: ({ mq, palette }: Theme) =>
    css({
      position: 'absolute',
      top: `${pixelsToRem(-24)}rem`,
      right: `${pixelsToRem(-8)}rem`,
      border: 'none',
      background: 'transparent',
      padding: 0,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: `${pixelsToRem(38)}rem`,
      height: `${pixelsToRem(36)}rem`,
      color: palette.WHITE,
      '&:hover, &:focus': {
        outlineOffset: `${pixelsToRem(2)}rem`,
        backgroundColor: palette.POSTBOX,
        fill: palette.WHITE,
        color: palette.WHITE,
      },
      [mq.GROUP_1_MIN_WIDTH]: {
        right: `${pixelsToRem(-24)}rem`,
      },
      [mq.FORCED_COLOURS]: { fill: 'linkText' },
    }),

  closeButtonIcon: ({ mq, palette }: Theme) =>
    css({
      position: 'absolute',
      top: `${pixelsToRem(-12)}rem`,
      right: `${pixelsToRem(4)}rem`,
      color: palette.WHITE,
      fill: 'currentColor',
      width: `${pixelsToRem(14)}rem`,
      height: `${pixelsToRem(14)}rem`,
      [mq.GROUP_1_MIN_WIDTH]: {
        right: `${pixelsToRem(-12)}rem`,
      },
      pointerEvents: 'none',
    }),
};

export default styles;
