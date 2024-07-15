import { Theme, css } from '@emotion/react';
import pixelsToRem from '../../../../../src/app/utilities/pixelsToRem';

export default {
  background: ({ mq }: Theme) =>
    css({
      display: 'none',

      [mq.GROUP_3_MIN_WIDTH]: {
        display: 'block',
        position: 'absolute',
        inset: 0,
        background:
          'linear-gradient(200deg, #A20219 0%, #180109 54%, #180109 90%)',
      },
    }),
  grid: ({ mq, gridWidths, spacings }: Theme) =>
    css({
      position: 'relative',

      [mq.GROUP_3_MIN_WIDTH]: {
        maxWidth: `${pixelsToRem(gridWidths[1008])}rem`,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        padding: `${spacings.DOUBLE}rem`,
      },
      [mq.GROUP_4_MIN_WIDTH]: {
        columnGap: `${spacings.FULL}rem`,
      },
    }),
  primaryColumn: ({ mq, spacings }: Theme) =>
    css({
      gridColumn: '1 / span 12',

      [mq.GROUP_4_MIN_WIDTH]: {
        gridColumn: '1 / span 8',
        paddingBottom: `${spacings.QUADRUPLE}rem`,
      },
    }),
  mainContent: ({ spacings, palette, mq }: Theme) =>
    css({
      background: palette.WHITE,
      outline: `${pixelsToRem(1)}rem transparent solid`,
      padding: `${spacings.DOUBLE}rem ${spacings.FULL}rem`,
      [mq.GROUP_1_MIN_WIDTH]: {
        padding: `${spacings.TRIPLE}rem ${spacings.FULL}rem`,
      },
      [mq.GROUP_2_MIN_WIDTH]: {
        padding: `${spacings.TRIPLE}rem ${spacings.DOUBLE}rem`,
      },
    }),
  screenContainer: () =>
    css({
      '.no-js &': {
        display: 'none',
      },
    }),
};
