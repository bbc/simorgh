import { css, Theme } from '@emotion/react';

const link = css({
  textDecoration: 'none',
  position: 'relative',
  zIndex: 1,
  paddingRight: '2.75rem',
});

export default {
  bylineSection: ({ spacings, mq }: Theme) =>
    css({
      paddingInlineStart: `${spacings.FULL}rem`,
      [mq.GROUP_2_MIN_WIDTH]: { paddingInlineStart: `${spacings.DOUBLE}rem` },
      [mq.GROUP_4_MIN_WIDTH]: { paddingInlineStart: 0 },
      div: { padding: 0 },
    }),

  bylineList: () => css({ listStyle: 'none', padding: 0 }),

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

      '&:hover, &:focus': {
        textDecoration: 'underline',
      },
    }),

  authorChevron: ({ palette, spacings }: Theme) =>
    css({
      verticalAlign: 'middle',
      margin: `0 ${spacings.HALF}rem`,
      color: palette.GREY_10,
      fill: `currentcolor`,
    }),

  twitterChevron: ({ palette, spacings }: Theme) =>
    css({
      verticalAlign: 'middle',
      margin: `0 ${spacings.HALF}rem`,
      color: palette.POSTBOX,
      fill: `currentcolor`,
      width: `${spacings.FULL}rem`,
      height: `${spacings.FULL}rem`,
    }),

  lineBreak: ({ palette, spacings }: Theme) =>
    css({
      borderColor: palette.GREY_5,
      width: `${40 / 16}rem`,
      margin: `${spacings.DOUBLE}rem 0`,
    }),

  location: ({ palette }: Theme) =>
    css({
      color: palette.SHADOW,
    }),

  reportingFrom: ({ palette }: Theme) =>
    css({
      color: palette.SHADOW,
    }),

  authorLink: () => css([link, { paddingTop: '1.375rem' }]),
  twitterLink: () => css([link, { paddingBottom: '1.75rem' }]),
};
