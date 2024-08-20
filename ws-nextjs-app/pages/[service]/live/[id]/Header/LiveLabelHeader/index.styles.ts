import { css, Theme } from '@emotion/react';
import { HALF, QUADRUPLE } from '#app/components/ThemeProvider/spacings';

const PULSE_END_MARGIN = HALF;
const PULSE_SIZE_3_4 = QUADRUPLE;
const PULSE_SIZE_TOTAL_WIDTH_3_MIN = PULSE_END_MARGIN + PULSE_SIZE_3_4;

const styles = {
  liveLabelPulse: ({ mq, palette, spacings }: Theme) =>
    css({
      width: `${spacings.HALF + spacings.DOUBLE}rem`,
      height: `${spacings.HALF + spacings.DOUBLE}rem`,
      color: palette.LIVE_LIGHT,
      verticalAlign: 'middle',
      marginInlineEnd: `${PULSE_END_MARGIN}rem`,
      [mq.GROUP_1_MIN_WIDTH]: {
        width: `${spacings.TRIPLE}rem`,
        height: `${spacings.TRIPLE}rem`,
      },
      [mq.GROUP_3_MIN_WIDTH]: {
        width: `${spacings.TRIPLE + spacings.HALF}rem`,
        height: `${spacings.TRIPLE + spacings.HALF}rem`,
      },
      [mq.FORCED_COLOURS]: {
        color: 'canvasText',
      },
    }),
  liveLabelTextWithImage: ({ palette, fontSizes, fontVariants, mq }: Theme) =>
    css({
      'span:first-of-type': {
        color: palette.LIVE_LIGHT,
        verticalAlign: 'middle',
        display: 'inline',
        [mq.GROUP_3_MIN_WIDTH]: {
          ...fontVariants.sansBold,
          ...fontSizes.paragon,
        },
      },
    }),
  liveLabelTextWithoutImage: ({
    mq,
    palette,
    fontSizes,
    fontVariants,
  }: Theme) =>
    css({
      'span:first-of-type': {
        display: 'inline-flex',
        color: palette.LIVE_LIGHT,
        verticalAlign: 'middle',
        'overflow-wrap': 'anywhere',
        marginInlineEnd: '0',
        [mq.GROUP_0_MAX_WIDTH]: {
          display: 'inline',
        },
        [mq.GROUP_3_MIN_WIDTH]: {
          ...fontVariants.sansBold,
          ...fontSizes.paragon,
        },
        [mq.GROUP_4_MIN_WIDTH]: {
          width: `calc(100% / 3  - ${PULSE_SIZE_TOTAL_WIDTH_3_MIN}rem)`,
          ...fontVariants.sansBold,
          ...fontSizes.paragon,
        },
        [mq.GROUP_5_MIN_WIDTH]: {
          width: `calc(25%  - ${PULSE_SIZE_TOTAL_WIDTH_3_MIN}rem)`,
        },
      },
    }),
};

export default styles;
