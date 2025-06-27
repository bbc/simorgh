import { css, Theme } from '@emotion/react';

export default {
  promoWrapper: ({ mq, spacings }: Theme) =>
    css({
      marginInlineStart: `${spacings.FULL}rem`,
      [mq.GROUP_2_MIN_WIDTH]: {
        marginInlineStart: `${spacings.DOUBLE}rem`,
      },
      [mq.GROUP_4_MIN_WIDTH]: {
        marginInlineStart: 0,
      },
    }),
  promoContainer: ({ palette, spacings }: Theme) =>
    css({
      background: palette.GREY_2,
      padding: `${spacings.FULL}rem`,
      display: 'flex',
      overflowX: 'auto',
      '-ms-overflow-style': 'none',
      scrollbarWidth: 'none',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    }),
  labelComponent: ({
    isDarkUi,
    fontSizes,
    fontVariants,
    mq,
    palette,
    spacings,
  }: Theme) =>
    css({
      ...fontSizes.brevier,
      ...fontVariants.sansRegular,
      //   display: 'inline-block', // not sure why there are two base display styles in legacy styled component
      display: 'flex',
      alignItems: 'center',
      backgroundColor: palette.GREY_2,
      width: '100vw',
      height: `${spacings.QUADRUPLE}rem`,
      color: isDarkUi ? palette.GREY_2 : palette.SHADOW,
      marginBottom: `${spacings.DOUBLE}rem`,
      padding: `${spacings.FULL}rem`,

      [mq.GROUP_0_MAX_WIDTH]: {
        margin: 0,
        marginInlineStart: `${spacings.FULL}rem`,
      },
      [mq.GROUP_2_MIN_WIDTH]: {
        padding: `${spacings.DOUBLE}rem`,
        margin: '0, 0.2rem',
        marginInlineStart: `${spacings.DOUBLE}rem`,
      },
      [mq.GROUP_3_MIN_WIDTH]: {
        margin: '0, 0.8rem',
      },
      [mq.GROUP_3_MAX_WIDTH]: {
        display: 'none',
      },
      [mq.GROUP_4_MIN_WIDTH]: {
        marginInlineStart: 0,
      },
    }),
};
