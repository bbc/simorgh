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
      borderTop: `solid ${pixelsToRem(2)}rem ${palette.BRAND_BACKGROUND}`,
    }),
  breakingNewsLabel: ({ palette, mq, spacings }: Theme) =>
    css({
      color: palette.WHITE,
      backgroundColor: palette.BRAND_BACKGROUND,
      flex: '1 0 0',
      padding: `${spacings.HALF}rem  ${pixelsToRem(12)}rem`,
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
      padding: `${spacings.TRIPLE}rem ${spacings.DOUBLE}rem 0`,
      [mq.GROUP_2_MIN_WIDTH]: {
        padding: `${spacings.TRIPLE}rem ${spacings.DOUBLE}rem 0`,
      },
      [mq.GROUP_4_MIN_WIDTH]: {
        padding: `${spacings.TRIPLE}rem ${spacings.DOUBLE}rem 0`,
      },
    }),
  postSubHeadline: ({ mq, fontSizes, spacings }: Theme) =>
    css({
      padding: `${spacings.HALF}rem ${spacings.DOUBLE}rem 0`,
      [mq.GROUP_2_MIN_WIDTH]: {
        padding: `${spacings.HALF}rem ${spacings.DOUBLE}rem 0`,
      },
      [mq.GROUP_3_MIN_WIDTH]: {
        ...fontSizes.longPrimer,
      },
      [mq.GROUP_4_MIN_WIDTH]: {
        padding: `${spacings.HALF}rem ${spacings.DOUBLE}rem 0`,
      },
    }),
  postBackground: ({ palette }: Theme) =>
    css({
      backgroundColor: palette.GREY_2,
    }),
  postContainer: ({ spacings, mq }: Theme) =>
    css({
      border: `solid ${pixelsToRem(3)}rem transparent`,
      margin: `0 0 ${spacings.DOUBLE}rem`,
      [mq.GROUP_2_MIN_WIDTH]: {
        margin: `0 0 ${spacings.TRIPLE}rem`,
      },
      [mq.GROUP_4_MIN_WIDTH]: {
        margin: `0 0 ${spacings.DOUBLE}rem`,
      },
    }),
  postContent: ({ spacings, mq }: Theme) =>
    css({
      padding: `${spacings.DOUBLE}rem ${spacings.FULL}rem ${spacings.FULL}rem`,

      [mq.GROUP_2_MIN_WIDTH]: {
        padding: `${spacings.DOUBLE}rem 0 ${spacings.FULL}rem 0`,
      },
      [mq.GROUP_4_MIN_WIDTH]: {
        padding: `${spacings.DOUBLE}rem ${spacings.DOUBLE}rem ${spacings.FULL}rem`,
      },
    }),
  bodyText: ({ palette, spacings }: Theme) =>
    css({
      color: palette.BLACK,
      margin: 0 /* Reset */,
      paddingBottom: `${spacings.DOUBLE}rem`,
      '& li': {
        marginBottom: `${spacings.FULL}rem`,
      },
    }),
};
