import { css, Theme } from '@emotion/react';
import { GROUP_2_MAX_WIDTH_BP } from '#app/components/ThemeProvider/mediaQueries';
import pixelsToRem from '../../utilities/pixelsToRem';

export const GROUP_1_FROM_360PX_AND_GROUP_2 = `@media (min-width: 22.5rem) and (max-width: ${GROUP_2_MAX_WIDTH_BP}rem)`;

export default {
  wrapper: ({ mq, spacings }: Theme) =>
    css({
      [mq.GROUP_4_MIN_WIDTH]: {
        paddingTop: `${spacings.TRIPLE}rem`,
      },
    }),
  paragraph: () =>
    css({
      [GROUP_1_FROM_360PX_AND_GROUP_2]: {
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridColumnEnd: 'span 4',
      },
    }),
  image: () =>
    css({
      [GROUP_1_FROM_360PX_AND_GROUP_2]: {
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridColumnEnd: 'span 2',
      },
    }),
  grid: ({ mq, gridWidths }: Theme) =>
    css({
      maxWidth: `${pixelsToRem(gridWidths[1008])}rem`,
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: 'repeat(6, 1fr)',
      columnGap: '0.5rem',

      [mq.GROUP_3_MIN_WIDTH]: {
        columnGap: '1rem',
      },

      [mq.GROUP_4_MIN_WIDTH]: {
        gridTemplateColumns: 'repeat(8, 1fr)',
      },

      [mq.GROUP_5_MIN_WIDTH]: {
        maxWidth: `${pixelsToRem(gridWidths[1280])}rem`,
        gridTemplateColumns: 'repeat(20, 1fr)',
      },
    }),
  contentWrapper: ({ mq }: Theme) =>
    css({
      gridColumn: '1 / span 6',
      padding: '0 0.5rem',

      [mq.GROUP_2_MIN_WIDTH]: {
        padding: '0 1rem',
      },

      [mq.GROUP_4_MIN_WIDTH]: {
        gridColumn: '2 / span 6',
        padding: '0',
      },

      [mq.GROUP_5_MIN_WIDTH]: {
        gridColumn: '5 / span 12',
      },
    }),
};
