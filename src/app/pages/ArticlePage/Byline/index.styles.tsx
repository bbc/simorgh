import { css, Theme } from '@emotion/react';
import pixelsToRem from '../../../utilities/pixelsToRem';

export default {
  bylineSection: ({ spacings, mq }: Theme) =>
    css({
      paddingInlineStart: `${spacings.FULL}rem`,
      [mq.GROUP_2_MIN_WIDTH]: { paddingInlineStart: `${spacings.DOUBLE}rem` },
      [mq.GROUP_4_MIN_WIDTH]: { paddingInlineStart: 0 },
      div: { padding: 0 },
    }),

  bylineList: () => css({ listStyle: 'none', padding: 0, margin: 0 }),

  author: ({ palette }: Theme) =>
    css({
      color: palette.GREY_10,
      display: 'inline-block',
      verticalAlign: 'middle',
    }),

  jobRole: ({ palette }: Theme) => css({ color: palette.GREY_10 }),

  twitterText: ({ palette }: Theme) =>
    css({
      color: palette.POSTBOX,
      display: 'inline-block',
      verticalAlign: 'middle',
    }),

  authorChevron: ({ palette, spacings, mq }: Theme) =>
    css({
      verticalAlign: 'middle',
      margin: `0 ${spacings.HALF}rem`,
      color: palette.GREY_10,
      fill: 'currentcolor',
      width: `${spacings.FULL + spacings.HALF}rem`,
      height: `${spacings.FULL + spacings.HALF}rem`,
      [mq.HIGH_CONTRAST]: { fill: 'linkText' },
    }),

  twitterChevron: ({ palette, spacings, mq }: Theme) =>
    css({
      verticalAlign: 'middle',
      margin: `0 ${spacings.HALF}rem`,
      color: palette.POSTBOX,
      fill: 'currentcolor',
      width: `${spacings.FULL}rem`,
      height: `${spacings.FULL}rem`,
      [mq.HIGH_CONTRAST]: { fill: 'linkText' },
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
      [mq.HIGH_CONTRAST]: {
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

  locationText: ({ palette }: Theme) =>
    css({
      color: palette.SHADOW,
      display: 'block',
    }),

  reportingFromText: ({ palette }: Theme) =>
    css({
      color: palette.SHADOW,
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

  Image: () =>
    css({
      display: 'block',
      width: `${pixelsToRem(80)}rem`,
      height: `${pixelsToRem(80)}rem`,
      border: `solid ${pixelsToRem(1)}rem #979797`,
      backgroundColor: '#d8d8d8',
      overflow: 'hidden',
    }),

  imageLtr: () =>
    css([
      { ...Image },
      {
        float: 'left',
        margin: `${pixelsToRem(25)}rem ${pixelsToRem(8)}rem ${pixelsToRem(
          16,
        )}rem 0px`,
      },
    ]),

  imageRtl: () =>
    css([
      { ...Image },
      {
        float: 'right',
        margin: `${pixelsToRem(25)}rem 0px ${pixelsToRem(16)}rem ${pixelsToRem(
          8,
        )}rem`,
      },
    ]),

  imageSource: () =>
    css({
      maxWidth: '100%',
      height: 'auto',
    }),

  authorLink: () => css({ paddingTop: '1.375rem' }),

  twitterLink: () => css({ paddingBottom: '1.6rem' }),
};
