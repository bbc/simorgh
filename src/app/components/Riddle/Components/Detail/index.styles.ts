import { css, Theme } from '@emotion/react';

export default {
  detailContainer: ({ mq }: Theme) =>
    css({
      alignContent: 'center',
      textAlign: 'center',
      [mq.GROUP_2_MAX_WIDTH]: {
        alignContent: 'start',
      },
    }),
  detailLabel: ({ palette, spacings, fontSizes, fontVariants, mq }: Theme) =>
    css({
      display: 'inline-block',
      background: palette.BLACK,
      color: palette.WHITE,
      marginBottom: `${spacings.FULL}rem`,
      ...fontVariants.sansBold,
      ...fontSizes.greatPrimer,
      [mq.GROUP_2_MAX_WIDTH]: {
        ...fontSizes.minion,
      },
    }),
  detailContent: ({ spacings, fontSizes, fontVariants, mq }: Theme) =>
    css({
      display: 'inline-block',
      marginBottom: `${spacings.FULL}rem`,
      ...fontVariants.serifLight,
      ...fontSizes.doublePica,
      [mq.GROUP_2_MAX_WIDTH]: {
        ...fontSizes.brevier,
      },
    }),
};
