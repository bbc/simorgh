import { css, Theme } from '@emotion/react';
import pixelsToRem from '../../../../../../src/app/utilities/pixelsToRem';

export default {
  headerContainer: () =>
    css({
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
    }),
  backgroundContainer: () =>
    css({
      position: 'absolute',
      top: '0',
      bottom: '0',
      width: '100%',
      overflow: 'hidden',
    }),
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
  contentContainer: ({ mq, gridWidths }: Theme) =>
    css({
      [mq.GROUP_4_MIN_WIDTH]: {
        maxWidth: `${pixelsToRem(gridWidths[1280])}rem`,
        margin: '0 auto',
        position: 'relative',
        width: '100%',
      },
    }),
  textContainer: ({ mq, gridWidths, spacings }: Theme) =>
    css({
      maxWidth: `${pixelsToRem(gridWidths[1280])}rem`,
      margin: '0 auto',
      padding: `${spacings.DOUBLE}rem ${spacings.FULL}rem`,
      position: 'relative',

      [mq.GROUP_2_MIN_WIDTH]: {
        padding: `${spacings.DOUBLE}rem`,
      },

      [mq.GROUP_4_MIN_WIDTH]: {
        paddingInlineStart: `${spacings.DOUBLE}rem`,
        paddingInlineEnd: `${spacings.DOUBLE}rem`,
        paddingTop: `${spacings.TRIPLE}rem`,
        paddingBottom: `${spacings.QUADRUPLE}rem`,
      },
    }),
  textStylesWithImage: ({ mq }: Theme) =>
    css({
      [mq.GROUP_4_MIN_WIDTH]: {
        minHeight: `${pixelsToRem(384)}rem`, // 440 total minus 32 minus 24 due to the padding on the outer container
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        zIndex: '1',
        maxWidth: '50%', // to determine this matches UX designs.
      },
    }),
  rowAlign: ({ mq }: Theme) =>
    css({
      [mq.GROUP_4_MIN_WIDTH]: {
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'flex-end',
        justifyContent: 'flex-start',
        width: '100%',
      },
    }),
  label: ({ palette, mq, spacings }: Theme) =>
    css({
      color: palette.LIVE_LIGHT,
      marginBottom: `${spacings.DOUBLE}rem`,
      textTransform: 'uppercase',
      display: 'block',

      [mq.GROUP_4_MIN_WIDTH]: {
        display: 'flex',
        flex: '1 auto',
        minWidth: 'calc(100% / 3)',
        maxWidth: 'calc(100% / 3)',
        paddingInlineEnd: `${spacings.DOUBLE}rem`,
      },
      [mq.GROUP_5_MIN_WIDTH]: {
        minWidth: 'calc(100% / 4)',
        maxWidth: 'calc(100% / 4)',
      },
    }),
  removeLabelMargin: ({ mq }: Theme) =>
    css({
      [mq.GROUP_4_MIN_WIDTH]: {
        marginBottom: 0,
      },
    }),
  title: ({ mq, palette }: Theme) =>
    css({
      color: palette.GREY_1,
      [mq.GROUP_4_MIN_WIDTH]: {
        flex: '1 auto',
      },
    }),
  description: ({ palette, spacings }: Theme) =>
    css({
      color: palette.GREY_2,
      margin: 0,
      marginTop: `${spacings.DOUBLE}rem`,
    }),
  layoutWithLiveLabelNoImage: ({ mq }: Theme) =>
    css({
      [mq.GROUP_4_MIN_WIDTH]: {
        marginInlineStart: 'calc(100% / 3)',
      },
      [mq.GROUP_5_MIN_WIDTH]: {
        marginInlineStart: 'calc(100% / 4)',
      },
    }),
};
