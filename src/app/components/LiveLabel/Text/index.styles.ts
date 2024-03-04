import { css, Theme } from '@emotion/react';

const styles = {
  liveLabelText: ({ fontVariants, spacings, palette }: Theme) =>
    css({
      display: 'inline-block',
      ...fontVariants.sansBold,
      marginInlineEnd: `${spacings.FULL}rem`,
      color: palette.LIVE_DARK,
    }),
  livePageLabelText: ({ fontVariants, spacings, palette }: Theme) =>
    css({
      display: 'inline-block',
      ...fontVariants.sansBold,
      marginInlineEnd: `${spacings.FULL}rem`,
      color: palette.LIVE_LIGHT,
    }),
};

export default styles;
