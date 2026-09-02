import { css, Theme } from '@emotion/react';
import pixelsToRem from '../../../../../../src/app/utilities/pixelsToRem';

export default {
  headerContainer: () =>
    css({
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
    }),
  headerContainerForcedColours: ({ mq }: Theme) =>
    css({
      [mq.FORCED_COLOURS]: {
        borderBottom: `solid ${pixelsToRem(1)}rem transparent`,
      },
    }),
  heading: () =>
    css({
      '&:focus': {
        outline: 'none',
      },
    }),
  hideImage: ({ mq }: Theme) =>
    css({
      [mq.GROUP_4_MIN_WIDTH]: {
        display: 'none',
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
  backgroundColor: ({ palette }: Theme) =>
    css({
      backgroundColor: palette.GREY_10,
      width: '100%',
      top: 0,
      bottom: 0,
      position: 'absolute',
    }),
  backgroundColorSportData: ({ palette }: Theme) =>
    css({
      backgroundColor: palette.GREY_16, // non-concise view background colour - MVP
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
  contentWithImageContainer: ({ gridWidths, mq, spacings }: Theme) =>
    css({
      [mq.GROUP_4_MIN_WIDTH]: {
        display: 'flex',
        flexDirection: 'row-reverse',
        justifyContent: 'center',
        width: '100%',
        boxSizing: 'border-box',
        padding: `0 ${spacings.DOUBLE}rem`,
        margin: '0 auto',
        maxWidth: `${pixelsToRem(gridWidths[1280])}rem`,
      },
      [mq.GROUP_4_ONLY]: {
        alignItems: 'center',
      },
    }),
  textWrapper: ({ mq }: Theme) =>
    css({
      [mq.GROUP_4_MIN_WIDTH]: {
        width: '50%',
      },
    }),
  headerImage: ({ mq, spacings }: Theme) =>
    css({
      aspectRatio: '16 / 9',
      [mq.GROUP_4_MIN_WIDTH]: {
        aspectRatio: 'auto',
        display: 'flex',
      },
      [mq.GROUP_4_ONLY]: {
        paddingInlineEnd: `${spacings.DOUBLE}rem`,
      },
    }),
  liveMedia: ({ mq, spacings }: Theme) =>
    css({
      padding: `0rem ${spacings.FULL}rem ${spacings.DOUBLE}rem`,
      [mq.GROUP_2_MIN_WIDTH]: {
        padding: `0rem ${spacings.DOUBLE}rem ${spacings.DOUBLE}rem`,
      },
      [mq.GROUP_4_MIN_WIDTH]: {
        padding: `${spacings.DOUBLE}rem  ${spacings.DOUBLE}rem ${pixelsToRem(40)}rem`,
        maxWidth: '50%', // determines width of text overlay.
      },
    }),
  liveMediaOpen: ({ mq }: Theme) =>
    css({
      [mq.GROUP_4_MIN_WIDTH]: {
        maxWidth: '80rem',
      },
    }),
  fixedHeight: ({ mq, spacings }: Theme) =>
    css({
      [mq.GROUP_4_MIN_WIDTH]: {
        minHeight: '0',
        padding: `${pixelsToRem(40)}rem ${spacings.DOUBLE}rem 0`,
      },
    }),
  liveMediaAndTextContainer: () =>
    css({
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
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
      padding: `${spacings.DOUBLE}rem`,
      [mq.GROUP_4_MIN_WIDTH]: {
        minHeight: `${pixelsToRem(440)}rem`, // calculation includes padding
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 0,
      },
    }),
  titleWithImage: ({ palette }: Theme) =>
    css({
      display: 'block',
      color: palette.GREY_1,
      width: '100%',
    }),
  titleWithoutImage: ({ mq, palette, spacings }: Theme) =>
    css({
      display: 'block',
      color: palette.GREY_1,
      marginTop: `${spacings.DOUBLE}rem`,
      [mq.GROUP_0_MAX_WIDTH]: {
        marginTop: `${spacings.FULL}rem`,
      },
      [mq.GROUP_4_MIN_WIDTH]: {
        width: 'calc(100% / 3 * 2)',
        display: 'inline-flex',
        marginTop: '0',
      },
      [mq.GROUP_5_MIN_WIDTH]: {
        display: 'inline-flex',
        width: '75%',
      },
    }),
  sportTitleRow: ({ mq, spacings }: Theme) =>
    css({
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: `${spacings.FULL}rem`,
      position: 'relative',
      width: '100%',
      marginTop: `${spacings.DOUBLE}rem`,
      paddingBlockEnd: `${spacings.FULL}rem`,
      [mq.GROUP_0_MAX_WIDTH]: {
        marginTop: `${spacings.FULL}rem`,
      },
      '&::after': {
        content: '""',
        position: 'absolute',
        insetBlockEnd: 0,
        insetInlineStart: '50%',
        width: `calc(100vw - ${spacings.TRIPLE * 2}rem)`,
        transform: 'translateX(-50%)',
        borderBlockEnd: `${pixelsToRem(1)}rem solid #505050`,
      },
    }),
  sportTitleText: ({ palette, spacings }: Theme) =>
    css({
      display: 'block',
      width: '100%',
      color: palette.GREY_1,
      paddingInline: `${spacings.DOUBLE}rem`,
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
