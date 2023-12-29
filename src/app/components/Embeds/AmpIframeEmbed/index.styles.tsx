import { css, Theme } from '@emotion/react';

const styles = {
  embedDiv: ({ spacings }: Theme) =>
    css({
      maxWidth: '100%',
      paddingBottom: `${spacings.TRIPLE}rem`,
    }),
};

export default styles;
