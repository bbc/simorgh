import pixelsToRem from '#app/utilities/pixelsToRem';
import { css, Theme } from '@emotion/react';

const styles = {
  banner: ({ palette }: Theme) =>
    css({
      margin: '0 auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: `linear-gradient(to bottom left, ${palette.POSTBOX} 0%, ${palette.BLACK} 50%, ${palette.POSTBOX} 100%)`,
      width: '100%',
    }),

  innerContainer: () =>
    css({
      width: '100%',
      position: 'relative',
      maxWidth: `${pixelsToRem(1008)}rem`,
    }),

  content: ({ spacings, mq }) =>
    css({
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      width: '100%',

      paddingTop: `${spacings.TRIPLE}rem`,
      paddingBottom: `${spacings.DOUBLE}rem`,
      paddingInlineStart: `${spacings.FULL}rem`,
      paddingInlineEnd: `${pixelsToRem(52)}rem`,

      [mq.GROUP_2_MIN_WIDTH]: {
        paddingInlineStart: `${spacings.DOUBLE}rem`,
      },
    }),

  textContainer: () =>
    css({
      display: 'flex',
      flexDirection: 'column',
    }),
  title: ({ palette }: Theme) =>
    css({
      color: palette.WHITE,
      margin: 0,
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
      gap: `${spacings.FULL}rem`,
      marginTop: `${spacings.DOUBLE}rem`,
      flexWrap: 'wrap',
      [mq.GROUP_1_MAX_WIDTH]: {
        flexDirection: 'row',
      },
    }),

  primaryButton: ({ mq, spacings, palette }: Theme) =>
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

      '& .short-text': {
        display: 'inline',
        [mq.GROUP_1_MIN_WIDTH]: {
          display: 'none',
        },
      },

      '& .long-text': {
        display: 'none',
        [mq.GROUP_1_MIN_WIDTH]: {
          display: 'inline',
        },
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
        backgroundColor: palette.WHITE,
        color: palette.BLACK,
      },
    }),

  closeButton: ({ palette }: Theme) =>
    css({
      position: 'absolute',
      top: 0,
      insetInlineEnd: 0,
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

  closeButtonIcon: ({ mq, palette }: Theme) =>
    css({
      position: 'absolute',
      color: palette.WHITE,
      fill: 'currentColor',
      width: `${pixelsToRem(14)}rem`,
      height: `${pixelsToRem(14)}rem`,
      [mq.FORCED_COLOURS]: {
        forcedColorAdjust: 'none',
        color: 'ButtonText',
        fill: 'ButtonText',
      },
    }),
};

export default styles;
