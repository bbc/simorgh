import { css, Theme } from '@emotion/react';

const styles = {
  liveLabelText: ({ fontVariants, spacings }: Theme) =>
    css({
      display: 'inline-block',
      ...fontVariants.sansBold,
      marginInlineEnd: `${spacings.FULL}rem`,
    }),
  liveLabelContainerWithoutImage: ({ mq, palette }: Theme) =>
    css({
      display: 'inline-flex',
      verticalAlign: 'top',
      alignItems: 'center',
      [mq.GROUP_4_MIN_WIDTH]: {
        width: `calc(100% / 3)`,
      },
      [mq.GROUP_5_MIN_WIDTH]: {
        width: `calc(100% / 3)`,
      },
      color: palette.LIVE_LIGHT,
    }),
  liveLabelContainerWithImage: ({ palette }: Theme) =>
    css({
      display: 'inline-flex',
      verticalAlign: 'top',
      alignItems: 'center',
      color: palette.LIVE_LIGHT,
    }),
};

export default styles;
