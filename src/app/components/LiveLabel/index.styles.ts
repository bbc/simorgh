import { css, Theme } from '@emotion/react';

const styles = {
  liveLabel: ({ palette, spacings }: Theme) =>
    css({
      color: palette.POSTBOX,
      display: 'inline-block',
      marginInline: `${spacings.FULL}rem`,
    }),
};

export default styles;
