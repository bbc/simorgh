import { Theme, css } from '@emotion/react';
import pixelsToRem from '../../../../src/app/utilities/pixelsToRem';

export default {
  grid: ({ mq, gridWidths, spacings }: Theme) =>
    css({
      maxWidth: `${pixelsToRem(gridWidths[1008])}rem`,
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: 'repeat(12, 1fr)',
      padding: '1rem',

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
  orderedList : () => 
    css({
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(50%, 1fr))',
      listStyleType: 'none',
    }),
  listItem : ({ fontSizes }) => 
    css({
      borderBottom: '1px solid #000',
      paddingBottom: '15px',
      marginBottom: '8px',
      marginRight: '5px',
      time: {
        ...fontSizes.greatPrimer
      },
      svg: {
        marginRight: '8px',
      },
    }),
  mainContent: ({ spacings }: Theme) =>
    css({
      paddingBottom: `${spacings.TRIPLE}rem`,
    }),
};
