import { css, Theme } from '@emotion/react';

const styles = {
  colorGrid: ({ spacings }: Theme) =>
    css({
      display: 'grid',
      gap: `${spacings.DOUBLE}rem`,
      gridTemplateColumns: 'repeat(3, 1fr)',
      listStyle: 'none',
      padding: 0,
    }),
};

export default styles;
