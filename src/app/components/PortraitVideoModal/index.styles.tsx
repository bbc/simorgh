import pixelsToRem from '#app/utilities/pixelsToRem';
import { css, Theme } from '@emotion/react';
import { visuallyHiddenStyle } from '#app/lib/styles.const';

const styles = {
  bodyOverflowHidden: () =>
    css({
      body: {
        overflow: 'hidden',
      },
    }),
  modal: () =>
    css({
      position: 'fixed',
      inset: 0,
      overflow: 'hidden',
      width: '100%',
      maxWidth: '100%',
      height: '100%',
      maxHeight: '100%',
      backgroundColor: 'transparent',
      border: 'none',
      margin: 0,
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2147483647,

      '&::after': {
        content: '""',
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgba(20, 20, 20, 0.9)',
        backdropFilter: 'blur(0.2rem)',
        zIndex: 0,
      },
    }),

  closeButton: ({ mq, spacings, palette }: Theme) =>
    css({
      display: 'none',
      position: 'absolute',
      top: `${spacings.DOUBLE}rem`,
      insetInlineEnd: `${spacings.DOUBLE}rem`,
      background: 'transparent',
      border: `${pixelsToRem(2)}rem solid ${palette.WHITE}`,
      cursor: 'pointer',
      padding: 0,
      zIndex: 1,

      '&:hover, &:focus-visible': {
        backgroundColor: palette.POSTBOX,
      },

      [mq.GROUP_3_MIN_WIDTH]: {
        display: 'flex',
      },

      [mq.FORCED_COLOURS]: {
        border: `${pixelsToRem(2)}rem solid canvasText`,
      },

      svg: {
        color: palette.WHITE,

        [mq.FORCED_COLOURS]: {
          fill: 'canvasText',
        },
      },
    }),

  mediaWrapper: ({ mq }: Theme) =>
    css({
      '&.media-container': {
        width: 'auto',
        height: '100%',
        maxWidth: '100%',
        maxHeight: '100%',
        margin: 0,
        zIndex: 1,
      },

      [mq.GROUP_3_MIN_WIDTH]: {
        '&.media-container': {
          maxHeight: '90%',
          marginLeft: '60px',
        },
      },
    }),

  visuallyHiddenCloseButton: () => (theme: Theme) =>
    css({
      position: 'absolute',
      top: `${theme.spacings.DOUBLE}rem`,
      insetInlineStart: `${theme.spacings.DOUBLE}rem`,
      backgroundColor: theme.palette.WHITE,
      color: theme.palette.BLACK,
      border: `${pixelsToRem(2)}rem solid ${theme.palette.WHITE}`,
      textDecoration: 'none',
      zIndex: 2,
      padding: `${theme.spacings.DOUBLE}rem`,
      ...theme.fontSizes.pica,
      ...theme.fontVariants.sansBold,

      '&:not(:focus):not(:active)': {
        visuallyHiddenStyle,
      },

      [theme.mq.GROUP_3_MIN_WIDTH]: {
        display: 'flex',
      },
    }),

  navButtonColumn:
    () =>
    ({ mq }: Theme) =>
      css({
        order: 2,
        paddingLeft: '16px',
        display: 'none',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        zIndex: 2,
        [mq.GROUP_3_MIN_WIDTH]: {
          display: 'flex',
        },
      }),

  navButton:
    (disabled: boolean) =>
    ({ palette, spacings }: Theme) =>
      css({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: `${pixelsToRem(44)}rem`,
        minHeight: `${pixelsToRem(44)}rem`,
        width: `${pixelsToRem(44)}rem`,
        height: `${pixelsToRem(44)}rem`,
        padding: 0,
        border: `${pixelsToRem(2)}rem solid transparent`,
        backgroundColor: disabled ? palette.BLACK : palette.WHITE,
        color: disabled ? palette.GREY_2 : palette.BLACK, // icon is black when enabled
        fontSize: '16px',
        cursor: disabled ? 'auto' : 'pointer',
        transition: 'background 0.2s, box-shadow 0.2s',
        opacity: disabled ? 0.2 : 1,
        outline: 'none',
        '& svg': {
          width: `${spacings.DOUBLE}rem`,
          height: `${spacings.DOUBLE}rem`,
          fill: 'currentcolor',
        },
        '&:hover, &:focus': {
          backgroundColor: disabled ? palette.BLACK : palette.WHITE,
          boxShadow: disabled ? 'none' : '0 0 0 2px #1e90ff66',
          outline: 'none',
        },
      }),
};

export default styles;
