import { Theme } from '@emotion/react';

const styles = {
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    marginInlineStart: 'auto',
    flexShrink: 0,
    paddingInlineStart: '1rem',
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
