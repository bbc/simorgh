import { Theme, css } from '@emotion/react';

export default {
  heading: ({ spacings }: Theme) =>
    css({
      marginBottom: `${spacings.FULL}rem`,
      '&:focus': {
        outline: 'none',
      },
    }),
};
