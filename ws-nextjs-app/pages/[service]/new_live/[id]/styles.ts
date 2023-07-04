import { Theme, css } from '@emotion/react';
import pixelsToRem from '../../../../../src/app/utilities/pixelsToRem';

export default {
  wrapper: () =>
    css({
      maxWidth: `${pixelsToRem(1008)}rem`,
      margin: `${pixelsToRem(20)}rem auto`,
    }),
  code: () =>
    css({
      whiteSpace: 'pre-wrap',
      maxHeight: '50vh',
      overflow: 'auto',
      backgroundColor: '#f6f8fa',
      padding: `${pixelsToRem(20)}rem`,
      borderRadius: `${pixelsToRem(12)}rem`,

      '& > h4': {
        textDecoration: 'underline',
        marginBottom: `${pixelsToRem(10)}rem`,
      },

      '& > p': {
        margin: '0.25rem 0',
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
  leftSection: ({ mq }: Theme) =>
    css({
      gridColumn: '12',

      [mq.GROUP_4_MIN_WIDTH]: {
        gridColumn: '1 / 5',
      },
    }),
  rightSection: ({ mq }: Theme) =>
    css({
      gridColumn: '12',

      [mq.GROUP_4_MIN_WIDTH]: {
        gridColumn: '5 / 13',
      },
    }),
};
