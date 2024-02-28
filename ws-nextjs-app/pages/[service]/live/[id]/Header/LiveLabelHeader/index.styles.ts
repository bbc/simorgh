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
      marginInlineEnd: `${PULSE_END_MARGIN}rem`,
      [mq.GROUP_1_MIN_WIDTH]: {
        width: `${spacings.TRIPLE}rem`,
        height: `${spacings.TRIPLE}rem`,
      },
      [mq.GROUP_3_MIN_WIDTH]: {
        width: `${spacings.QUADRUPLE}rem`,
        height: `${spacings.QUADRUPLE}rem`,
      },
      [mq.HIGH_CONTRAST]: {
        color: 'canvasText',
      },
    }),
};

export default styles;
