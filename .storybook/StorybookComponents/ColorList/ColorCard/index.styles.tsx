import { css, Theme } from '@emotion/react';

// Border uses grey-5
const styles = {
  wrapper: { padding: '0.5rem', border: '1px solid black' },

  color:
    colorCode =>
    ({ spacings, mq }: Theme) =>
      css({
        '::before': {
          content: '""',
          display: 'block',
          height: '4rem',
          margin: `-${spacings.FULL}rem`,
          marginBottom: `${spacings.FULL}rem`,
          background: colorCode,
          [mq.HIGH_CONTRAST]: {
            background: colorCode,
            forcedColorAdjust: 'none',
          },
        },
      }),

  text: { display: 'block' },
};

export default styles;
