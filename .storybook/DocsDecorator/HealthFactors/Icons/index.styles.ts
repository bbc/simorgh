import { css, Theme } from '@emotion/react';
import pixelsToRem from '../../../../src/app/utilities/pixelsToRem';

const styles = {
  icon: (theme: Theme) =>
    css({
      display: 'block',
      fill: 'currentcolor',
      [theme.mq.HIGH_CONTRAST]: {
        svg: {
          fill: 'VisitedText',
        },
      },
    }),
};

export default styles;
