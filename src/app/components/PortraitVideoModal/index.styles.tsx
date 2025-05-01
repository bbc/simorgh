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
  }),
};

export default styles;
