import { css, type Theme } from '@emotion/react';

const styles = {
  iframe: ({ spacings, mq }: Theme) =>
    css({
      maxWidth: '100%',
      marginBottom: `${spacings.TRIPLE}rem`,
      [mq.GROUP_4_MAX_WIDTH]: {
        marginLeft: `${spacings.FULL}rem`,
        marginRight: `${spacings.FULL}rem`,
      },
    }),
};

export default styles;
