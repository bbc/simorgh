import { css, Theme } from '@emotion/react';
import { HALF } from '#app/components/ThemeProvider/spacings';

const PULSE_END_MARGIN = HALF;

const styles = {
  liveLabelContainer: ({ mq, spacings }: Theme) =>
    css({
      textAlign: 'start',
      paddingTop: `${spacings.DOUBLE}rem`,
      [mq.GROUP_3_MIN_WIDTH]: {
        paddingTop: `${spacings.TRIPLE}rem`,
      },
    }),
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
  liveLabelText: ({ palette, fontSizes, fontVariants, mq }: Theme) =>
    css({
      'span:first-of-type': {
        color: palette.LIVE_LIGHT,
        verticalAlign: 'middle',
        position: 'relative',
        [mq.GROUP_3_MIN_WIDTH]: {
          ...fontVariants.sansBold,
          ...fontSizes.paragon,
        },
      },
    }),
  liveLabelTextWithImage: ({ mq, spacings }: Theme) =>
    css({
      'span:first-of-type': {
        display: 'inline',
      },
      'span:nth-of-type(3)': {
        [mq.GROUP_4_MIN_WIDTH]: {
          display: 'block',
          marginTop: `${spacings.DOUBLE}rem`,
        },
      },
    }),
  liveLabelTextWithoutImage: ({ mq, fontSizes, fontVariants }: Theme) =>
    css({
      'span:first-of-type': {
        display: 'inline-flex',
        overflowWrap: 'anywhere',
        marginInlineEnd: '0',
        [mq.GROUP_0_MAX_WIDTH]: {
          display: 'inline',
        },
        [mq.GROUP_4_MIN_WIDTH]: {
          display: 'inline-flex',
          ...fontVariants.sansBold,
          ...fontSizes.paragon,
        },
      },
      'span:nth-of-type(3)': {
        [mq.GROUP_4_MIN_WIDTH]: {
          display: 'block',
          marginTop: `${HALF * 2}rem`,
        },
      },
    }),
};

export default styles;
