import { css, Theme } from '@emotion/react';
import pixelsToRem from '../../../../../../src/app/utilities/pixelsToRem';

export default {
  grid: ({ mq, gridWidths, palette }: Theme) =>
    css({
      backgroundColor: palette.BLACK,
      maxWidth: `${pixelsToRem(gridWidths[1008])}rem`,
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: 'repeat(12, 1fr)',

      [mq.GROUP_4_MIN_WIDTH]: {
        padding: '0 1rem',
        columnGap: '1rem',
      },
    }),
  labelColumn: ({ mq, palette }: Theme) =>
    css({
      gridColumn: '1 / span 12',
      paddingBottom: '2rem',
      color: palette.WHITE,

      [mq.GROUP_4_MIN_WIDTH]: {
        gridColumn: '1 / span 4',
      },
    }),
  textColumn: ({ mq }: Theme) =>
    css({
      gridColumn: '1 / span 12',

      [mq.GROUP_4_MIN_WIDTH]: {
        gridColumn: '5 / span 8',
        marginTop: '2rem',
      },
    }),
  white: ({ palette }: Theme) =>
    css({
      color: palette.WHITE,
    }),
};
