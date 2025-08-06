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
        marginInline: 0,
        zIndex: 1,
      },

      [mq.GROUP_3_MIN_WIDTH]: {
        '&.media-container': {
          maxHeight: '90%',
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

  navButtonColumn: () =>
    css({
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem',
      marginLeft: '16px',
    }),

  navButton:
    (disabled: boolean) =>
    ({ palette, spacings }: Theme) =>
      css({
        backgroundColor: disabled ? palette.BLACK : palette.WHITE,
        border: 'none',
        width: '100%',
        maxWidth: `${pixelsToRem(44)}rem`,
        aspectRatio: '1/1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: disabled ? 'not-allowed' : 'pointer',
        color: disabled ? palette.GREY_2 : palette.BLACK, // icon color
        borderRadius: '50%',
        transition: 'background 0.2s',
        outline: 'none',
        opacity: disabled ? 0.2 : 1,
        '& svg': {
          width: `${spacings.DOUBLE}rem`,
          height: `${spacings.DOUBLE}rem`,
          fill: 'currentcolor',
        },
      }),
};

export default styles;
