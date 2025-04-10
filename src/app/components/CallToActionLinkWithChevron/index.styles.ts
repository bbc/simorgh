import { css, Theme } from '@emotion/react';
import pixelsToRem from '../../utilities/pixelsToRem';

export default {
  linkText: ({ palette }: Theme) =>
    css({
      color: 'inherit',
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
  link: ({ palette }: Theme) =>
    css({
      color: palette.GREY_10,
      display: 'inline-block',
      textDecoration: 'none',
      padding: `${pixelsToRem(12)}rem 0 ${pixelsToRem(12)}rem`,
      '&:focus, &:hover': {
        textDecoration: 'none',
      },
    }),
  chevron: ({ palette, spacings, mq }: Theme) =>
    css({
      color: palette.GREY_10,
      fill: 'currentColor',
      marginInlineStart: `${spacings.FULL}rem`,
      verticalAlign: 'middle',
      width: `${pixelsToRem(14)}rem`,
      height: `${pixelsToRem(14)}rem`,
      'a:visited &': {
        color: palette.METAL,
      },
      'a:focus &, a:hover &': {
        color: palette.POSTBOX,
      },
      [mq.FORCED_COLOURS]: {
        fill: 'linkText',
        'a:visited &': {
          fill: 'visitedText',
        },
      },
    }),
};
