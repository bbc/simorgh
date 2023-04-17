import { css, Theme } from '@emotion/react';
import pixelsToRem from '../../../src/app/utilities/pixelsToRem';

// Border uses grey-5
const styles = {
  wrapper: { padding: '0.5rem', border: '1px solid black' },

  color: ({ palette, spacings }: Theme) =>
    css({
      '::before': {
        content: '""',
        display: 'block',
        height: '4rem',
        margin: '-0.5rem -0.5rem 0 -0.5rem',
      },
    }),

  colorGrid: {
    display: 'grid',
    gap: '1rem',
    gridTemplateColumns: 'repeat(3, 1fr)',
    listStyle: 'none',
    padding: 0,
  },
};

export default styles;
