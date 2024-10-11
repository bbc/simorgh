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
      background: `rgba(48, 128, 59, 0.9)`,
      height: '100%',
      width: '100%',
      zIndex: '1',
      [mq.GROUP_2_MIN_WIDTH]: {
        left: `calc(100% - ${pixelsToRem(WIDTH)}rem)`,
        width: `${pixelsToRem(WIDTH)}rem`,
        height: 'unset',
      },
    }),
  icon: ({ mq, palette }: Theme) =>
    css({
      fill: palette.WHITE,
      [mq.FORCED_COLOURS]: {
        path: {
          fill: 'currentColor',
        },
      },
    }),
  fanIcon: ({ spacings }: Theme) =>
    css({
      margin: `0 ${spacings.FULL}rem 0 0`,
    }),
  plusIcon: () =>
    css({
      margin: `0 0.2rem 0 0`,
    }),
  collapsable: () =>
    css({
      [`@media (max-width: ${BUTTON_COLLAPSE_WIDTH}rem)`]: {
        width: 0,
      },
    }),
  message: ({ palette }: Theme) =>
    css({
      margin: '0',
      color: palette.WHITE,
    }),
  underline: ({ palette }: Theme) =>
    css({
      borderBottom: `${pixelsToRem(1)}rem solid ${palette.WHITE}`,
    }),
  loadVideo: ({ spacings }: Theme) =>
    css({
      all: 'unset',
      margin: `${spacings.DOUBLE}rem 0 ${spacings.HALF}rem 0`,
    }),
};

export default styles;
