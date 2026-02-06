import { Theme } from '@emotion/react';

const styles = {
  wrapper: {
    display: 'flex',
    alignitems: 'center',
    margininlineStart: 'auto',
    flexshrink: 0,
    paddinginlineStart: '1rem',
  },

  link: ({ palette }: Theme) => ({
    color: palette.WHITE,
    textDecoration: 'none',

    '&:hover, &:focus': {
      textDecoration: 'underline',
    },
  }),
};

export default styles;
