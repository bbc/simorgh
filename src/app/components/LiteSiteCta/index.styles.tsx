import { css, Theme } from '@emotion/react';
import pixelsToRem from '../../utilities/pixelsToRem';

export default {
  outerContainer: ({ palette }: Theme) =>
    css({
      backgroundColor: `${palette.WHITE}`,
      borderBottom: `${pixelsToRem(1)}rem solid ${palette.GREY_3}`,
    }),
  container: ({ spacings, mq }: Theme) =>
    css({
      margin: `0 ${spacings.FULL}rem`,
      padding: `${spacings.TRIPLE}rem 0 ${spacings.FULL}rem 0`,
      maxWidth: '63.4rem',
      position: 'relative',
      [mq.GROUP_2_MIN_WIDTH]: {
        margin: `0 ${spacings.DOUBLE}rem`,
      },
      [mq.GROUP_4_MIN_WIDTH]: {
        margin: `0 auto`,
      },
    }),
  chevron: ({ palette, spacings }: Theme) =>
    css({
      color: palette.GREY_10,
      fill: 'currentColor',
      marginInlineStart: `${spacings.HALF}rem`,
      verticalAlign: 'middle',
      width: `${pixelsToRem(14)}rem`,
      height: `${pixelsToRem(14)}rem`,
      'a:visited &': {
        color: palette.METAL,
      },
      'a:focus &, a:hover &': {
        color: palette.POSTBOX,
      },
    }),
  link: () =>
    css({
      display: 'inline-block',
      textDecoration: 'none',
    }),
  bottomLinkSpacing: ({ spacings }: Theme) =>
    css({
      padding: `${spacings.FULL}rem 0 ${spacings.DOUBLE}rem`,
    }),
  topLinkSpacing: ({ spacings }: Theme) =>
    css({
      padding: `${spacings.DOUBLE}rem 0 ${spacings.FULL}rem`,
    }),
  linkText: ({ palette }: Theme) =>
    css({
      borderBottom: `${pixelsToRem(1)}rem solid ${palette.GREY_10}`,
      textDecoration: 'none',
      'a:visited &': {
        color: palette.METAL,
        borderBottom: `${pixelsToRem(1)}rem solid ${palette.METAL}`,
      },
      'a:focus &, a:hover &': {
        borderBottom: `${pixelsToRem(2)}rem solid ${palette.POSTBOX}`,
        color: palette.POSTBOX,
      },
    }),
};
