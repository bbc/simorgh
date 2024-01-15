import { css, Theme } from '@emotion/react';
import pixelsToRem from '../../../../../../src/app/utilities/pixelsToRem';

export default {
  backgroundColor: ({ palette, mq }: Theme) =>
    css({
      backgroundColor: palette.GREY_10,
      width: '100%',
      // height: '100%',
      top: 0,
      bottom: 0,
      position: 'absolute',
      [mq.HIGH_CONTRAST]: {
        borderBottom: `solid ${pixelsToRem(1)}rem transparent`,
      },
    }),
  backgroundContainer: () =>
    css({
      position: 'absolute',
      top: '0',
      bottom: '0',
      width: '100%',
      overflow: 'hidden',
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
        maxWidth: 'calc(100% / 3)',
        paddingInlineEnd: '16px', // fix
      },
      [mq.GROUP_5_MIN_WIDTH]: {
        minWidth: 'calc(100% / 4)',
        maxWidth: 'calc(100% / 4)',
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
  headerImage: () => css({}), // spare
  overlayText: ({ mq }: Theme) =>
    css({
      zIndex: 4,
      position: 'absolute',
      bottom: 0,
      // width: '100%',
      [mq.GROUP_4_MIN_WIDTH]: {
        position: 'relative',
        // position: 'absolute',
        // top: '50%',
        // transform: 'translate(0, -50%)',
      },
    }),
  // wrapper: ({ mq, gridWidths }: Theme) =>
  //   css({
  //     [mq.GROUP_4_MIN_WIDTH]: {
  //       display: 'flex',
  //       flexDirection: 'row-reverse',
  //     },
  //   }),

  contentWrapper: ({ mq, gridWidths }: Theme) =>
    css({
      [mq.GROUP_4_MIN_WIDTH]: {
        maxWidth: `${pixelsToRem(gridWidths[1280])}rem`,
        margin: '0 auto',
        position: 'relative',
        width: '100%',
      },
    }),

  imageWrapper: () =>
    css({
      maxHeight: '440px',
      aspectRatio: '16 / 9',
      overflow: 'hidden',
    }),

  canvas: ({ mq }: Theme) =>
    css({
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      minHeight: '25.3125rem', // fix
      [mq.GROUP_4_MIN_WIDTH]: {},
    }),

  backgroundImage: ({ mq }: Theme) =>
    css({
      position: 'absolute',
      right: '0',
      top: '0',
      // width: '100%',
      [mq.GROUP_4_MIN_WIDTH]: {
        minHeight: '25.3125rem', // fix
        width: '60%',
        maxWidth: '45rem',
        height: '100%',
      },
    }),
};
