import { css, Theme } from '@emotion/react';

const styles = {
  dialog: css({
    overflow: 'hidden',
    width: '100%',
    maxWidth: '100%',
    height: '100%',
    maxHeight: '100%',
    position: 'relative',
    backgroundColor: 'transparent',
    border: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

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

  mediaWrapper: ({ mq }: Theme) =>
    css({
      '&.media-container': {
        width: 'auto',
        height: '100%',
        maxWidth: '100%',
        maxHeight: '85%',
        margin: 0,
        marginInline: 0,
      },

      [mq.GROUP_5_MIN_WIDTH]: {
        '&.media-container': {
          maxHeight: '90%',
        },
      },
    }),
};

export default styles;
