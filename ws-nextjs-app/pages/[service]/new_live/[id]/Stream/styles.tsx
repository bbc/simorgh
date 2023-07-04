import { css } from '@emotion/react';

export default {
  list: () =>
    css({
      listStyleType: 'none',
    }),
  unorderedList: () =>
    css({
      marginBlock: 0,
      paddingInline: 0,
    }),
};
