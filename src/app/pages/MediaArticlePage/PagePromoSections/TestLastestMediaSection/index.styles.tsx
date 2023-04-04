import { Theme, css } from '@emotion/react';

const styles = {
  LatestMediaGridWrapper: ({ mq }: Theme) =>
    css({
      display: 'grid',
      gridTemplateColumns: 'repeat(1, 1fr)',
      [mq.GROUP_3_ONLY]: {
        gridTemplateColumns: 'repeat(2, 1fr)',
        marginLeft: '1rem',
        marginRight: '1rem',
        columnGap: '1rem',
        rowGap: '1.5rem',
      },
    }),
};

export default styles;
