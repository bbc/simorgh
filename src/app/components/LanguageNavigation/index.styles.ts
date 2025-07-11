import { css, Theme } from '@emotion/react';
import pixelsToRem from '#app/utilities/pixelsToRem';

const styles = {
  wrapper: ({ fontMq, spacings, palette, fontSizes }: Theme) =>
    css({
      display: 'flex',
      color: palette.GREY_8,
      flexWrap: 'wrap',
      padding: 0,
      fontFamily: 'ReithSahs, Arial, Helvetica, sans-serif',
      ...fontSizes.pica,
      borderBottom: `${pixelsToRem(1)}rem solid ${palette.GREY_3}`,
      [fontMq.GROUP_D_MIN_WIDTH]: {
        padding: `${spacings.FULL}rem`,
      },
    }),

  navItem: ({
    isActive,
    isLast,
    palette,
  }: { isActive?: boolean; isLast?: boolean } & Theme) =>
    css({
      display: 'flex',
      alignItems: 'center',
      padding: 0,
      position: 'relative',
      borderBottom: isActive
        ? `${pixelsToRem(4)}rem solid #b80000`
        : `${pixelsToRem(4)}rem solid transparent`,
      '&:hover, &:focus-within': {
        borderBottom: `${pixelsToRem(4)}rem solid #b80000`,
        outline: 'none',
        cursor: 'pointer',
      },
      '&::after': {
        content: '""',
        display: isLast ? 'none' : 'block',
        position: 'absolute',
        right: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        width: `${pixelsToRem(1)}rem`,
        height: `${pixelsToRem(20)}rem`,
        backgroundColor: palette.GREY_10,
      },
    }),

  navLink: ({ spacings, palette, fontSizes }: Theme) =>
    css({
      textDecoration: 'none',
      color: palette.GREY_8,
      fontFamily: 'BBC Reith Sans',
      fontWeight: 400,
      ...fontSizes.pica,
      lineHeight: `${pixelsToRem(22)}rem`,
      letterSpacing: '0%',
      padding: `${pixelsToRem(12)}rem ${spacings.FULL}rem`,
      width: '100%',
      display: 'block',
    }),

  navSummary: ({ spacings, fontSizes }: Theme) =>
    css({
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      padding: `${pixelsToRem(12)}rem ${spacings.FULL}rem`,
      cursor: 'pointer',
      listStyle: 'none',
      border: 'none',
      background: 'none',
      fontFamily: 'BBC Reith Sans',
      fontWeight: 400,
      ...fontSizes.pica,
      lineHeight: `${pixelsToRem(22)}rem`,
      letterSpacing: '0%',
      '&::marker': {
        display: 'none',
      },
    }),

  dropDown: ({ spacings }: Theme) =>
    css({
      width: '100%',
      padding: `${spacings.FULL}rem 0`,
    }),

  dropDownHeader: css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }),

  dropDownTitle: css({
    fontSize: `${pixelsToRem(20)}rem`,
    fontFamily: 'BBC Reith Sans',
    fontWeight: 700,
    lineHeight: `${pixelsToRem(22)}rem`,
    letterSpacing: '0%',
    padding: `${pixelsToRem(12)}rem`,
  }),

  closeButton: ({ palette }: Theme) =>
    css({
      border: 'none',
      background: 'none',
      padding: 0,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: `${pixelsToRem(22)}rem`,
      height: `${pixelsToRem(22)}rem`,
      color: palette.BLACK,
    }),

  dropDownItemsGrid: ({ mq, spacings }: Theme) =>
    css({
      display: 'block',
      gap: `${spacings.FULL}rem`,
      [mq.GROUP_4_MIN_WIDTH]: {
        columnCount: 4,
        columnGap: `${spacings.FULL}rem`,
      },
    }),

  dropDownItem: ({ mq, palette }: Theme) =>
    css({
      breakInside: 'avoid',
      padding: 0,
      borderBottom: `${pixelsToRem(1)}rem solid ${palette.GREY_3}`,
      width: '100%',
      '&:hover, &:focus-within, &.active': {
        borderLeft: `${pixelsToRem(4)}rem solid #b80000`,

        outline: 'none',
        backgroundColor: palette.GREY_3,
      },
      [mq.GROUP_4_MIN_WIDTH]: {
        display: 'inline-block',
        borderBottom: 'none',
      },
    }),

  dropDownLink: ({ spacings, palette }: Theme) =>
    css({
      display: 'inline-block',
      width: 'auto',
      height: '100%',
      padding: `${pixelsToRem(12)}rem ${spacings.FULL}rem`,
      textDecoration: 'none',
      color: palette.GREY_8,
      fontFamily: 'BBC Reith Sans',
      fontWeight: 400,
      lineHeight: `${pixelsToRem(22)}`,
      letterSpacing: '0%',
    }),
};

export default styles;
