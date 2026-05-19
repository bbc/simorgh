import type { Theme } from '@emotion/react';
import pixelsToRem from '#app/utilities/pixelsToRem';

const styles = {
  wrapper: {
    paddingBlock: '0.5rem',
  },
  link: ({ palette }: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    minHeight: `${pixelsToRem(44)}rem`,
    paddingInline: `${pixelsToRem(12)}rem`,
    color: palette.WHITE,
    textDecoration: 'none',
    border: `1px solid ${palette.WHITE}`,

    '&:hover, &:focus': {
      outline: `4px solid ${palette.WHITE}`,
      textDecoration: 'underline',
      boxShadow: 'none',
      outlineOffset: 0,
    },
  }),

  icon: {
    fill: 'currentColor',
    flexShrink: 0,
  },
};

export default styles;
