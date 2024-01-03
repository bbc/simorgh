import pixelsToRem from '#app/utilities/pixelsToRem';
import { Theme, css } from '@emotion/react';

export default {
  timeStamp: ({ palette, fontSizes, fontVariants, spacings }: Theme) =>
    css({
      color: palette.WHITE,
      ...fontSizes.brevier,
      ...fontVariants.sansRegular,
      padding: `${spacings.HALF}rem ${pixelsToRem(12)}rem`,
      backgroundColor: palette.BRAND_BACKGROUND,
    }),
  postHeaderBanner: ({ palette, mq }: Theme) =>
    css({
      alignItems: 'flex-start',
      display: 'flex',
      flexWrap: 'wrap',
      borderTop: `solid ${pixelsToRem(2)}rem ${palette.BRAND_BACKGROUND}`,
      [mq.HIGH_CONTRAST]: {
        borderBottom: `solid ${pixelsToRem(3)}rem transparent`,
      },
    }),
  fullWidth: ({ palette }: Theme) =>
    css({
      backgroundColor: palette.BRAND_BACKGROUND,
    }),
  breakingNewsLabel: ({ palette, spacings }: Theme) =>
    css({
      color: palette.WHITE,
      backgroundColor: palette.BRAND_BACKGROUND,
      flex: '1 0 1',
      padding: `${spacings.HALF}rem  ${pixelsToRem(12)}rem`,
    }),
  postHeadings: ({ palette }: Theme) =>
    css({
      color: palette.BLACK,
      display: `block`,
      margin: 0 /* Reset */,
    }),
  postHeadline: ({ spacings }: Theme) =>
    css({
      padding: `${spacings.TRIPLE}rem ${spacings.DOUBLE}rem 0`,
    }),
  postSubHeadline: ({ mq, fontSizes, spacings }: Theme) =>
    css({
      padding: `${spacings.HALF}rem ${spacings.DOUBLE}rem 0`,
      [mq.GROUP_3_MIN_WIDTH]: {
        ...fontSizes.longPrimer,
      },
    }),
  postContainer: ({ palette, spacings, mq }: Theme) =>
    css({
      backgroundColor: palette.GREY_2,
      margin: `0 0 ${spacings.DOUBLE}rem`,
      [mq.GROUP_2_MIN_WIDTH]: {
        margin: `0 0 ${spacings.TRIPLE}rem`,
      },
      [mq.GROUP_4_MIN_WIDTH]: {
        margin: `0 0 ${spacings.DOUBLE}rem`,
      },
      [mq.HIGH_CONTRAST]: {
        border: `solid ${pixelsToRem(3)}rem transparent`,
        borderTop: `solid ${pixelsToRem(1)}rem transparent`,
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
  bodyText: ({ palette, spacings, mq }: Theme) =>
    css({
      color: palette.BLACK,
      margin: 0 /* Reset */,
      paddingBottom: `${spacings.DOUBLE}rem`,
      '& ul': {
        paddingBottom: `${spacings.DOUBLE}rem`,
        paddingInlineStart: `${spacings.TRIPLE}rem`,
        [mq.GROUP_4_MIN_WIDTH]: {
          paddingBottom: 0,
        },
      },
      '& li': {
        marginBottom: `${spacings.FULL}rem`,
        '&:last-child': {
          marginBottom: 0,
        },
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
