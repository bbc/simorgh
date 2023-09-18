import { Theme, css } from '@emotion/react';
import pixelsToRem from '../../../../../../src/app/utilities/pixelsToRem';

export default {
  timeStamp: ({ palette, fontSizes, fontVariants, spacings }: Theme) =>
    css({
      color: palette.WHITE,
      ...fontSizes.brevier,
      ...fontVariants.sansRegular,
      padding: `${spacings.HALF}rem ${spacings.DOUBLE}rem`,
    }),
  postHeaderBanner: ({ palette }: Theme) =>
    css({
      'align-items': 'flex-start',
      backgroundColor: palette.BRAND_BACKGROUND,
      display: 'flex',
      gap: `${pixelsToRem(10)}rem`,
    }),
  breakingNewsLabel: ({ palette }: Theme) =>
    css({
      color: palette.WHITE,
      flex: '1 0 0',
      padding: `${pixelsToRem(4)}rem ${pixelsToRem(12)}rem`,
    }),
};
