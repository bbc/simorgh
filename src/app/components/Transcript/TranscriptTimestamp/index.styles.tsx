import { css, Theme } from '@emotion/react';

const styles = {
  time: ({ mq }: Theme) =>
    css({
      float: 'inline-start',
      width: '100%',
      [mq.GROUP_1_MIN_WIDTH]: {
        width: 'auto',
      },
    }),
};

export default styles;
