import { css, Theme } from '@emotion/react';

const styles = {
  liveLabelText: ({ fontVariants, palette, spacings }: Theme) =>
    css({
      color: palette.LIVE_DARK,
      display: 'inline-block',
      ...fontVariants.sansBold,
      marginInlineEnd: `${spacings.FULL}rem`,
    }),
};

export default styles;
