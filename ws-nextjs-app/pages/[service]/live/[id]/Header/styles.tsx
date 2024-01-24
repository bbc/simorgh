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
  textContainerWithoutImage: ({ mq, gridWidths, spacings }: Theme) =>
    css({
      position: 'relative',
      padding: `${spacings.DOUBLE}rem ${spacings.FULL}rem`,
      maxWidth: `${pixelsToRem(gridWidths[1280])}rem`,
      margin: '0 auto',
      [mq.GROUP_2_MIN_WIDTH]: {
        padding: `${spacings.DOUBLE}rem`,
      },

      [mq.GROUP_4_MIN_WIDTH]: {
        paddingTop: `${spacings.TRIPLE}rem`,
        paddingBottom: `${spacings.QUADRUPLE}rem`,
      },
    }),
  textContainerWithImage: ({ mq, spacings }: Theme) =>
    css({
      position: 'relative',
      padding: `${spacings.FULL}rem ${spacings.FULL}rem ${spacings.DOUBLE}rem`,
      [mq.GROUP_2_MIN_WIDTH]: {
        padding: `${spacings.FULL}rem ${spacings.DOUBLE}rem ${spacings.DOUBLE}rem`,
      },
      [mq.GROUP_4_MIN_WIDTH]: {
        padding: `${spacings.DOUBLE}rem`,
        minHeight: `${pixelsToRem(440)}rem`, // calculation includes padding
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        maxWidth: '50%', // determines width of text overlay.
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
        paddingInlineEnd: `${spacings.DOUBLE}rem`,
      },
    }),
  labelWithoutImage: ({ mq }: Theme) =>
    css({
      [mq.GROUP_4_MIN_WIDTH]: {
        marginBottom: 0,
        minWidth: 'calc(100% / 3)',
        maxWidth: 'calc(100% / 3)',
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
