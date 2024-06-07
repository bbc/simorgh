import { css, Theme } from '@emotion/react';

export default {
  time: ({ spacings }: Theme) => {
    css({
      paddingInlineEnd: `${spacings.DOUBLE}rem`,
      float: 'left',
      marginBottom: 'inherit',
    });
  },
};
