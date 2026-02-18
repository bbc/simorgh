import { css, Theme } from '@emotion/react';

const SVG_WRAPPER_MAX_WIDTH_ABOVE_1280PX = '63rem';
const LOGO_ASPECT_RATIO = 168 / 48;
const SVG_HEIGHT = 38;

export default {
  banner: ({ palette, mq }: Theme) =>
    css({
      background: palette.WHITE,
      width: '100%',
      maxWidth: SVG_WRAPPER_MAX_WIDTH_ABOVE_1280PX,
      margin: '0 auto',
      padding: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '4rem',

      [mq.GROUP_2_MIN_WIDTH]: {
        justifyContent: 'flex-start',
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
