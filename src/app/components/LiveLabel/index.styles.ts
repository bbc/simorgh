import { css, Theme } from '@emotion/react';

const styles = {
  liveLabel: ({ palette, spacings, fontVariants }: Theme) =>
    css({
      color: palette.LIVE_DARK,
      display: 'inline-block',
      marginInlineEnd: `${spacings.FULL}rem`,
      ...fontVariants.sansBold,
    }),
};

export default styles;
