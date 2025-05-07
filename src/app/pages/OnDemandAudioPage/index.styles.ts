import { css, Theme } from '@emotion/react';
import pixelsToRem from '../../utilities/pixelsToRem';

const showOnDemandImage = '22.4375rem';

export default {
  flexWrapper: ({ mq, spacings }: Theme) =>
    css({
      display: 'flex',
      flexDirection: 'row-reverse',
      [mq.GROUP_4_MIN_WIDTH]: {
        paddingTop: `${spacings.TRIPLE}rem`,
      },
    }),
  paragraph: ({ mq }: Theme) =>
    css({
      flex: '4 1 0',
      [`@media (min-width: ${showOnDemandImage})`]: {
        paddingInlineStart: '0.5rem',
      },
      [mq.GROUP_3_MIN_WIDTH]: {
        paddingInlineStart: '1rem',
      },
    }),
  image: () =>
    css({
      display: 'none',
      [`@media (min-width: ${showOnDemandImage})`]: {
        display: 'unset',
        flex: '2 1 0',
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
  externalLinks: () =>
    css({
      display: 'inline-block',
      width: '100%',
    }),
};
