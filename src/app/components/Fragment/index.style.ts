import { css, type Theme } from '@emotion/react';

export default {
  italicStyle: ({ fontVariants }: Theme) =>
    css({
      ...fontVariants.sansRegularItalic,
      fontFamily: 'inherit',
      fontWeight: 'inherit',
    }),
};
