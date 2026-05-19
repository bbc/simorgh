import { css, type Theme } from '@emotion/react';
import pixelsToRem from '../../../utilities/pixelsToRem';

export default {
  list: () => css({ listStyle: 'none', padding: 0, margin: 0 }),

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
    css({
      color: isDarkUi ? palette.GREY_2 : palette.GREY_6,
      '&::after': {
        content: '", "',
      },

      '[dir="rtl"] &::after': {
        content: '"، "',
      },
    }),

  and: ({ palette, isDarkUi }: Theme) =>
    css({ color: isDarkUi ? palette.GREY_2 : palette.GREY_6 }),

  authorChevron: ({ palette, isDarkUi, spacings, mq }: Theme) =>
    css({
      verticalAlign: 'middle',
      margin: `0 ${spacings.HALF}rem`,
      color: isDarkUi ? palette.GREY_2 : palette.GREY_10,
      fill: 'currentcolor',
      width: `${pixelsToRem(10)}rem`,
      height: `${pixelsToRem(10)}rem`,
      [mq.FORCED_COLOURS]: { fill: 'linkText' },
    }),

  link: ({ mq, palette }: Theme) =>
    css({
      display: 'inline-block',
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

  linkMultipleContributor: ({ palette }: Theme) =>
    css({
      '.byline-link': {
        textDecoration: 'underline',
        textDecorationThickness: `${pixelsToRem(1)}rem`,
        textUnderlineOffset: `${pixelsToRem(4)}rem`,
        textDecorationColor: palette.GREY_5,
        '&:focus, &:hover': {
          textDecorationColor: palette.POSTBOX,
          textDecorationThickness: `${pixelsToRem(2)}rem`,
        },
      },
    }),

  linkSingleContributor: () =>
    css({
      paddingInlineEnd: '2.75rem',
      textDecoration: 'none',
      '&:focus, &:hover': {
        '.byline-link': {
          textDecoration: 'underline',
          textDecorationColor: 'currentcolor',
          textDecorationThickness: `${pixelsToRem(2)}rem`,
          textUnderlineOffset: `${pixelsToRem(4)}rem`,
        },
      },
    }),

  locationText: ({ palette, isDarkUi }: Theme) =>
    css({
      color: isDarkUi ? palette.GREY_2 : palette.GREY_6,
    }),

  imageWrapper: ({ palette }: Theme) =>
    css({
      display: 'inline-flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      width: `${pixelsToRem(80)}rem`,
      height: `${pixelsToRem(60)}rem`,
      backgroundColor: `${palette.GREY_7}`,
      overflow: 'visible',
      float: 'inline-start',
      marginTop: `${pixelsToRem(25)}rem`,
      marginBottom: `${pixelsToRem(16)}rem`,
      marginInlineEnd: `${pixelsToRem(8)}rem`,
      marginInlineStart: '0px',
      writingMode: 'horizontal-tb',
    }),

  imageSrc: () =>
    css({
      width: `${pixelsToRem(80)}rem`,
      height: `${pixelsToRem(80)}rem`,
    }),

  contributorTextWrapper: () =>
    css({
      display: `inline`,
    }),
};
