import { css, Theme } from '@emotion/react';

const styles = {
  iframe: ({ spacings, mq }: Theme) =>
    css({
      maxWidth: '100%',
      paddingLeft: `${spacings.FULL}rem`,
      paddingRight: `${spacings.FULL}rem`,
      marginBottom: `${spacings.TRIPLE}rem`,

      [mq.GROUP_2_MIN_WIDTH]: {
        paddingLeft: `${spacings.DOUBLE}rem`,
        paddingRight: `${spacings.DOUBLE}rem`,
      },
      [mq.GROUP_4_MIN_WIDTH]: {
        paddingLeft: '0',
        paddingRight: '0',
      },
    }),
};

export default styles;
