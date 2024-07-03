import { css, Theme } from '@emotion/react';

const styles = {
  time: ({ mq }: Theme) =>
    css({
      // paddingInlineEnd: `${spacings.DOUBLE}rem`,
      float: 'inline-start',
      // marginBottom: 'inherit',
      width: '100%',
      [mq.GROUP_1_MIN_WIDTH]: {
        width: '25%',
      },
      [mq.GROUP_2_MIN_WIDTH]: {
        width: '15%',
      },
      [mq.GROUP_3_MIN_WIDTH]: {
        width: '10%',
      },
    }),
};

export default styles;
