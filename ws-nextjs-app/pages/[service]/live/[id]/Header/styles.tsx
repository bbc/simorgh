import { css, Theme } from '@emotion/react';
import pixelsToRem from '../../../../../../src/app/utilities/pixelsToRem';

export default {
  backgroundColor: ({ palette, mq }: Theme) =>
    css({
      backgroundColor: palette.GREY_10,
      width: '100%',
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
      // zIndex: 1, // needed for non-image
      position: 'relative',

      [mq.GROUP_2_MIN_WIDTH]: {
        padding: `${pixelsToRem(16)}rem`,
      },

      [mq.GROUP_4_MIN_WIDTH]: {
        paddingInlineStart: `${pixelsToRem(16)}rem`,
        paddingInlineEnd: `${pixelsToRem(16)}rem`,
        paddingTop: `${pixelsToRem(24)}rem`,
        paddingBottom: `${pixelsToRem(32)}rem`,
      },
    }),
  innerWrapper: ({ mq }: Theme) =>
    css({
      [mq.GROUP_4_MIN_WIDTH]: {
        minHeight: '20.3125rem',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        zIndex: '1', // not 4?
        maxWidth: '50%', // fix?
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
  layoutWithLiveLabelNoImage: ({ mq }: Theme) =>
    css({
      [mq.GROUP_4_MIN_WIDTH]: {
        marginInlineStart: 'calc(100% / 3)', // this feels janky
      },
      [mq.GROUP_5_MIN_WIDTH]: {
        marginInlineStart: 'calc(100% / 4)', // this feels janky
      },
    }),
  contentWrapper: ({ mq, gridWidths }: Theme) =>
    css({
      [mq.GROUP_4_MIN_WIDTH]: {
        maxWidth: `${pixelsToRem(gridWidths[1280])}rem`,
        margin: '0 auto',
        position: 'relative',
        width: '100%',
      },
    }),

  canvas: () =>
    css({
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
    }),

  backgroundImage: ({ mq, palette }: Theme) =>
    css({
      // minHeight: '27.5rem', // fix
      [mq.GROUP_4_MIN_WIDTH]: {
        position: 'absolute',
        right: '0',
        top: '0',
        // minHeight: '25.3125rem', // fix
        // width: '60%',
        // maxWidth: '45rem',
        height: '100%',
        aspectRatio: '16 / 9', // check
        overflow: 'hidden', // check
      },
      '& div': {
        '&::after': {
          [mq.GROUP_4_MIN_WIDTH]: {
            background: `linear-gradient(to right, ${palette.GREY_10} 0%, rgba(255, 255, 255, 0) 100%, ${palette.GREY_10} 100%)`,
            content: "''",
            display: 'block',
            height: '100%',
            position: 'absolute',
            top: 0,
            width: '100%',
          },
          [mq.GROUP_5_MIN_WIDTH]: {
            background: `linear-gradient(to right, ${palette.GREY_10} 0%, rgba(255, 255, 255, 0) 49%, ${palette.GREY_10} 100%)`,
          },
        },
      },
    }),
};
