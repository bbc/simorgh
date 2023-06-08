import { css, Theme } from '@emotion/react';
import pixelsToRem from '../../../../../src/app/utilities/pixelsToRem';

export default {
  background: ({ palette }: Theme) =>
    css({
      backgroundColor: palette.GREY_2,
    }),
  wrapper: () =>
    css({
      maxWidth: `${pixelsToRem(1008)}rem`,
      margin: '0 auto',
      padding: `${pixelsToRem(16)}rem 0`,
    }),
  summary: ({ palette }: Theme) =>
    css({
      backgroundColor: palette.WHITE,
      padding: `${pixelsToRem(16)}rem`,
      marginBottom: `${pixelsToRem(16)}rem`,
    }),
};
