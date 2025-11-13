import { css, Theme } from '@emotion/react';
import pixelsToRem from '#app/utilities/pixelsToRem';

export default {
  chevron: () =>
    css({
      verticalAlign: 'middle',
      fill: 'currentColor',
    }),
  brevierSize: ({ spacings }: Theme) =>
    css({
      marginInlineStart: `${spacings.FULL}rem`,
      width: `${pixelsToRem(14)}rem`,
      height: `${pixelsToRem(14)}rem`,
    }),
  picaSize: ({ spacings }: Theme) =>
    css({
      marginInlineStart: `${spacings.FULL}rem`,
      width: `${spacings.DOUBLE}rem`,
      height: `${spacings.DOUBLE}rem`,
    }),
};
