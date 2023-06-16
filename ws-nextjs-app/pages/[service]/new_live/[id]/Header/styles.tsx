import { css, Theme } from '@emotion/react';
import pixelsToRem from '../../../../../../src/app/utilities/pixelsToRem';

export default {
  grid: ({ mq, gridWidths }: Theme) =>
    css({
      maxWidth: `${pixelsToRem(gridWidths[1008])}rem`,
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: 'repeat(12, 1fr)',
      paddingInlineStart: `${pixelsToRem(8)}rem`,

      [mq.GROUP_2_MIN_WIDTH]: {
        paddingInlineStart: `${pixelsToRem(16)}rem`,
      },

      [mq.GROUP_4_MIN_WIDTH]: {
        paddingInlineStart: `${pixelsToRem(32)}rem`,
        columnGap: '1rem',
      },
    }),
  labelColumn: ({ mq }: Theme) =>
    css({
      gridColumn: '1 / span 12',

      [mq.GROUP_4_MIN_WIDTH]: {
        gridColumn: '1 / span 3',
      },
    }),
  textColumn: ({ mq }: Theme) =>
    css({
      gridColumn: '1 / span 12',

      [mq.GROUP_4_MIN_WIDTH]: {
        gridColumn: '5 / span 8',
      },
    }),
  title: ({ palette, mq }: Theme) =>
    css({
      color: palette.GREY_2,
      marginTop: `${pixelsToRem(16)}rem`,
      [mq.GROUP_4_MIN_WIDTH]: {
        marginTop: `${pixelsToRem(24)}rem`,
      },
    }),
  description: ({ palette, mq }: Theme) =>
    css({
      color: palette.GREY_2,
      marginBottom: `${pixelsToRem(16)}rem`,
      [mq.GROUP_4_MIN_WIDTH]: {
        marginTop: `${pixelsToRem(16)}rem`,
        marginBottom: `${pixelsToRem(32)}rem`, // to change once timestamp is added
      },
    }),
  backgroundColor: ({ palette }: Theme) =>
    css({
      backgroundColor: palette.GREY_10,
    }),
  placeholderStyles: ({ mq }: Theme) =>
    css({
      color: '#00ccc7',
      marginTop: `${pixelsToRem(16)}rem`,
      marginBottom: 0,
      [mq.GROUP_4_MIN_WIDTH]: {
        marginTop: `${pixelsToRem(24)}rem`,
      },
    }),
};
