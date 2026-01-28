import { Theme } from '@emotion/react';

const styles = {
  wrapper: {
    marginInlineStart: 'auto',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    paddingInlineStart: '1rem',
  },

  link: ({ palette }: Theme) => ({
    color: palette.WHITE,

    '&:hover, &:focus': {
      textDecoration: 'underline',
    },
  }),
};

export default styles;
