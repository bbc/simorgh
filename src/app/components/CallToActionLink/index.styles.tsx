import { css } from '@emotion/react';

const styles = {
  linkBackground: () =>
    css({
      textDecoration: 'none',
      color: 'inherit',
      '&:hover, &:focus': {
        textDecoration: 'underline',
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
