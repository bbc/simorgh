import { css, Theme } from '@emotion/react';
import pixelsToRem from '../../utilities/pixelsToRem';

export default {
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
  // link: ({ palette, spacings }: Theme) =>
  //   css({

  //   }),
  chevron: ({ palette, spacings }: Theme) =>
    css({
      color: palette.GREY_10,
      fill: 'currentColor',
      marginInlineStart: `${spacings.HALF}rem`,
      verticalAlign: 'middle',
    }),
  // TO DO - split out padding so that the different links have different padding
  linkWrapper: ({ palette, spacings }: Theme) =>
    css({
      paddingTop: `${spacings.FULL}rem`, // touch target
      paddingBottom: `${spacings.DOUBLE}rem`, // touch target
      display: 'inline-block',
      textDecoration: 'none',
      svg: {
        ' &:visited': {
          color: palette.METAL,
        },
        '&:focus, &:hover': {
          color: palette.POSTBOX,
        },
      },
    }),
  canonicalLink: ({ fontVariants }: Theme) =>
    css({
      ...fontVariants.sansBold,
    }),
  linkContainer: ({ spacings }: Theme) =>
    css({
      // margin: `${spacings.DOUBLE}rem 0`,
    }),
  linkText: ({ palette }: Theme) =>
    css({
      borderBottom: `1px solid ${palette.GREY_10}`,
      textDecoration: 'none',
      ' &:visited': {
        color: palette.METAL,
        borderBottom: `1px solid ${palette.METAL}`,
      },
      '&:focus, &:hover': {
        borderBottom: `2px solid ${palette.POSTBOX}`,
        color: palette.POSTBOX,
      },
    }),
};
