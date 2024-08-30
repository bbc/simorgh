import { css, Theme } from '@emotion/react';
import pixelsToRem from '#app/utilities/pixelsToRem';
import { focusIndicatorThickness } from '../ThemeProvider/focusIndicator';

export default {
  arrowShape: ({ palette, isDarkUi }: Theme) =>
    css({
      background: isDarkUi ? palette.WHITE : palette.GREY_10,
      display: 'inline-block',
      width: `${pixelsToRem(3)}rem `,
      position: 'relative',
      height: `${pixelsToRem(12)}rem`,
      '&::before': {
        borderLeft: `${pixelsToRem(6)}rem  solid currentColor`,
        borderTop: `${pixelsToRem(6)}rem solid transparent`,
        borderBottom: `${pixelsToRem(6)}rem solid transparent`,
        content: '""',
        height: 0,
        position: 'absolute',
        right: `-${pixelsToRem(6)}rem `,
      },
    }),

  arrowContainer: ({ spacings }: Theme) =>
    css({
      display: 'inline-block',
      marginInlineEnd: `${spacings.DOUBLE}rem`,
    }),

  details: ({ spacings, palette, isDarkUi }: Theme) =>
    css({
      backgroundColor: isDarkUi ? palette.GREY_7 : palette.WHITE,
      display: 'block',
      marginBottom: `${spacings.TRIPLE}rem`,
      border: `solid ${pixelsToRem(3)}rem transparent`,
      // rotates and overrides spacing when details is open
      '&[open] summary #arrowContainer': {
        transform: 'rotate(90deg)',
        marginInlineEnd: `${spacings.FULL}rem`,
        paddingRight: `${spacings.FULL}rem`,
      },
    }),

  summary: ({ spacings, palette }: Theme) =>
    css({
      listStyle: 'none',
      padding: `${spacings.DOUBLE}rem`,
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
      paddingLeft: `${spacings.HALF}rem`,
    }),

  disclaimer: ({ palette, isDarkUi, spacings, mq }: Theme) =>
    css({
      color: isDarkUi ? palette.GREY_3 : palette.GREY_6,
      display: 'block',
      paddingBottom: `${spacings.DOUBLE}rem`,
      paddingInlineStart: `${spacings.DOUBLE}rem`,
      [mq.GROUP_1_MIN_WIDTH]: {
        paddingInlineStart: `${spacings.TRIPLE}rem`,
      },
    }),

  ul: ({ spacings, mq }: Theme) =>
    css({
      padding: `0 ${spacings.DOUBLE}rem`,
      listStyle: 'none',
      margin: '0',
      [mq.GROUP_1_MIN_WIDTH]: {
        padding: `0 ${spacings.TRIPLE}rem`,
      },
    }),

  transcriptText: ({ palette, isDarkUi }: Theme) =>
    css({
      color: isDarkUi ? palette.GREY_3 : palette.GREY_6,
    }),

  itemText: ({ spacings, mq }: Theme) =>
    css({
      float: 'left',
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
};
