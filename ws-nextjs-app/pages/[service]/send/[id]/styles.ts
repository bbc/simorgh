import { Theme, css } from '@emotion/react';
import pixelsToRem from '../../../../../src/app/utilities/pixelsToRem';

export default {
<<<<<<< HEAD
  grid: ({ mq, gridWidths, spacings }: Theme) =>
    css({
      maxWidth: `${pixelsToRem(gridWidths[1008])}rem`,
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: 'repeat(12, 1fr)',
      padding: '1rem',

=======
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
>>>>>>> da4dfcf1a4cfd102bce99fc21e42d0f83205dfe5
      [mq.GROUP_4_MIN_WIDTH]: {
        columnGap: `${spacings.FULL}rem`,
      },
    }),
  primaryColumn: ({ mq }: Theme) =>
    css({
      gridColumn: '1 / span 12',
      paddingBottom: '2rem',

      [mq.GROUP_4_MIN_WIDTH]: {
        gridColumn: '1 / span 8',
      },
    }),
  mainContent: ({ spacings }: Theme) =>
    css({
<<<<<<< HEAD
      paddingBottom: `${spacings.TRIPLE}rem`,
=======
      background: palette.WHITE,
      padding: `${spacings.DOUBLE}rem ${spacings.FULL}rem`,
      [mq.GROUP_1_MIN_WIDTH]: {
        padding: `${spacings.TRIPLE}rem ${spacings.FULL}rem`,
      },
      [mq.GROUP_2_MIN_WIDTH]: {
        padding: `${spacings.TRIPLE}rem ${spacings.DOUBLE}rem`,
        width: '35rem',
      },
>>>>>>> da4dfcf1a4cfd102bce99fc21e42d0f83205dfe5
    }),
};
