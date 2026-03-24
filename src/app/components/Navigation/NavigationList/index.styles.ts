import { css, Theme } from '@emotion/react';
import pixelsToRem from '#app/utilities/pixelsToRem';

export default {
  list: ({ mq }: Theme) =>
    css({
      listStyleType: 'none',
      padding: 0,
      margin: 0,
      position: 'relative',
      [mq.GROUP_3_MIN_WIDTH]: {
        overflow: 'hidden',
      },
    }),

  listItem: ({ palette, mq }: Theme) =>
    css({
      display: 'inline-block',
      position: 'relative',
      zIndex: 2,
      marginInlineEnd: 0,
      [mq.GROUP_3_MIN_WIDTH]: {
        // Trick to display a border between list items when they break into
        // multiple lines, which takes the full width
        '&::after': {
          content: "''",
          position: 'absolute',
          bottom: '-1px',
          width: '63.5rem',
          borderBottom: `${pixelsToRem(1)}rem solid ${palette.GREY_3}`,
          zIndex: -1,
        },
      },
    }),

  // Visual defaults for all services. The new-nav container's topRowItems/bottomRowItems
  // descendant styles (higher CSS specificity) override these for POSTBOX-background rows.
  link: ({ palette, fontSizes, fontVariants, mq }: Theme) =>
    css({
      ...fontSizes.pica,
      ...fontVariants.sansRegular,
      color: palette.GREY_10,
      cursor: 'pointer',
      textDecoration: 'none',
      display: 'inline-block',
      padding: '0.75rem 0.25rem',
      outline: 'none',
      [mq.GROUP_2_MAX_WIDTH]: {
        padding: `0.75rem ${pixelsToRem(8)}rem`,
      },
      '&:hover::after': {
        content: "''",
        position: 'absolute',
        insetInlineStart: 0,
        insetInlineEnd: 0,
        bottom: 0,
        borderBottom: `${pixelsToRem(4)}rem solid ${palette.POSTBOX}`,
      },
      '&:focus::after, &:focus-visible::after': {
        content: "''",
        position: 'absolute',
        inset: 0,
        border: `${pixelsToRem(3)}rem solid ${palette.BLACK}`,
      },
    }),

  // Provides the underline indicator for the active current-page link.
  // Color is overridden by container styles (e.g. topRowItems sets WHITE for POSTBOX backgrounds).
  currentLinkSpan: ({ palette }: Theme) =>
    css({
      '&::after': {
        content: "''",
        position: 'absolute',
        insetInlineStart: 0,
        insetInlineEnd: 0,
        bottom: 0,
        borderBottom: `${pixelsToRem(4)}rem solid ${palette.POSTBOX}`,
      },
    }),
};
