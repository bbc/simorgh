import { Theme, css } from '@emotion/react';
import pixelsToRem from '../../../../../../src/app/utilities/pixelsToRem';

export default {
  timeStamp: ({ palette, fontSizes, fontVariants, spacings }: Theme) =>
    css({
      color: palette.WHITE,
      ...fontSizes.brevier,
      ...fontVariants.sansRegular,
      padding: `${spacings.HALF}rem ${pixelsToRem(12)}rem`,
      backgroundColor: palette.BRAND_BACKGROUND,
      display: 'inline-block',
    }),
  postHeaderBanner: ({ palette, mq }: Theme) =>
    css({
      borderTop: `solid ${pixelsToRem(2)}rem ${palette.BRAND_BACKGROUND}`,
      display: 'inline-block',
      width: '100%',
      [mq.FORCED_COLOURS]: {
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
      padding: `${spacings.HALF}rem  ${pixelsToRem(12)}rem`,
      display: 'inline-block',
    }),
  postHeadings: ({ palette }: Theme) =>
    css({
      color: palette.BLACK,
      display: `inline-block`,
      width: '100%',
      margin: 0 /* Reset */,
    }),
  heading: ({ mq }: Theme) =>
    css({
      [mq.GROUP_1_MIN_WIDTH]: {
        lineHeight: '0', // required to prevent the background colour appearing above red top border
      },
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
      [mq.FORCED_COLOURS]: {
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
      padding: `0 ${spacings.FULL}rem ${spacings.DOUBLE}rem`,
      [mq.GROUP_2_MIN_WIDTH]: {
        paddingLeft: `${spacings.DOUBLE}rem`,
        paddingRight: `${spacings.DOUBLE}rem`,
      },
      [mq.GROUP_4_MIN_WIDTH]: {
        paddingLeft: 0,
        paddingRight: 0,
      },
    }),
};
