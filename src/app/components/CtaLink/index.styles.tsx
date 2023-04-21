import { css } from '@emotion/react';

const styles = {
  linkBackground: () =>
    css({
      textDecoration: 'none',
      '&:hover, &:focus': {
        textDecoration: 'underline',
      },
    }),
  link: () =>
    css({
      textDecoration: 'none',
      verticalAlign: 'middle',
    }),
  chevron: () =>
    css({
      verticalAlign: 'middle',
      fill: 'currentcolor',
    }),
  linkAndChevron: () =>
    css({
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    }),
};

export default styles;
