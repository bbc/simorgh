import { Theme, css } from '@emotion/react';
import pixelsToRem from '../../../../../../src/app/utilities/pixelsToRem';

export default {
  timeStamp: ({ palette, fontSizes, fontVariants, spacings, mq }: Theme) =>
    css({
      color: palette.WHITE,
      ...fontSizes.brevier,
      ...fontVariants.sansRegular,
      padding: `${spacings.HALF}rem ${pixelsToRem(12)}rem`,
      backgroundColor: palette.BRAND_BACKGROUND,
      [mq.GROUP_0_MAX_WIDTH]: {
        width: '100%',
      },
    }),
  postHeaderBanner: ({ palette }: Theme) =>
    css({
      alignItems: 'flex-start',
      display: 'flex',
      flexWrap: 'wrap',
      boxShadow: `inset 0 ${pixelsToRem(2)}rem ${palette.BRAND_BACKGROUND}`,
    }),
  breakingNewsLabel: ({ palette, mq }: Theme) =>
    css({
      color: palette.WHITE,
      backgroundColor: palette.BRAND_BACKGROUND,
      flex: '1 0 0',
      padding: `${pixelsToRem(4)}rem  ${pixelsToRem(12)}rem`,
      [mq.GROUP_0_MAX_WIDTH]: {
        paddingTop: '0',
      },
    }),
  postHeadings: ({ palette }: Theme) =>
    css({
      color: palette.BLACK,
      display: `block`,
      margin: 0 /* Reset */,
    }),
  postHeadline: ({ spacings, mq }: Theme) =>
    css({
      padding: `${spacings.TRIPLE}rem ${pixelsToRem(8)}rem 0`,
      [mq.GROUP_2_MIN_WIDTH]: {
        padding: `${spacings.TRIPLE}rem ${pixelsToRem(16)}rem 0`,
      },
      [mq.GROUP_4_MIN_WIDTH]: {
        padding: `${spacings.TRIPLE}rem 0 0`,
      },
    }),
  postSubHeadline: ({ mq, fontSizes }: Theme) =>
    css({
      padding: `${pixelsToRem(4)}rem ${pixelsToRem(8)}rem 0`,
      [mq.GROUP_2_MIN_WIDTH]: {
        padding: `${pixelsToRem(4)}rem ${pixelsToRem(16)}rem 0`,
      },
      [mq.GROUP_3_MIN_WIDTH]: {
        ...fontSizes.longPrimer,
      },
      [mq.GROUP_4_MIN_WIDTH]: {
        padding: `${pixelsToRem(4)}rem 0 0`,
      },
    }),
  postContainer: ({ palette, spacings }: Theme) =>
    css({
      backgroundColor: palette.GREY_2,
      margin: `0 0 ${spacings.DOUBLE}rem`,
    }),
  postBody: ({ spacings, mq }: Theme) =>
    css({
      padding: `0 ${pixelsToRem(8)}rem ${pixelsToRem(8)}rem`,
      border: `solid ${pixelsToRem(3)}rem transparent`,
      [mq.GROUP_2_MIN_WIDTH]: {
        margin: `0 0 ${spacings.TRIPLE}rem`,
        padding: `0 0 ${pixelsToRem(8)}rem 0`,
      },
      [mq.GROUP_4_MIN_WIDTH]: {
        margin: `0 0 ${spacings.DOUBLE}rem`,
        padding: `0 ${pixelsToRem(16)}rem ${pixelsToRem(8)}rem`,
      },
    }),
  postContent: ({ spacings }: Theme) =>
    css({
      paddingTop: `${spacings.DOUBLE}rem`,
    }),
  bodyText: ({ palette, spacings }: Theme) =>
    css({
      color: palette.BLACK,
      margin: 0 /* Reset */,
      paddingBottom: `${spacings.DOUBLE}rem`,
      '& li': {
        marginBottom: `${pixelsToRem(8)}rem`,
      },
    }),
  bodyMedia: ({ spacings, mq }: Theme) =>
    css({
      paddingLeft: `${spacings.FULL}rem`,
      paddingRight: `${spacings.FULL}rem`,
      [mq.GROUP_2_MIN_WIDTH]: {
        paddingLeft: `${spacings.DOUBLE}rem`,
        paddingRight: `${spacings.DOUBLE}rem`,
      },
      [mq.GROUP_4_MIN_WIDTH]: {
        padding: 0,
      },
    }),
};
