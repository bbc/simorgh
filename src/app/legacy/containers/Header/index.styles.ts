import { MAX_NAV_ITEM_HEIGHT } from '#app/components/Navigation/index.styles';
import pixelsToRem from '#app/utilities/pixelsToRem';
import { css, Theme } from '@emotion/react';

const SVG_WRAPPER_MAX_WIDTH_ABOVE_1280PX = '63rem';
const LOGO_ASPECT_RATIO = 168 / 48;
const SVG_HEIGHT = 32;

export default {
  banner: ({ palette, mq, spacings }: Theme) =>
    css({
      background: palette.WHITE,
      width: '100%',
      maxWidth: SVG_WRAPPER_MAX_WIDTH_ABOVE_1280PX,
      margin: '0 auto',
      padding: `${spacings.HALF}rem ${spacings.DOUBLE}rem 0`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '4rem',

      [mq.GROUP_3_MIN_WIDTH]: {
        justifyContent: 'flex-start',
      },

      [mq.GROUP_4_MIN_WIDTH]: {
        padding: `${spacings.HALF}rem 0 0`,
      },
    }),
  headerBrand: ({ mq, spacings }: Theme) =>
    css({
      'a[aria-labelledby^="BrandLink-"]': {
        [mq.GROUP_0_MAX_WIDTH]: {
          paddingTop: `${pixelsToRem(2)}rem`,
        },
      },

      '&[data-banner-type="styled-brand"]': {
        minHeight: 'auto',
        height: `${pixelsToRem(MAX_NAV_ITEM_HEIGHT)}rem`,

        [mq.GROUP_1_MIN_WIDTH]: {
          height: `${pixelsToRem(MAX_NAV_ITEM_HEIGHT)}rem`,
        },

        [mq.GROUP_2_MIN_WIDTH]: {
          height: `${pixelsToRem(MAX_NAV_ITEM_HEIGHT)}rem`,
          padding: `0 ${spacings.FULL}rem`,
        },
        [mq.GROUP_3_MIN_WIDTH]: {
          height: `${pixelsToRem(MAX_NAV_ITEM_HEIGHT)}rem`,
          padding: `0 ${spacings.DOUBLE}rem`,
        },
      },
    }),
  logoSvg: ({ mq, palette, spacings }: Theme) =>
    css({
      boxSizing: 'content-box',
      color: palette.BLACK,
      fill: 'currentColor',
      height: `${SVG_HEIGHT}px`,
      maxWidth: `${LOGO_ASPECT_RATIO * SVG_HEIGHT}px`,

      [mq.GROUP_4_MIN_WIDTH]: {
        padding: `0 ${spacings.DOUBLE}rem`,
      },
    }),
};
