import { Theme, css } from '@emotion/react';
import { GROUP_A_MAX_WIDTH } from '#app/components/ThemeProvider/fontMediaQueries';
import {
  GROUP_3_ONLY,
  GROUP_4_MIN_WIDTH,
} from '#app/components/ThemeProvider/mediaQueries';
import pixelsToRem from '#app/utilities/pixelsToRem';

export default {
  modal: css({
    position: 'fixed',
    inset: 0,
    zIndex: 2147483647,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),

  backdrop: css({
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(20, 20, 20, 0.9)',
    backdropFilter: 'blur(0.2rem)',
    zIndex: 0,
  }),

  modalContent: ({ palette }: Theme) =>
    css({
      position: 'relative',
      zIndex: 1,
      width: `${pixelsToRem(288)}rem`,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      background: `linear-gradient(to bottom left, ${palette.POSTBOX} 0%, ${palette.BLACK} 50%, ${palette.POSTBOX} 100%)`,
      [GROUP_A_MAX_WIDTH]: {
        width: `${pixelsToRem(222)}rem`,
      },
      [GROUP_3_ONLY]: {
        width: `${pixelsToRem(510)}rem`,
      },
      [GROUP_4_MIN_WIDTH]: {
        width: `${pixelsToRem(792)}rem`,
        minHeight: `${pixelsToRem(488)}rem`,
      },
    }),

  closeButton: ({ palette }: Theme) =>
    css({
      position: 'absolute',
      top: `${pixelsToRem(4)}rem`,
      insetInlineEnd: `${pixelsToRem(4)}rem`,
      background: 'none',
      border: 'none',
      color: palette.WHITE,
      fill: palette.WHITE,
      cursor: 'pointer',
      zIndex: 2,
      width: `${pixelsToRem(38)}rem`,
      height: `${pixelsToRem(38)}rem`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }),
};
