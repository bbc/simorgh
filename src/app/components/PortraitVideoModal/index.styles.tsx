import { css, Theme } from '@emotion/react';

const styles = {
  dialog: css({
    width: '100%',
    maxWidth: '100%',
    height: '100%',
    maxHeight: '100%',
    position: 'relative',
    backgroundColor: 'transparent',
    border: 'none',
    margin: 0,
    padding: 0,

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

  navWrapper: css({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    '.media-container': {
      maxWidth: '25%',
    },
  }),
};

export default styles;
