import { css, Theme } from '@emotion/react';
import pixelsToRem from '../../../../../../src/app/utilities/pixelsToRem';

export default {
  backgroundColor: ({ palette, mq }: Theme) =>
    css({
      backgroundColor: palette.GREY_10,
      [mq.HIGH_CONTRAST]: {
        borderBottom: `solid ${pixelsToRem(1)}rem transparent`,
      },
    }),
  outerWrapper: ({ mq, gridWidths }: Theme) =>
    css({
      maxWidth: `${pixelsToRem(gridWidths[1280])}rem`,
      margin: '0 auto',
      padding: `${pixelsToRem(16)}rem ${pixelsToRem(8)}rem`,

      [mq.GROUP_2_MIN_WIDTH]: {
        padding: `${pixelsToRem(16)}rem`,
      },

      [mq.GROUP_4_MIN_WIDTH]: {
        paddingInlineStart: `${pixelsToRem(16)}rem`,
        paddingInlineEnd: `${pixelsToRem(16)}rem`,
        paddingTop: `${pixelsToRem(24)}rem`,
        paddingBottom: `${pixelsToRem(32)}rem`,
        // display: 'flex', // not actually doing anything rn
        // flexDirection: 'column',
      },
    }),
  flex: ({ mq }: Theme) =>
    css({
      [mq.GROUP_4_MIN_WIDTH]: {
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'flex-end',
        justifyContent: 'flex-start',
        width: '100%',
      },
    }),
  label: ({ palette, mq }: Theme) =>
    css({
      color: palette.LIVE_LIGHT,
      marginBottom: `${pixelsToRem(16)}rem`,
      textTransform: 'uppercase',
      display: 'block',

      [mq.GROUP_4_MIN_WIDTH]: {
        marginBottom: 0,
        display: 'flex',
        flex: '1 auto',
        minWidth: 'calc(100% / 3)',
      },
      [mq.GROUP_5_MIN_WIDTH]: {
        minWidth: 'calc(100% / 4)',
      },
    }),
  title: ({ mq, palette }: Theme) =>
    css({
      color: palette.GREY_1,
      [mq.GROUP_4_MIN_WIDTH]: {
        flex: '1 auto',
      },
    }),
  description: ({ palette }: Theme) =>
    css({
      color: palette.GREY_2,
      margin: 0,
      marginTop: `${pixelsToRem(16)}rem`,
    }),
  layoutWithLiveLabel: ({ mq }: Theme) =>
    css({
      [mq.GROUP_4_MIN_WIDTH]: {
        marginInlineStart: 'calc(100% / 3)', // this feels janky
      },
      [mq.GROUP_5_MIN_WIDTH]: {
        marginInlineStart: 'calc(100% / 4)', // this feels janky
      },
    }),
};
