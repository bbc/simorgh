import { css, Theme } from '@emotion/react';

// Border uses grey-5
const styles = {
  wrapper: { padding: '0.5rem', border: '1px solid black' },

  color: ({ palette, spacings }: Theme) =>
    css({
      '::before': {
        content: '""',
        display: 'block',
        height: '4rem',
        margin: '-0.5rem -0.5rem 0.5rem -0.5rem',
      },
    }),
};

export default styles;
