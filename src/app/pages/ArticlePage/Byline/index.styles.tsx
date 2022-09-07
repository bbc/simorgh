import { css, Theme } from '@emotion/react';

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
      fill: `currentcolor`,
      width: `${spacings.FULL}rem`,
      height: `${spacings.FULL}rem`,
      [mq.HIGH_CONTRAST]: { fill: 'linkText' },
    }),

  lineBreak: ({ palette, spacings }: Theme) =>
    css({
      borderColor: palette.GREY_5,
      width: `${40 / 16}rem`,
      margin: `${spacings.DOUBLE}rem 0`,
    }),

  link: () =>
    css({
      display: 'inline-block',
      textDecoration: 'none',
      paddingRight: '2.75rem',
      '&:focus, &:hover': {
        span: {
          textDecoration: 'underline',
        },
      },
    }),

  location: ({ palette }: Theme) =>
    css({
      color: palette.SHADOW,
    }),

  reportingFrom: ({ palette }: Theme) =>
    css({
      color: palette.SHADOW,
    }),

  get authorLink() {
    return css([this.link(), { paddingTop: '1.375rem' }]);
  },

  get twitterLink() {
    return css([this.link(), { paddingBottom: '1.6rem' }]);
  },
};
