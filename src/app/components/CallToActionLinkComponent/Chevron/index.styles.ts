import { css, Theme } from '@emotion/react';
import pixelsToRem from '#app/utilities/pixelsToRem';

export default {
  chevron: () =>
    css({
      verticalAlign: 'middle',
    }),
  brevierSize: ({ spacings }: Theme) =>
    css({
      marginInlineStart: `${spacings.FULL}rem`,
      width: `${pixelsToRem(14)}rem`,
      height: `${pixelsToRem(14)}rem`,
    }),
  picaSize: ({ spacings }: Theme) =>
    css({
      marginInlineStart: `${spacings.FULL}rem`, // Note for PR: Reducing uploader from 12 pixels to 8 pixels (1 rem)`${pixelsToRem(12)}rem`,
      width: `${spacings.DOUBLE}rem`,
      height: `${spacings.DOUBLE}rem`,
    }),
};
