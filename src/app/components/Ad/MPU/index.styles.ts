import { css, Theme } from '@emotion/react';

const styles = {
  mpu: ({ mq }: Theme) =>
    css({
      /* MPU gets misaligned with the original padding at smaller breakpoints */
      [mq.GROUP_1_MAX_WIDTH]: {
        padding: 0,
      },
    }),
};

export default styles;
