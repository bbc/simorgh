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
      padding: `${spacings.FULL}rem`,
      backgroundColor: 'rgba(0, 0, 0, 0.92)',
      color: palette.WHITE,
    }),
  closeButton: ({ mq, palette, spacings }: Theme) =>
    css({
      position: 'absolute',
      top: `${spacings.FULL}rem`,
      insetInlineEnd: `${spacings.FULL}rem`,
      minWidth: `${pixelsToRem(44)}rem`,
      minHeight: `${pixelsToRem(44)}rem`,
      border: `${pixelsToRem(2)}rem solid ${palette.WHITE}`,
      padding: `${spacings.HALF}rem`,
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
        width: `${pixelsToRem(24)}rem`,
        height: `${pixelsToRem(24)}rem`,
        fill: 'currentColor',

        [mq.FORCED_COLOURS]: {
          fill: 'canvasText',
        },
      },
    }),
  mediaWrapper: ({ mq }: Theme) =>
    css({
      width: '100%',
      maxWidth: `${pixelsToRem(1008)}rem`,

      [mq.GROUP_4_MIN_WIDTH]: {
        width: '80vw',
      },

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
