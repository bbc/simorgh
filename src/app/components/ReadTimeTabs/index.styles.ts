import { css, Theme } from '@emotion/react';
import NO_JS_CLASSNAME from '#app/lib/noJs.const';

const SKELETON_MIN_HEIGHT_REM = 18;

const styles = {
  section: ({ spacings, mq }: Theme) =>
    css({
      padding: `0 ${spacings.DOUBLE}rem`,

      [mq.GROUP_1_MAX_WIDTH]: {
        padding: `0 ${spacings.FULL}rem`,
      },
      [mq.GROUP_4_MIN_WIDTH]: {
        padding: 0,
      },

      [`.${NO_JS_CLASSNAME} &`]: {
        display: 'none',
      },
    }),

  heading: ({ palette, spacings, fontSizes, fontVariants, isDarkUi }: Theme) =>
    css({
      ...fontVariants.sansBold,
      ...fontSizes.doublePica,
      color: isDarkUi ? palette.GREY_2 : palette.GREY_10,
      margin: 0,
      padding: `${spacings.DOUBLE}rem 0`,
    }),

  panel: ({ spacings, mq, palette, isDarkUi }: Theme) =>
    css({
      paddingTop: `${spacings.DOUBLE}rem`,

      li: {
        borderTop: 'none',
        paddingTop: 0,
        width: `calc(50% - ${spacings.FULL}rem)`,
        marginInlineEnd: `${spacings.DOUBLE}rem`,

        '&:nth-of-type(2n)': {
          marginInlineEnd: 0,
        },

        '.promo-image': {
          width: '100%',
          display: 'block',
        },

        '.promo-text': {
          width: '100%',
          display: 'block',
          paddingInlineStart: 0,

          a: {
            color: isDarkUi ? palette.GREY_2 : palette.GREY_10,

            '&:visited': {
              color: isDarkUi ? palette.GREY_4 : palette.GREY_6,
            },
          },
        },
      },

      [mq.GROUP_3_MIN_WIDTH]: {
        li: {
          width: `calc(25% - 0.75rem)`,
          marginBottom: `${spacings.DOUBLE}rem`,

          '&:nth-of-type(2n):not(:last-of-type)': {
            marginInlineEnd: `${spacings.DOUBLE}rem`,
          },
        },
      },
    }),

  skeletonGrid: ({ spacings, mq }: Theme) =>
    css({
      display: 'grid',
      gap: `${spacings.DOUBLE}rem`,
      gridTemplateColumns: '1fr 1fr',
      minHeight: `${SKELETON_MIN_HEIGHT_REM}rem`,

      [mq.GROUP_3_MIN_WIDTH]: {
        gridTemplateColumns: 'repeat(4, 1fr)',
      },
    }),

  skeletonCard: ({ spacings }: Theme) =>
    css({
      display: 'flex',
      flexDirection: 'column',
      gap: `${spacings.FULL}rem`,
    }),

  skeletonImage: ({ palette, isDarkUi }: Theme) =>
    css({
      aspectRatio: '16 / 9',
      backgroundColor: isDarkUi ? palette.GREY_8 : palette.GREY_3,
    }),

  skeletonLine: ({ palette, isDarkUi }: Theme) =>
    css({
      height: '0.75rem',
      backgroundColor: isDarkUi ? palette.GREY_8 : palette.GREY_3,
    }),

  errorMessage: ({ palette, fontSizes, fontVariants, isDarkUi }: Theme) =>
    css({
      ...fontVariants.sansRegular,
      ...fontSizes.pica,
      color: isDarkUi ? palette.GREY_2 : palette.GREY_10,
      margin: 0,
    }),
};

export default styles;
