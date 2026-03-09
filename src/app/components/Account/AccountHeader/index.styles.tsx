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
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: palette.WHITE,
    textDecoration: 'none',
    fontWeight: 700,
    border: `1px solid ${palette.WHITE}`,
    borderRadius: 0,
    padding: '0.5rem',
    '&:hover, &:focus': {
      outline: `4px solid ${palette.WHITE}`,
      outlineOffset: '-1px',
      textDecoration: 'none',
    },
  }),

  icon: {
    fill: 'currentColor',
    flexShrink: 0,
  },
};

export default styles;
