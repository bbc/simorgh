import { css, Theme } from '@emotion/react';
import pixelsToRem from '#app/utilities/pixelsToRem';
import { GROUP_B_MIN_WIDTH } from '#app/components/ThemeProvider/fontMediaQueries';
import { MAX_NAV_ITEM_HEIGHT } from '../index.styles';

export default {
  dropdown: ({ palette, mq }: Theme) =>
    css({
      backgroundColor: palette.WHITE,
      clear: 'both',
      overflow: 'hidden',
      height: 0,
      transition: 'all 0.2s ease-out',
      transitionTimingFunction: 'cubic-bezier(0, 0, 0.58, 1)',
      visibility: 'hidden',
      [mq.GROUP_3_MIN_WIDTH]: {
        display: 'none',
        visibility: 'hidden',
      },
      '@media (prefers-reduced-motion: reduce)': {
        transition: 'none',
      },
    }),

  dropdownOpen: css({
    visibility: 'visible',
  }),

  ampDropdown: ({ palette, mq }: Theme) =>
    css({
      backgroundColor: palette.WHITE,
      clear: 'both',
      [mq.GROUP_3_MIN_WIDTH]: {
        display: 'none',
        visibility: 'hidden',
      },
    }),

  dropdownList: css({
    listStyleType: 'none',
    margin: 0,
    padding: 0,
  }),

  dropdownListItem: ({ palette }: Theme) =>
    css({
      padding: 0,
      borderBottom: `${pixelsToRem(1)}rem solid ${palette.GREY_3}`,
      '&:last-child': {
        border: 0,
      },
    }),

  // Visual defaults for legacy nav services.
  // The new-nav container's `dropdown` descendant styles override display, padding and hover.
  dropdownLink: ({ palette, fontSizes, fontVariants }: Theme) =>
    css({
      ...fontSizes.pica,
      ...fontVariants.sansRegular,
      color: palette.GREY_10,
      textDecoration: 'none',
      padding: '0.75rem 0',
      display: 'inline-block',
      '&:hover, &:focus': {
        textDecoration: 'underline',
        textDecorationColor: palette.POSTBOX,
      },
    }),

  // Active link indicator: inline-start border + padding for the current page item
  currentLink: ({ palette, spacings }: Theme) =>
    css({
      borderInlineStart: `${pixelsToRem(4)}rem solid ${palette.POSTBOX}`,
      paddingInlineStart: `${spacings.FULL}rem`,
    }),

  menuButton: ({ palette, mq }: Theme) =>
    css({
      position: 'relative',
      padding: 0,
      margin: 0,
      border: 0,
      float: 'inline-start',
      backgroundColor: palette.POSTBOX,
      color: palette.WHITE,
      width: `${pixelsToRem(MAX_NAV_ITEM_HEIGHT)}rem`,
      height: `${pixelsToRem(MAX_NAV_ITEM_HEIGHT)}rem`,
      [mq.GROUP_3_MIN_WIDTH]: {
        display: 'none',
        visibility: 'hidden',
      },
      [GROUP_B_MIN_WIDTH]: {
        width: `${pixelsToRem(MAX_NAV_ITEM_HEIGHT)}rem`,
        height: `${pixelsToRem(MAX_NAV_ITEM_HEIGHT)}rem`,
      },
      svg: {
        verticalAlign: 'middle',
        fill: palette.WHITE,
      },
      '&:hover, &:focus': {
        cursor: 'pointer',
        boxShadow: `inset 0 0 0 ${pixelsToRem(4)}rem ${palette.WHITE}`,
        '&::after': {
          content: "''",
          position: 'absolute',
          inset: 0,
          border: `${pixelsToRem(4)}rem solid ${palette.BLACK}`,
        },
      },
    }),
};
