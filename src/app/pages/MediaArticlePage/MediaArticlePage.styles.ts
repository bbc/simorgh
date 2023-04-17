import {
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
} from '#app/legacy/psammead/gel-foundations/src/spacings';
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
      [mq.GROUP_4_MIN_WIDTH]: {
        padding: '0 1rem',
        columnGap: '1rem',
      },
    }),
  latestMediaColumn: ({ mq }: Theme) =>
    css({
      gridColumn: '1 / span 12',
      padding: '2rem 0',
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
  mostReadSection: ({ spacings, mq, gridWidths }: Theme) =>
    css({
      [mq.GROUP_1_MAX_WIDTH]: {
        margin: `0 ${spacings.FULL}rem`,
        paddingBottom: `${spacings.TRIPLE}rem`,
      },
      [mq.GROUP_2_MIN_WIDTH]: {
        [mq.GROUP_3_MAX_WIDTH]: {
          margin: `0 ${spacings.DOUBLE}rem`,
          paddingBottom: `${spacings.QUADRUPLE}rem`,
        },
      },
      [mq.GROUP_4_ONLY]: {
        margin: `0 ${spacings.DOUBLE}rem`,
        paddingBottom: `${spacings.QUINTUPLE}rem`,
      },
      [mq.GROUP_5_MIN_WIDTH]: {
        margin: '0 auto',
        padding: `0 ${spacings.DOUBLE}rem ${spacings.TRIPLE}rem`,
        maxWidth: `${pixelsToRem(gridWidths[1280])}rem`,
      },
    }),
  additionalContent: ({ spacings, mq }: Theme) =>
    css({
      gridColumn: '1 / span 12',
      margin: `${spacings.DOUBLE}rem`,
      paddingBottom: `${spacings.FULL}rem`,
      [mq.GROUP_4_MIN_WIDTH]: {
        margin: `${spacings.QUADRUPLE}rem 0`,
        paddingBottom: `${spacings.QUADRUPLE}rem`,
        gridColumn: '1 / span 8',
      },
    }),
  responsiveComponentWrapper: ({ mq }: Theme) =>
    css({
      marginBottom: `${GEL_SPACING_TRPL}`,
      [mq.GROUP_4_MIN_WIDTH]: {
        marginBottom: `${GEL_SPACING}`,
        padding: `${GEL_SPACING_DBL}`,
      },
    }),
};
