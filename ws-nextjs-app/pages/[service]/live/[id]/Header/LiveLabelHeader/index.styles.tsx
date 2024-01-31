import { css, Theme } from '@emotion/react';
import { HALF, TRIPLE } from '#app/components/ThemeProvider/spacings';
import pixelsToRem from '#app/utilities/pixelsToRem';

const PULSE_END_MARGIN = HALF;
const PULSE_SIZE = TRIPLE;
const PULSE_SIZE_TOTAL_WIDTH = PULSE_END_MARGIN + PULSE_SIZE;

const styles = {
  liveLabelPulse: ({ mq, palette }: Theme) =>
    css({
      width: `${PULSE_SIZE}rem`,
      height: `${PULSE_SIZE}rem`,
      color: palette.LIVE_LIGHT,
      verticalAlign: `${pixelsToRem(-3)}rem`,
      marginInlineEnd: `${PULSE_END_MARGIN}rem`,
      [mq.GROUP_3_MIN_WIDTH]: {
        verticalAlign: 0,
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
          width: `calc(100% / 3  - ${PULSE_SIZE_TOTAL_WIDTH}rem)`,
        },
        [mq.GROUP_5_MIN_WIDTH]: {
          width: `calc(25%  - ${PULSE_SIZE_TOTAL_WIDTH}rem)`,
        },
      },
    }),
};

export default styles;
