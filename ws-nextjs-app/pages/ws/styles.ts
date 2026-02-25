import { css, Theme } from '@emotion/react';

const styles = {
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
