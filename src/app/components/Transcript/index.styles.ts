import { css, Theme } from '@emotion/react';
import pixelsToRem from '#app/utilities/pixelsToRem';
import { focusIndicatorThickness } from '../ThemeProvider/focusIndicator';

export default {
  details: ({ spacings, palette, isDarkUi }: Theme) =>
    css({
      backgroundColor: isDarkUi ? palette.GREY_7 : palette.WHITE,
      display: 'block',
      border: `solid ${pixelsToRem(3)}rem transparent`,
      'summary svg': {
        color: isDarkUi ? palette.WHITE : palette.GREY_10,
        fill: 'currentcolor',
        width: `${spacings.DOUBLE}rem`,
        height: `${spacings.DOUBLE}rem`,
        verticalAlign: 'text-top',
      },
      '&[open] summary svg': {
        transform: 'rotate(90deg)',
      },
    }),

  summary: ({ spacings, palette }: Theme) =>
    css({
      listStyle: 'none',
      // hides on safari
      '&::-webkit-details-marker': {
        display: 'none',
      },
      padding: `${spacings.DOUBLE}rem ${spacings.HALF}rem`,

      '&:hover, &:focus': {
        cursor: 'pointer',
        span: {
          textDecoration: 'underline',
        },
      },
      '&:focus-visible': {
        outline: `${focusIndicatorThickness} solid ${palette.BLACK}`,
        outlineOffset: `-${pixelsToRem(6)}rem`,
      },
    }),

  summaryTitle: ({ palette, isDarkUi, spacings }: Theme) =>
    css({
      color: isDarkUi ? palette.WHITE : palette.GREY_10,
      paddingInlineStart: `${spacings.HALF}rem`,
    }),

  ul: ({ spacings }: Theme) =>
    css({
      padding: `0 ${spacings.FULL}rem`,
      listStyle: 'none',
      margin: '0',
    }),

  transcriptText: ({ palette, isDarkUi }: Theme) =>
    css({
      color: isDarkUi ? palette.GREY_3 : palette.GREY_6,
    }),

  itemText: ({ spacings, mq }: Theme) =>
    css({
      float: 'inline-start',
      width: `100%`,
      [mq.GROUP_1_MIN_WIDTH]: {
        paddingInlineStart: `${spacings.FULL}rem`,
        width: `calc(75% - ${spacings.FULL}rem)`,
      },
      [mq.GROUP_2_MIN_WIDTH]: {
        width: `calc(85% - ${spacings.FULL}rem)`,
      },
      [mq.GROUP_3_MIN_WIDTH]: {
        paddingInlineStart: `${spacings.DOUBLE}rem`,
        width: `calc(90% - ${spacings.DOUBLE}rem)`,
      },
    }),

  listItem: ({ spacings }: Theme) =>
    css({
      paddingBottom: `${spacings.DOUBLE}rem`,
      '::after': {
        content: '""',
        display: 'block',
        clear: 'both',
      },
    }),

  disclaimer: ({ palette, isDarkUi, spacings }: Theme) =>
    css({
      color: isDarkUi ? palette.GREY_3 : palette.GREY_6,
      display: 'block',
      paddingBottom: `${spacings.DOUBLE}rem`,
      paddingInline: `${spacings.FULL}rem`,
    }),
};
