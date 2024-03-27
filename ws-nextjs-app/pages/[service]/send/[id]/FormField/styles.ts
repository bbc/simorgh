import { Theme, css } from '@emotion/react';

export default {
  formField: ({ spacings }: Theme) =>
    css({
      paddingBottom: `${spacings.DOUBLE}rem`,

      'textarea, input': {
        display: 'block',
      },
    }),
};
