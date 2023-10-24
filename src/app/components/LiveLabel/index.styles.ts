import { css, Theme } from '@emotion/react';

const styles = {
  liveLabel: ({ palette, spacings, fontVariants }: Theme) =>
    css({
      color: palette.LE_TEAL,
      display: 'inline-block',
      marginInlineEnd: `${spacings.FULL}rem`,
      ...fontVariants.sansBold,
    }),
};

export default styles;
