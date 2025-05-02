import { css, Theme } from '@emotion/react';

const styles = {
  modalWrapper: (theme: Theme) =>
    css({
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 9999,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '1rem',
    }),

  modalInner: css({
    width: '100%',
    maxWidth: '480px',
    position: 'relative', // anchor the nav buttons
  }),

  closeButton: css({
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    fontSize: '1.5rem',
    color: 'white',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    zIndex: 2,
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
