import pixelsToRem from '#app/utilities/pixelsToRem';
import { css, Theme } from '@emotion/react';

const WIDTH = 250;
const BUTTON_COLLAPSE_WIDTH = pixelsToRem(300);

const styles = {
  container: ({ palette, spacings, mq }: Theme) =>
    css({
      position: 'absolute',
      color: palette.WHITE,
      padding: `${spacings.FULL}rem`,
      display: 'flex',
      flexWrap: 'nowrap',
      background: `rgba(25, 163, 55, 0.6)`,
      height: '100%',
      width: '100%',
      [mq.GROUP_2_MIN_WIDTH]: {
        left: `calc(100% - ${pixelsToRem(WIDTH)}rem)`,
        width: `${pixelsToRem(WIDTH)}rem`,
        height: 'unset',
      },
    }),
  icon: ({ spacings, mq, palette }: Theme) =>
    css({
      margin: `0 ${spacings.FULL}rem 0 0`,
      fill: palette.WHITE,
      width: '100px',
      height: '35px',
      [mq.FORCED_COLOURS]: {
        path: {
          fill: 'currentColor',
        },
      },
      [`@media (max-width: ${BUTTON_COLLAPSE_WIDTH}rem)`]: {
        width: 0,
      },
    }),
  message: ({ palette }: Theme) =>
    css({
      margin: '0',
      color: palette.WHITE,
    }),
  loadVideo: ({ spacings }: Theme) =>
    css({
      all: 'unset',
      margin: `${spacings.DOUBLE}rem 0 0 0`,
    }),
  guidance: () =>
    css({
      zIndex: '1',
    }),
};

export default styles;
