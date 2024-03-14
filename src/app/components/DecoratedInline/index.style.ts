import { Theme, css } from '@emotion/react';

export default {
  inline: ({ spacings }: Theme) =>
    css({
      paddingBottom: `${spacings.TRIPLE}rem`,
      margin: 0,
    }),
};
