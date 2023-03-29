import { css, Theme } from '@emotion/react';

const styles = {
  hiddenText: ({ mq }: Theme) =>
    css({
      clipPath: 'inset(100%)',
      clip: 'rect(1px, 1px, 1px, 1px)',
      height: '1px',
      overflow: 'hidden',
      position: 'absolute',
      width: '1px',
      margin: '0',
    }),
};

export default styles;
