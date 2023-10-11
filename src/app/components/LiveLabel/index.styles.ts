import { css, Theme } from '@emotion/react';

const styles = {
  liveLabel: ({ palette, fontVariants, spacings }: Theme) =>
    css({
      color: palette.POSTBOX,
      display: 'inline-block',
      ...fontVariants.sansBold,
      marginInline:`${spacings.FULL}rem`
    }),

};

export default styles;
