import { css, Theme } from '@emotion/react';
import pixelsToRem from '../../utilities/pixelsToRem';

const showOnDemandImage = '22.4375rem';

export default {
  grid: ({ mq, gridWidths, spacings }: Theme) =>
    css({
      maxWidth: `${pixelsToRem(gridWidths[1008])}rem`,
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: 'repeat(6, 1fr)',
      columnGap: `${spacings.FULL}rem`,

      [mq.GROUP_3_MIN_WIDTH]: {
        columnGap: `${spacings.DOUBLE}rem`,
      },

      [mq.GROUP_4_MIN_WIDTH]: {
        gridTemplateColumns: 'repeat(8, 1fr)',
      },

      [mq.GROUP_5_MIN_WIDTH]: {
        maxWidth: `${pixelsToRem(gridWidths[1280])}rem`,
        gridTemplateColumns: 'repeat(20, 1fr)',
      },
    }),
  contentWrapper: ({ mq, spacings }: Theme) =>
    css({
      gridColumn: '1 / span 6',
      padding: `0 ${spacings.FULL}rem`,

      [mq.GROUP_2_MIN_WIDTH]: {
        padding: `0 ${spacings.DOUBLE}rem`,
      },

      [mq.GROUP_4_MIN_WIDTH]: {
        gridColumn: '2 / span 6',
        padding: '0',
      },

      [mq.GROUP_5_MIN_WIDTH]: {
        gridColumn: '5 / span 12',
      },
    }),
  flexWrapper: ({ mq, spacings }: Theme) =>
    css({
      display: 'flex',
      flexDirection: 'row-reverse',
      [mq.GROUP_4_MIN_WIDTH]: {
        paddingTop: `${spacings.TRIPLE}rem`,
      },
    }),
  text: ({ spacings, isLite }: Theme) =>
    css({
      flex: '7 1 0',
      ...(isLite && {
        paddingBottom: `${spacings.TRIPLE}rem`,
      }),
    }),
  image: ({ mq, spacings }: Theme) =>
    css({
      display: 'none',
      [`@media (min-width: ${showOnDemandImage})`]: {
        display: 'unset',
        flex: '3 1 0',
        marginInlineEnd: `${spacings.FULL}rem`,
      },
      [mq.GROUP_3_MIN_WIDTH]: {
        marginInlineEnd: `${spacings.DOUBLE}rem`,
      },
    }),
  aside: () =>
    css({
      display: 'inline-block',
      width: '100%',
    }),
};
