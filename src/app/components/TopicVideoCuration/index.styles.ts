import pixelsToRem from '#app/utilities/pixelsToRem';
import { css, Theme } from '@emotion/react';
import NO_JS_CLASSNAME from '#app/lib/noJs.const';

const styles = {
  section: ({ spacings, mq }: Theme) =>
    css({
      padding: `0 ${spacings.DOUBLE}rem ${spacings.TRIPLE}rem`,
      [mq.GROUP_1_MAX_WIDTH]: {
        padding: `0 ${spacings.FULL}rem ${spacings.DOUBLE}rem`,
      },
      [mq.GROUP_4_MIN_WIDTH]: { padding: `0 0 ${pixelsToRem(32)}rem` },
      [`.${NO_JS_CLASSNAME} &`]: { display: 'none' },
    }),
  heading: ({ palette, spacings, fontSizes, fontVariants, isDarkUi }: Theme) =>
    css({
      ...fontVariants.sansBold,
      ...fontSizes.doublePica,
      color: isDarkUi ? palette.GREY_2 : palette.GREY_10,
      margin: 0,
      padding: `${spacings.DOUBLE}rem 0`,
    }),
  skeletonGrid: ({ spacings, mq }: Theme) =>
    css({
      display: 'grid',
      gap: `${spacings.DOUBLE}rem`,
      gridTemplateColumns: '1fr 1fr',
      [mq.GROUP_3_MIN_WIDTH]: { gridTemplateColumns: 'repeat(4, 1fr)' },
    }),
  skeletonCard: ({ spacings }: Theme) =>
    css({
      display: 'flex',
      flexDirection: 'column',
      gap: `${spacings.FULL}rem`,
    }),
  skeletonImage: ({ palette, isDarkUi }: Theme) =>
    css({
      width: '100%',
      aspectRatio: '16 / 9',
      background: isDarkUi
        ? `linear-gradient(to right, ${palette.GREY_7} 0%, ${palette.GREY_8} 100%)`
        : `linear-gradient(to right, ${palette.GREY_4} 0%, ${palette.GREY_3} 100%)`,
    }),
  skeletonLine: ({ palette, isDarkUi }: Theme) =>
    css({
      height: `${pixelsToRem(12)}rem`,
      width: '80%',
      background: isDarkUi
        ? `linear-gradient(to right, ${palette.GREY_7} 0%, ${palette.GREY_8} 100%)`
        : `linear-gradient(to right, ${palette.GREY_4} 0%, ${palette.GREY_3} 100%)`,
    }),
  errorMessage: ({ palette, fontVariants, fontSizes, isDarkUi }: Theme) =>
    css({
      ...fontVariants.sansRegular,
      ...fontSizes.bodyCopy,
      color: isDarkUi ? palette.GREY_2 : palette.GREY_6,
    }),
};

export default styles;
