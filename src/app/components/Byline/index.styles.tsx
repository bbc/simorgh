import { css, Theme } from '@emotion/react';
import pixelsToRem from '../../utilities/pixelsToRem';

export default {
  bylineContainer: ({ spacings, mq }: Theme) =>
    css({
      paddingInlineStart: `${spacings.FULL}rem`,
      paddingBottom: `${spacings.TRIPLE}rem`,
      lineHeight: '1.35rem', // not sure I should do this due to script sizes
      [mq.GROUP_2_MIN_WIDTH]: {
        paddingInlineStart: `${spacings.DOUBLE}rem`,
      },
      [mq.GROUP_4_MIN_WIDTH]: { paddingInlineStart: 0 },
    }),

  bylineContainerSingleContributor: ({ mq }: Theme) =>
    css({
      display: 'grid',
      [mq.GROUP_1_MIN_WIDTH]: {
        gridTemplateColumns: 'repeat(2, auto)',
      },
      [mq.GROUP_2_MIN_WIDTH]: {
        display: 'flex',
        flexWrap: 'wrap',
      },
    }),

  bylineSection: ({ spacings, mq }: Theme) =>
    css({
      // marginRight: `${spacings.FULL}rem`,
      // marginBottom: `${spacings.FULL}rem`,
      [mq.GROUP_3_MIN_WIDTH]: {
        // marginRight: `${spacings.DOUBLE}rem`,
        marginBottom: 0,
      },
    }),

  bylineList: () => css({ listStyle: 'none', padding: 0, margin: 0 }),

  author: ({ palette, isDarkUi }: Theme) =>
    css({
      color: isDarkUi ? palette.GREY_2 : palette.GREY_10,
      display: 'inline-block',
    }),

  authorSingleContributor: () =>
    css({
      verticalAlign: 'middle',
    }),

  jobRole: ({ palette, isDarkUi }: Theme) =>
    css({ color: isDarkUi ? palette.GREY_2 : palette.GREY_6 }),

  comma: ({ palette, isDarkUi }: Theme) =>
    css({ color: isDarkUi ? palette.GREY_2 : palette.GREY_6 }),

  authorChevron: ({ palette, isDarkUi, spacings, mq }: Theme) =>
    css({
      verticalAlign: 'middle',
      margin: `0 ${spacings.HALF}rem`,
      color: isDarkUi ? palette.GREY_2 : palette.GREY_10,
      fill: 'currentcolor',
      width: `${spacings.FULL + spacings.HALF}rem`,
      height: `${spacings.FULL + spacings.HALF}rem`,
      [mq.FORCED_COLOURS]: { fill: 'linkText' },
    }),

  link: ({ mq, palette }: Theme) =>
    css({
      display: 'inline-block',
      '.byline-link': {
        textDecoration: 'underline',
        textDecorationThickness: `${pixelsToRem(1)}rem`,
        textUnderlineOffset: `${pixelsToRem(4)}rem`,
        textDecorationColor: palette.GREY_5,
      },
      '&:focus, &:hover': {
        '.byline-link': {
          color: palette.POSTBOX,
        },
      },
      [mq.FORCED_COLOURS]: {
        '&:visited': {
          svg: {
            fill: 'VisitedText',
          },
        },
        '&:active': {
          svg: {
            fill: 'ActiveText',
          },
        },
      },
    }),

  linkSingleContributor: ({ palette }: Theme) =>
    css({
      paddingInlineEnd: '2.75rem',
      textDecoration: 'none',
      '&:focus, &:hover': {
        '.byline-link': {
          textDecoration: 'underline',
          color: palette.POSTBOX,
        },
      },
    }),

  location: () =>
    css({
      // margin: '0',
      // display: 'block',
      // clear: 'both',
    }),

  locationText: ({ palette, isDarkUi }: Theme) =>
    css({
      color: isDarkUi ? palette.GREY_2 : palette.GREY_6,
      // paddingTop: ` ${pixelsToRem(4)}rem`,
    }),

  locationTextForSingleContributor: () =>
    css({
      // display: 'block',
    }),

  // reportingFromText: ({ palette, isDarkUi }: Theme) =>
  //   css({
  //     color: isDarkUi ? palette.GREY_2 : palette.SHADOW,
  //   }),

  // timestampLineBreak: ({ palette, spacings, mq }: Theme) =>
  //   css({
  //     // // EXPERIMENT: Article Read Time
  //     // '&:nth-child(2)::before': {
  //     //   content: '""',
  //     //   borderTop: `${pixelsToRem(2)}rem solid ${palette.GREY_5}`,
  //     //   width: `${pixelsToRem(40)}rem`,
  //     //   display: 'block',
  //     //   margin: `${spacings.DOUBLE}rem ${spacings.FULL}rem`,
  //     //   [mq.GROUP_2_MIN_WIDTH]: { margin: `${spacings.DOUBLE}rem` },
  //     //   [mq.GROUP_4_MIN_WIDTH]: { margin: `${spacings.DOUBLE}rem 0` },
  //     // },
  //   }),

  ImageWrapper: ({ palette }: Theme) =>
    css({
      display: 'inline-flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      width: `${pixelsToRem(80)}rem`,
      height: `${pixelsToRem(60)}rem`,
      backgroundColor: `${palette.GREY_7}`,
      overflow: 'visible',
    }),

  imageLtr: () =>
    css([
      {
        float: 'left',
        margin: `${pixelsToRem(25)}rem ${pixelsToRem(8)}rem ${pixelsToRem(
          16,
        )}rem 0px`,
      },
    ]),

  imageRtl: () =>
    css([
      {
        float: 'right',
        margin: `${pixelsToRem(25)}rem 0px ${pixelsToRem(16)}rem ${pixelsToRem(
          8,
        )}rem`,
      },
    ]),

  imageSrc: () =>
    css({
      width: `${pixelsToRem(80)}rem`,
      height: `${pixelsToRem(80)}rem`,
    }),

  listItemInline: () =>
    css({
      display: `inline`,
    }),
};
