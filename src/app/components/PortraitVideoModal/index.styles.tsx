import pixelsToRem from '#app/utilities/pixelsToRem';
import { css, Theme } from '@emotion/react';

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
};

export default styles;
