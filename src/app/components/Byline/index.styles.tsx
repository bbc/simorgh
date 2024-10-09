import { css, Theme } from '@emotion/react';
import pixelsToRem from '../../utilities/pixelsToRem';

export default {
  bylineSection: ({ spacings, mq }: Theme) =>
    css({
      paddingInlineStart: `${spacings.FULL}rem`,
      [mq.GROUP_2_MIN_WIDTH]: { paddingInlineStart: `${spacings.DOUBLE}rem` },
      [mq.GROUP_4_MIN_WIDTH]: { paddingInlineStart: 0 },
      div: { padding: 0 },
    }),

  bylineList: () => css({ listStyle: 'none', padding: 0, margin: 0 }),

  author: ({ palette, isDarkUi }: Theme) =>
    css({
      color: isDarkUi ? palette.GREY_2 : palette.GREY_10,
      display: 'inline-block',
      verticalAlign: 'middle',
    }),

  jobRole: ({ palette, isDarkUi }: Theme) =>
    css({ color: isDarkUi ? palette.GREY_2 : palette.GREY_6 }),

  twitterText: ({ palette }: Theme) =>
    css({
      color: palette.POSTBOX,
      display: 'inline-block',
      verticalAlign: 'middle',
    }),

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

  twitterChevron: ({ palette, spacings, mq }: Theme) =>
    css({
      verticalAlign: 'middle',
      margin: `0 ${spacings.HALF}rem`,
      color: palette.POSTBOX,
      fill: 'currentcolor',
      width: `${spacings.FULL}rem`,
      height: `${spacings.FULL}rem`,
      [mq.FORCED_COLOURS]: { fill: 'linkText' },
    }),

  link: ({ mq }: Theme) =>
    css({
      display: 'inline-block',
      textDecoration: 'none',
      paddingInlineEnd: '2.75rem',
      '&:focus, &:hover': {
        '.byline__link-text': {
          textDecoration: 'underline',
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

  location: () =>
    css({
      margin: '0',
      display: 'block',
      clear: 'both',
    }),

  locationText: ({ palette, isDarkUi }: Theme) =>
    css({
      color: isDarkUi ? palette.GREY_2 : palette.SHADOW,
      display: 'block',
      paddingTop: ` ${pixelsToRem(4)}rem`,
    }),

  reportingFromText: ({ palette, isDarkUi }: Theme) =>
    css({
      color: isDarkUi ? palette.GREY_2 : palette.SHADOW,
    }),

  timestampLineBreak: ({ palette, spacings }: Theme) =>
    css({
      '::before': {
        content: '""',
        borderTop: `${pixelsToRem(2)}rem solid ${palette.GREY_5}`,
        width: `${pixelsToRem(40)}rem`,
        display: 'block',
        margin: `${spacings.DOUBLE}rem 0`,
      },
    }),

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

  authorLink: () =>
    css({
      paddingTop: '1.375rem',
      paddingBottom: `${pixelsToRem(4)}rem`,
      paddingInlineEnd: '2.75rem',
    }),

  twitterLink: () =>
    css({
      paddingBottom: `${pixelsToRem(22)}rem`,
      paddingTop: `${pixelsToRem(4)}rem`,
    }),
};
