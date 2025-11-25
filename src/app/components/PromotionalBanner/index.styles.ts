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
      width: '100%',
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
        maxWidth: `${pixelsToRem(1008)}rem`,
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
      gap: `${pixelsToRem(8)}rem`,
      marginTop: `${spacings.DOUBLE}rem`,
      [mq.GROUP_1_MAX_WIDTH]: {
        marginTop: `${spacings.TRIPLE}rem`,
        flexDirection: 'row',
        width: `${pixelsToRem(172)}rem`,
        height: `${spacings.FULL}rem`,
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
        backgroundColor: palette.WHITE,
        color: palette.BLACK,
        textDecoration: 'underline',
        textUnderlineOffset: `${pixelsToRem(5)}rem`,
      },
    }),

  dividerText: ({ palette }: Theme) =>
    css({
      color: palette.WHITE,
    }),

  secondaryButton: ({ mq, spacings, palette }: Theme) =>
    css({
      color: palette.WHITE,
      backgroundColor: 'transparent',
      border: 'none',
      textDecoration: 'underline',
      height: `${pixelsToRem(44)}rem`,
      padding: `${spacings.HALF}rem`,
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      [mq.GROUP_1_MAX_WIDTH]: {
        padding: 0,
      },
      '&:focus, &:hover': {
        backgroundColor: palette.WHITE,
        color: palette.BLACK,
      },
    }),

  closeButton: ({ mq, palette }: Theme) =>
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
      [mq.FORCED_COLOURS]: { fill: 'linkText' },
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
