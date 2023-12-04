import { css, Theme } from '@emotion/react';
import pixelsToRem from '../../../../../../src/app/utilities/pixelsToRem';

export default {
  backgroundColor: ({ palette, mq }: Theme) =>
    css({
      backgroundColor: palette.GREY_10,
      [mq.HIGH_CONTRAST]: {
        borderBottom: `solid ${pixelsToRem(3)}rem transparent`,
      },
    }),
  outerGrid: ({ mq, gridWidths }: Theme) =>
    css({
      maxWidth: `${pixelsToRem(gridWidths[1280])}rem`,
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: 'repeat(12, 1fr)',
      padding: `${pixelsToRem(16)}rem ${pixelsToRem(8)}rem`,

      [mq.GROUP_2_MIN_WIDTH]: {
        padding: `${pixelsToRem(16)}rem`,
      },

      [mq.GROUP_4_MIN_WIDTH]: {
        paddingInlineStart: `${pixelsToRem(16)}rem`,
        paddingInlineEnd: `${pixelsToRem(16)}rem`,
        paddingTop: `${pixelsToRem(24)}rem`,
        paddingBottom: `${pixelsToRem(32)}rem`,
        columnGap: '1rem',
      },
    }),
  innerGrid: ({ mq }: Theme) =>
    css({
      display: 'grid',
      gridTemplateColumns: 'repeat(12, 1fr)',
      [mq.GROUP_4_MIN_WIDTH]: {
        columnGap: '1rem',
      },
    }),
  heading: () =>
    css({
      gridColumn: '1 / span 12',
    }),
  label: ({ palette, mq }: Theme) =>
    css({
      color: palette.LIVE_LIGHT,
      gridColumn: '1 / span 12',
      marginBottom: `${pixelsToRem(16)}rem`,
      textTransform: 'uppercase',

      [mq.GROUP_4_MIN_WIDTH]: {
        paddingInlineStart: `${pixelsToRem(16)}rem`,
        gridColumn: '1 / span 4',
        marginBottom: 0,
      },
      [mq.GROUP_5_MIN_WIDTH]: {
        gridColumn: '1 / span 3',
      },
    }),
  title: ({ palette }: Theme) =>
    css({
      color: palette.GREY_1,
      gridColumn: '1 / span 12',
    }),
  description: ({ palette }: Theme) =>
    css({
      color: palette.GREY_2,
      gridColumn: '1 / span 12',
      margin: 0,
      marginTop: `${pixelsToRem(16)}rem`,
    }),
  layoutWithLiveLabel: ({ mq }: Theme) =>
    css({
      [mq.GROUP_4_MIN_WIDTH]: {
        gridColumn: '5 / span 8',
      },
      [mq.GROUP_5_MIN_WIDTH]: {
        gridColumn: '4 / span 9',
      },
    }),
};
