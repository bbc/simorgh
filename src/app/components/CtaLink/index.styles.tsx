import { css } from '@emotion/react';

const styles = {
  linkBackground: () =>
    css({
      textDecoration: 'none',
      '&:hover, &:focus': {
        textDecoration: 'underline',
        color: 'inherit',
      },
    }),
  linkTextWrapper: () =>
    css({
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    }),
  linkText: () =>
    css({
      verticalAlign: 'middle',
      color: 'inherit',
    }),
};

export default styles;
