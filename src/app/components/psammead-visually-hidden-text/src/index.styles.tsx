import { css } from '@emotion/react';

const styles = {
  visuallyHidden: () =>
    css({
      'clip-path': 'inset(100 %)',
      clip: 'rect(1px, 1px, 1px, 1px)',
      height: '1px',
      overflow: 'hidden',
      position: 'absolute',
      width: '1px',
      margin: '0',
    }),
};

export default styles;
