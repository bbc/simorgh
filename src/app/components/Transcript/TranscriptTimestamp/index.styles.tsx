import { css, Theme } from '@emotion/react';

const styles = {
  time: ({ mq }: Theme) =>
    css({
      // paddingInlineEnd: `${spacings.DOUBLE}rem`,
      float: 'inline-start',
      // marginBottom: 'inherit',
      width: '100%',
      [mq.GROUP_1_MIN_WIDTH]: {
        width: 'auto',
      },
    }),
};

export default styles;
