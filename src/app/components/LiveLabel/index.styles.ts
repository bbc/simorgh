import { css, Theme } from '@emotion/react';

const styles = {
  liveLabel: ({ spacings, fontVariants }: Theme) =>
    css({
      display: 'inline-block',
      marginInlineEnd: `${spacings.FULL}rem`,
      ...fontVariants.sansBold,
    }),
};

export default styles;
