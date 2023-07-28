import { css, Theme } from '@emotion/react';

const styles = {
  embedDiv: ({ spacings, mq }: Theme) =>
    css({
      paddingLeft: `${spacings.FULL}rem`,
      paddingRight: `${spacings.FULL}rem`,
      paddingBottom: `${spacings.DOUBLE}rem`,

      [mq.GROUP_1_MIN_WIDTH]: {
        paddingBottom: `${spacings.TRIPLE}rem`,
      },
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
