import { css, Theme } from '@emotion/react';
import pixelsToRem from '#app/utilities/pixelsToRem';

const styles = {
  navList: ({ palette }: Theme) =>
    css({
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
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

  navItem: ({ palette }: Theme) =>
    css({
      display: 'inline-block',
      padding: 0,
      position: 'relative',
      zIndex: 0,
      width: 'auto',
      flexShrink: 0,

      '&::before': {
        content: '""',
        position: 'absolute',
        bottom: `${pixelsToRem(-1)}rem`,
        width: '180rem',
        borderBottom: `${pixelsToRem(1)}rem solid ${palette.GREY_3}`,
        zIndex: `-1`,
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
      '&:last-of-type::after': {
        background: 'none',
      },
    }),

  navLinkActive: ({ palette }: Theme) =>
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
  navLink: ({ spacings, fontSizes, fontVariants, palette }: Theme) =>
    css({
      display: 'inline-block',
      width: '100%',
      padding: `${pixelsToRem(12)}rem ${spacings.FULL}rem`,
      cursor: 'pointer',
      ...fontSizes.pica,
      ...fontVariants.sansRegular,
      left: `${pixelsToRem(1)}rem`,
      position: 'relative',
      letterSpacing: '0',
      fontStyle: 'normal',
      outline: 'none',
      textDecoration: 'none',
      color: palette.GREY_8,
      '&:hover::after, &:focus::after': {
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

  subNav: ({ spacings }: Theme) =>
    css({
      order: 1,
      width: '100%',
      flexBasis: '100%',
      padding: `${spacings.FULL}rem 0`,
      display: 'block',
    }),
  subNavNoJs: css({
    display: 'none',
    '&:target': {
      display: 'block',
    },
  }),

  subNavHeader: css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }),

  subNavTitle: ({ spacings, fontSizes }: Theme) =>
    css({
      ...fontSizes.doublePica,
      padding: `${spacings.FULL}rem`,
    }),

  subNavCloseButton: ({ palette }: Theme) =>
    css({
      border: 'none',
      background: 'none',
      padding: 0,
      marginRight: `${pixelsToRem(12)}rem`,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: `${pixelsToRem(22)}rem`,
      height: `${pixelsToRem(22)}rem`,
      color: palette.BLACK,
      '&:hover, &:focus': {
        outline: `${pixelsToRem(3)}rem solid ${palette.BLACK}`,
        outlineOffset: `${pixelsToRem(3)}rem`,
        backgroundColor: palette.POSTBOX,
        fill: palette.WHITE,
        color: palette.WHITE,
      },
    }),

  subNavCloseButtonIcon: ({ mq }: Theme) =>
    css({
      fill: 'currentColor',
      [mq.FORCED_COLOURS]: {
        fill: 'linkText',
      },
      width: `${pixelsToRem(22)}rem`,
      height: `${pixelsToRem(22)}rem`,
    }),

  subNavGrid: ({ mq, spacings, palette }: Theme) =>
    css({
      display: 'block',
      gap: `${spacings.FULL}rem`,
      listStyle: 'none',
      padding: 0,
      margin: 0,
      [mq.GROUP_4_MIN_WIDTH]: {
        columnCount: 4,
        columnGap: `${spacings.DOUBLE}rem`,
        columnRule: `${pixelsToRem(1)}rem solid ${palette.GREY_3}`,
      },
    }),

  subNavItem: ({ mq, palette }: Theme) =>
    css({
      breakInside: 'avoid',
      padding: 0,
      borderBottom: `${pixelsToRem(1)}rem solid ${palette.GREY_3}`,
      width: '100%',
      position: 'relative',
      [mq.GROUP_4_MIN_WIDTH]: {
        display: 'inline-block',
        borderBottom: 'none',
      },
      ':last-of-type': {
        borderBottom: 'none',
      },
    }),

  subNavLink: ({ spacings, palette, fontVariants }: Theme) =>
    css({
      display: 'inline-block',
      width: '100%',
      height: '100%',
      padding: `${pixelsToRem(12)}rem ${spacings.FULL}rem`,
      textDecoration: 'none',
      color: palette.GREY_8,
      ...fontVariants.sansRegular,
      letterSpacing: '0',
      '&:hover, &:focus': {
        backgroundColor: palette.GREY_3,
      },
      '&:hover::after ,&:focus::after': {
        content: '""',
      },
      '&::after': {
        content: 'none',
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: `${pixelsToRem(4)}rem`,
        height: '100%',
        backgroundColor: palette.POSTBOX,
      },
      '&:focus-visible::after': {
        content: 'none',
      },
      '&:focus-visible': {
        boxShadow: `inset 0 0 0 ${pixelsToRem(4)}rem ${palette.WHITE}`,
        outline: `${pixelsToRem(2)}rem solid ${palette.BLACK}`,
        outlineOffset: `${pixelsToRem(-2)}rem`,
        backgroundColor: palette.WHITE,
      },
    }),
};

export default styles;
