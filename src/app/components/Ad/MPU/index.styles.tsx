import { css, Theme } from '@emotion/react';
import { negativeMargin } from '#app/lib/styles.const';

const styles = {
  mpu: ({ mq }: Theme) =>
    css({
      ...negativeMargin,
      /* MPU gets misaligned with the original padding at smaller breakpoints */
      [mq.GROUP_1_MAX_WIDTH]: {
        padding: 0,
      },
    }),
};

export default styles;
