import { css, Theme } from '@emotion/react';
import pixelsToRem from '../../utilities/pixelsToRem';

export default {
  pageWrapper: ({ palette, isDarkUi }: Theme) =>
    css({
      backgroundColor: isDarkUi ? palette.GREY_10 : palette.GREY_2,
    }),
  grid: ({ mq, gridWidths }: Theme) =>
    css({
      maxWidth: `${pixelsToRem(gridWidths[1008])}rem`,
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: 'repeat(12, 1fr)',
      paddingBottom: '2rem',
      [mq.GROUP_4_MIN_WIDTH]: {
        padding: '0 1rem',
        columnGap: '1rem',
      },
    }),
  latestMediaColumn: ({ mq }: Theme) =>
    css({
      gridColumn: '1 / span 12',
      paddingTop: '2rem',
      [mq.GROUP_4_MIN_WIDTH]: {
        gridColumn: '9 / span 4',
      },
    }),
  mainContent: ({ mq }: Theme) =>
    css({
      gridColumn: '1 / span 12',
      [mq.GROUP_4_MIN_WIDTH]: {
        gridColumn: '1 / span 8',
      },
    }),
  mediaPlayer: ({ spacings }: Theme) =>
    css({
      paddingTop: `${spacings.TRIPLE}rem`,
    }),
  additionalContent: ({ spacings, mq }: Theme) =>
    css({
      gridColumn: '1 / span 12',
      margin: `${spacings.DOUBLE}rem`,
      paddingBottom: `${spacings.FULL}rem`,
      [mq.GROUP_4_MIN_WIDTH]: {
        gridColumn: '1 / span 8',
        '&:last-child': {
          marginBottom: `${spacings.QUADRUPLE}rem`,
        },
      },
    }),
  responsiveComponentWrapper: ({ mq, spacings }: Theme) =>
    css({
      marginBottom: `${spacings.TRIPLE}rem`,
      [mq.GROUP_4_MIN_WIDTH]: {
        marginBottom: `${spacings.FULL}rem`,
        padding: `${spacings.DOUBLE}rem`,
      },
    }),
};
