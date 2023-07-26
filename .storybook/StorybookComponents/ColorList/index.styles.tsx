import { css, Theme } from '@emotion/react';

const styles = {
  colorGrid: ({ spacings, mq }: Theme) =>
    css({
      display: 'grid',
      gap: `${spacings.DOUBLE}rem`,
      gridTemplateColumns: 'repeat(1, 1fr)',
      [mq.GROUP_3_MIN_WIDTH]: {
        gridTemplateColumns: 'repeat(2, 1fr)',
      },
      [mq.GROUP_4_MIN_WIDTH]: {
        gridTemplateColumns: 'repeat(3, 1fr)',
      },
      listStyle: 'none',
      padding: 0,
    }),
};

export default styles;
