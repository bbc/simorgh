import { css, type Theme } from '@emotion/react';

const styles = {
  billboardContainer: ({ spacings }: Theme) =>
    css({
      marginTop: `${spacings.QUADRUPLE}rem`,
      marginBottom: `${spacings.QUADRUPLE}rem`,
      position: 'relative',
      zIndex: 1,
    }),

  pvCarousel: ({ spacings, mq }: Theme) =>
    css({
      margin: `${spacings.DOUBLE}rem 0`,
      [mq.GROUP_1_MIN_WIDTH]: {
        margin: `${spacings.TRIPLE}rem 0`,
      },
      [mq.GROUP_3_MIN_WIDTH]: {
        margin: `${spacings.DOUBLE}rem 0`,
      },
    }),
};

export default styles;
