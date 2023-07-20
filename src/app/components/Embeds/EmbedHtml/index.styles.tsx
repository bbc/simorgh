import { css, Theme } from '@emotion/react';

const styles = {
  embedDiv: ({ spacings }: Theme) =>
    css({
      maxWidth: '100%',
      overflow: 'scroll hidden',
      marginBottom: spacings.QUINTUPLE,
    }),
};

export default styles;
