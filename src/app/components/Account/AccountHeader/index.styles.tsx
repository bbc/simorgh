import { Theme } from '@emotion/react';

const styles = {
  wrapper: ({ spacings }: Theme) => ({
    marginInlineStart: 'auto',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    paddingInlineStart: `${spacings.DOUBLE}rem`,
  }),

  link: ({ palette, fontSizes }: Theme) => ({
    color: palette.WHITE,
    textDecoration: 'none',
    ...fontSizes.pica,
    lineHeight: 1,
    display: 'inline-block',

    '&:hover, &:focus': {
      textDecoration: 'underline',
    },

    '&:visited': {
      color: palette.WHITE,
    },
  }),
};

export default styles;
