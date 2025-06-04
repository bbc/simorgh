import { css, Theme } from '@emotion/react';

const styles = {
  dialog: css({
    width: '100%',
    maxWidth: '100%',
    height: '100%',
    maxHeight: '100%',
    position: 'relative', // anchor the nav buttons
    backgroundColor: 'transparent',
    border: 'none',
    margin: 0,
    padding: 0,

    // Dialog backdrop styles
    '&::backdrop': {
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
    },
  }),

  closeButton: ({ palette }: Theme) =>
    css({
      display: 'flex',
      position: 'absolute',
      top: '1rem',
      right: '1rem',
      fontSize: '1.5rem',
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      zIndex: 2,

      svg: {
        fill: 'currentcolor',
        color: palette.WHITE,
      },
    }),

  // tightly wraps nav buttons to edge of video
  navButtonWrapper: css({
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 0.5rem',
    pointerEvents: 'none', // so only buttons can be clicked
    zIndex: 2,
  }),

  navWrapper: css({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem', // spacing between buttons and video
    width: '100%',
    height: '100%',
  }),

  navButton: ({ palette, spacings }: Theme) =>
    css({
      pointerEvents: 'auto',
      backgroundColor: palette.BLACK,
      border: 'none',
      width: `${spacings.FULL * 3}rem`,
      height: `${spacings.FULL * 3}rem`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      '&:disabled': {
        opacity: 0.3,
        cursor: 'not-allowed',
      },
      '& svg': {
        fill: palette.WHITE,
        width: '1.5rem',
        height: '1.5rem',
      },
    }),
};

export default styles;
