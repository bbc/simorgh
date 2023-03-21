import pixelsToRem from '#app/utilities/pixelsToRem';
import { css, Theme } from '@emotion/react';

export default {
  pageWrapper: ({ palette }: Theme) =>
    css({
      backgroundColor: palette.GREY_2,
    }),
  grid: ({ mq }: Theme) =>
    css({
      maxWidth: `${pixelsToRem(1008)}rem`,
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: 'repeat(12, 1fr)',

      [mq.GROUP_4_MIN_WIDTH]: {
        padding: '0 1rem',
        // gridGap: '1rem', <- This is the same as the 'enableGelGutters' prop on the Grid component
      },
    }),
  primaryColumn: ({ mq }: Theme) =>
    css({
      // Start at col 1 and span 12 columns
      gridColumn: '1 / span 12',

      [mq.GROUP_4_MIN_WIDTH]: {
        // Start at col 1 and span 8 columns
        gridColumn: '1 / span 8',
      },
    }),
  secondaryColumn: ({ mq }: Theme) =>
    css({
      marginTop: '2rem',
      // Start at col 1 and span 12 columns
      gridColumn: '1 / span 12',

      [mq.GROUP_4_MIN_WIDTH]: {
        // Start at col 9 and span 4 columns
        gridColumn: '9 / span 4',
      },
    }),
  mainContent: ({ spacings }: Theme) =>
    css({
      paddingBottom: `${spacings.TRIPLE}rem`,
    }),
  mediaPlayer: ({ spacings }: Theme) =>
    css({
      paddingTop: `${spacings.TRIPLE}rem`,
    }),
};
