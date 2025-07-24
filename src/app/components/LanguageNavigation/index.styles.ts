import { css, Theme } from '@emotion/react';
import pixelsToRem from '#app/utilities/pixelsToRem';

const styles = {
  collapsibleNavSections: ({ palette }: Theme) =>
    css({
      listStyleType: 'none',
      padding: 0,
      margin: 0,
      position: 'relative',
      overflow: 'hidden',
      width: '100%',
      paddingBottom: `${pixelsToRem(1)}rem`,
      '&:focus': {
        outline: `${pixelsToRem(3)}rem solid ${palette.BLACK}`,
      },
    }),

  collapsibleNavItem: ({ palette }: Theme) =>
    css({
      display: 'inline-block',
      padding: 0,
      position: 'relative',
      zIndex: 0,
      '&::before': {
        content: '""',
        position: 'absolute',
        bottom: `${pixelsToRem(-1)}rem`,
        width: '180rem',
        borderBottom: `${pixelsToRem(1)}rem solid ${palette.GREY_3}`,
        zIndex: `${pixelsToRem(-1)}rem`,
      },
      '&::after': {
        content: '""',
        display: 'block',
        position: 'absolute',
        right: `${pixelsToRem(-2)}rem`,
        top: '50%',
        transform: 'translateY(-50%)',
        width: `${pixelsToRem(1)}rem`,
        height: `${pixelsToRem(20)}rem`,
        backgroundColor: palette.GREY_10,
      },
      '&:last-child::after': {
        background: 'none',
      },
    }),

  collapsibleNavLinkActive: ({ palette }: Theme) =>
    css({
      '&::after': {
        content: '""',
        position: 'absolute',
        left: 0,
        right: `${pixelsToRem(-1)}rem`,
        bottom: 0,
        borderBottom: `${pixelsToRem(4)}rem solid ${palette.POSTBOX}`,
      },
    }),
  collapsibleNavLink: ({ spacings, fontSizes, fontVariants, palette }: Theme) =>
    css({
      display: 'inline-block',
      width: '100%',
      padding: `${pixelsToRem(12)}rem ${spacings.FULL}rem`,
      cursor: 'pointer',
      ...fontSizes.pica,
      ...fontVariants.sansRegular,
      fontWeight: 400,
      lineHeight: `${pixelsToRem(22)}rem`,
      left: `${pixelsToRem(1)}rem`,
      position: 'relative',
      letterSpacing: '0%',
      fontStyle: 'normal',
      outline: 'none',
      textDecoration: 'none',
      color: palette.GREY_8,
      '&:hover::after': {
        content: '""',
        position: 'absolute',
        left: 0,
        right: `${pixelsToRem(-1)}rem`,
        bottom: 0,
        borderBottom: `${pixelsToRem(4)}rem solid ${palette.POSTBOX}`,
      },
      '&:focus-visible::after': {
        content: '""',
        position: 'absolute',
        left: `${pixelsToRem(1)}rem`,
        right: 0,
        bottom: 0,
        borderBottom: `${pixelsToRem(4)}rem solid ${palette.POSTBOX}`,
        top: 0,
        border: `${pixelsToRem(3)}rem solid ${palette.BLACK}`,
      },
    }),

  collapsibleSubNav: ({ spacings }: Theme) =>
    css({
      width: '100%',
      padding: `${spacings.FULL}rem 0`,
      display: 'block',
    }),

  collapsibleSubNavNoJs: ({ spacings }: Theme) =>
    css({
      width: '100%',
      padding: `${spacings.FULL}rem 0`,
      display: 'none',
      '&:target': {
        display: 'block',
      },
    }),

  collapsibleSubNavHeader: css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }),

  collapsibleSubNavTitle: ({ fontVariants }: Theme) =>
    css({
      fontSize: `${pixelsToRem(20)}rem`,
      ...fontVariants.sansBold,
      fontWeight: 700,
      lineHeight: `${pixelsToRem(22)}rem`,
      letterSpacing: '0%',
      padding: `${pixelsToRem(12)}rem`,
    }),

  collapsibleSubNavCloseButton: ({ palette }: Theme) =>
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

  collapsibleSubNavGrid: ({ mq, spacings }: Theme) =>
    css({
      display: 'block',
      gap: `${spacings.FULL}rem`,
      listStyle: 'none',
      padding: 0,
      margin: 0,
      [mq.GROUP_4_MIN_WIDTH]: {
        columnCount: 4,
        columnGap: `${spacings.DOUBLE}rem`,
        columnRule: '0.0625rem solid #E6E8EA',
      },
    }),

  collapsibleSubNavItem: ({ mq, palette }: Theme) =>
    css({
      breakInside: 'avoid',
      padding: 0,
      borderLeft: `${pixelsToRem(4)}rem solid transparent`,
      borderBottom: `${pixelsToRem(1)}rem solid ${palette.GREY_3}`,
      width: '100%',
      '&:hover': {
        borderLeft: `${pixelsToRem(4)}rem solid ${palette.POSTBOX}`,
        outline: 'none',
        backgroundColor: palette.GREY_3,
      },
      [mq.GROUP_4_MIN_WIDTH]: {
        display: 'inline-block',
        borderBottom: 'none',
      },
    }),

  collapsibleSubNavLink: ({ spacings, palette, fontVariants }: Theme) =>
    css({
      display: 'inline-block',
      width: '100%',
      height: '100%',
      padding: `${pixelsToRem(12)}rem ${spacings.FULL}rem`,
      textDecoration: 'none',
      color: palette.GREY_8,
      ...fontVariants.sansRegular,
      fontWeight: 400,
      lineHeight: `${pixelsToRem(22)}`,
      letterSpacing: '0%',
    }),
};

export default styles;
