import { css, Theme } from '@emotion/react';

const styles = {
  h2: ({ palette, fontVariants, fontSizes }: Theme) =>
    css({
      ...fontVariants.sansBold,
      ...fontSizes.doublePica,
      color: palette.GREY_10,
      a: {
        color: palette.GREY_10,
        textDecoration: 'none',
        display: 'inline-block',
      },
      span: {
        display: 'inline-block',
        position: 'relative',
      },
      'a:visited': {
        color: palette.GREY_10,
      },
      'a: hover, a:focus': {
        color: palette.POSTBOX,
        span: {
          textDecoration: 'underline',
        },
      },
      svg: {
        marginInlineStart: '0.5rem',
        fill: 'currentColor',
        width: `${14 / 16} rem`,
        height: `${14 / 16} rem`,
        position: 'relative',
      },
    }),
};

export default styles;
