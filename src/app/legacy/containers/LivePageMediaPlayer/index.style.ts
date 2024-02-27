import { Theme, css } from '@emotion/react';

export default {
  EMPContainer: ({ spacings }: Theme) =>
    css({
      margin: spacings.DOUBLE,
    }),
};
