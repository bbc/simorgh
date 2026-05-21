import { css, Theme } from '@emotion/react';
import pixelsToRem from '../../utilities/pixelsToRem';

export default {
  bodyOverflowHidden: css({
    body: {
      overflow: 'hidden',
    },
  }),
  modal: ({ palette, spacings }: Theme) =>
    css({
      position: 'fixed',
      inset: 0,
      zIndex: 2147483646,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflowY: 'auto',
      paddingBlockStart: `${pixelsToRem(76)}rem`,
      paddingBlockEnd: `${spacings.FULL}rem`,
      paddingInline: `${spacings.FULL}rem`,
      backgroundColor: 'rgba(0, 0, 0, 0.92)',
      color: palette.WHITE,
    }),
  modalContent: ({ mq }: Theme) =>
    css({
      position: 'relative',
      width: '100%',
      maxWidth: `${pixelsToRem(1008)}rem`,

      [mq.GROUP_4_MIN_WIDTH]: {
        width: '80vw',
      },
    }),
  closeButton: ({ mq, palette }: Theme) =>
    css({
      position: 'absolute',
      top: `-${pixelsToRem(60)}rem`,
      insetInlineEnd: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: `${pixelsToRem(2)}rem solid ${palette.WHITE}`,
      padding: 0,
      backgroundColor: palette.BLACK,
      color: palette.WHITE,
      cursor: 'pointer',
      zIndex: 1,

      '&:hover, &:focus-visible': {
        backgroundColor: palette.POSTBOX,
      },

      [mq.FORCED_COLOURS]: {
        borderColor: 'canvasText',
      },

      svg: {
        display: 'block',
        color: palette.WHITE,
        fill: 'currentColor',

        [mq.FORCED_COLOURS]: {
          fill: 'canvasText',
        },
      },
    }),
  mediaWrapper: () =>
    css({
      width: '100%',

      '.media-container': {
        margin: 0,
      },
    }),
  visuallyHiddenCloseButton: ({ palette, spacings }: Theme) =>
    css({
      position: 'absolute',
      top: `${spacings.DOUBLE}rem`,
      insetInlineStart: `${spacings.DOUBLE}rem`,
      zIndex: 1,
      padding: `${spacings.DOUBLE}rem`,
      border: `${pixelsToRem(2)}rem solid ${palette.WHITE}`,
      backgroundColor: palette.WHITE,
      color: palette.BLACK,

      '&:not(:focus):not(:active)': {
        clipPath: 'inset(100%)',
        clip: 'rect(1px, 1px, 1px, 1px)',
        height: `${pixelsToRem(1)}rem`,
        overflow: 'hidden',
        position: 'absolute',
        width: `${pixelsToRem(1)}rem`,
        margin: 0,
      },
    }),
};
