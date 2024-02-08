import { css, Theme } from '@emotion/react';
import { HALF, QUADRUPLE } from '#app/components/ThemeProvider/spacings';
import pixelsToRem from '#app/utilities/pixelsToRem';

const PULSE_END_MARGIN = HALF;
const PULSE_SIZE_3_4 = QUADRUPLE;
const PULSE_SIZE_TOTAL_WIDTH_3_MIN = PULSE_END_MARGIN + PULSE_SIZE_3_4;

const styles = {
  liveLabelPulse: ({ mq, palette, spacings }: Theme) =>
    css({
      width: `${spacings.HALF + spacings.DOUBLE}rem`,
      height: `${spacings.HALF + spacings.DOUBLE}rem`,
      color: palette.LIVE_LIGHT,
      verticalAlign: `${pixelsToRem(-5)}rem`,
      marginInlineEnd: `${PULSE_END_MARGIN}rem`,
      [mq.GROUP_1_MIN_WIDTH]: {
        verticalAlign: `${pixelsToRem(-7)}rem`,
        width: `${spacings.TRIPLE}rem`,
        height: `${spacings.TRIPLE}rem`,
      },
      [mq.GROUP_3_MIN_WIDTH]: {
        verticalAlign: `${pixelsToRem(-8)}rem`,
        width: `${spacings.QUADRUPLE}rem`,
        height: `${spacings.QUADRUPLE}rem`,
      },
      [mq.HIGH_CONTRAST]: {
        color: 'canvasText',
      },
    }),
  liveLabelTextWithImage: ({ palette }: Theme) =>
    css({
      'span:first-child': { color: palette.LIVE_LIGHT },
    }),
  liveLabelTextWithoutImage: ({ mq, palette }: Theme) =>
    css({
      'span:first-child': {
        display: 'inline-flex',
        color: palette.LIVE_LIGHT,
        'overflow-wrap': 'anywhere',
        marginInlineEnd: '0',
        [mq.GROUP_4_MIN_WIDTH]: {
          width: `calc(100% / 3  - ${PULSE_SIZE_TOTAL_WIDTH_3_MIN}rem)`,
        },
        [mq.GROUP_5_MIN_WIDTH]: {
          width: `calc(25%  - ${PULSE_SIZE_TOTAL_WIDTH_3_MIN}rem)`,
        },
      },
    }),
};

export default styles;
