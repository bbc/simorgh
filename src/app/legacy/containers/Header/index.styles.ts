import { css, Theme } from '@emotion/react';

const SVG_WRAPPER_MAX_WIDTH_ABOVE_1280PX = '63rem';
const LOGO_ASPECT_RATIO = 168 / 48;
const SVG_HEIGHT = 38;

export default {
  banner: ({ palette, mq, spacings }: Theme) =>
    css({
      background: palette.WHITE,
      width: '100%',
      maxWidth: SVG_WRAPPER_MAX_WIDTH_ABOVE_1280PX,
      margin: '0 auto',
      padding: `0 ${spacings.DOUBLE}rem`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '4rem',

      [mq.GROUP_3_MIN_WIDTH]: {
        justifyContent: 'flex-start',
      },

      [mq.GROUP_4_MIN_WIDTH]: {
        padding: 0,
      },
    }),

  logoSvg: ({ palette }: Theme) =>
    css({
      boxSizing: 'content-box',
      color: palette.BLACK,
      fill: 'currentColor',
      height: `${SVG_HEIGHT}px`,
      maxWidth: `${LOGO_ASPECT_RATIO * SVG_HEIGHT}px`,
    }),
};
