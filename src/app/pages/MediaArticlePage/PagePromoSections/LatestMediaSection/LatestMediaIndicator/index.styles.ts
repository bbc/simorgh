import { css, Theme } from '@emotion/react';

const styles = {
  placeholderInfo: ({
    mq,
    fontSizes,
    fontVariants,
    palette,
    isLite,
    isDarkUi,
  }: Theme) =>
    css({
      position: 'relative',
      width: '100%',
      ...fontSizes.minion,
      ...fontVariants.sansRegular,
      display: 'flex',
      minWidth: '5rem',
      padding: '0.5rem 0.125rem',
      backgroundColor: isDarkUi ? palette.GREY_10 : palette.GREY_2,

      ...(!isLite && {
        [mq.GROUP_3_ONLY]: {
          padding: '0.5rem',
          position: 'absolute',
          backgroundColor: palette.WHITE,
          maxWidth: '4.125rem',
          height: '2.5rem',
          transform: 'translateY(-2.5rem)',
          '& time': {
            margin: 'auto',
          },
        },
        [mq.GROUP_2_ONLY]: {
          padding: '0.5rem',
          position: 'absolute',
          backgroundColor: palette.WHITE,
          maxWidth: '4.125rem',
          height: '2.125rem',
          transform: 'translateY(-2.125rem)',
          '& time': {
            margin: 'auto',
          },
        },
      }),
    }),
  time: ({ palette, mq, isLite }: Theme) =>
    css({
      color: palette.GREY_2,

      ...(!isLite && {
        [mq.GROUP_2_ONLY]: {
          color: palette.EBON,
        },
        [mq.GROUP_3_ONLY]: {
          color: palette.EBON,
        },
      }),
    }),
  promoMediaIndicator: ({ palette, mq, isLite }: Theme) =>
    css({
      '.external-svg': {
        color: palette.GREY_2,
        "@supports not ((mask-image: url('')) or (-webkit-mask-image: url('')))":
          { filter: 'invert(1)' },

        ...(!isLite && {
          [mq.GROUP_2_ONLY]: {
            color: palette.EBON,
            filter: 'none',
          },
          [mq.GROUP_3_ONLY]: {
            color: palette.EBON,
            filter: 'none',
          },
        }),
        [mq.FORCED_COLOURS]: {
          color: 'CanvasText',
          filter: 'none',
          "@supports not ((mask-image: url('')) or (-webkit-mask-image: url('')))":
            {
              '@media (prefers-color-scheme: dark)': { filter: 'invert(1)' },
            },
        },
      },
    }),
};

export default styles;
