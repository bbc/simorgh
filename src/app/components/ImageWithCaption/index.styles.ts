import { css, Theme } from '@emotion/react';

const styles = {
  figure: (theme: Theme) =>
    css({
      margin: 0,
      paddingBottom: `${theme.spacings.TRIPLE}rem`,
      width: '100%',
      height: '100%',
    }),
};

export default styles;
