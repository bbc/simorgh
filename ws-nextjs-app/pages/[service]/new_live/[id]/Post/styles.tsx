import { Theme, css } from '@emotion/react';
import pixelsToRem from '../../../../../../src/app/utilities/pixelsToRem';

export default {
  postHeaderBanner: ({ palette }: Theme) =>
    css({
      backgroundColor: palette.BRAND_BACKGROUND,
      display: 'flex',
      'align-items': 'flex-start',
    }),
  breakingNewsLabel: ({ palette }: Theme) =>
    css({
      color: palette.WHITE,
      gap: `${pixelsToRem(10)}rem`,
      padding: `${pixelsToRem(4)}rem ${pixelsToRem(12)}rem`,
    }),
};
