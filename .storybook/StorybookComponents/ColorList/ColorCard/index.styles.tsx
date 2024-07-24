import { css, Theme } from '@emotion/react';
import pixelsToRem from '../../../../src/app/utilities/pixelsToRem';

const styles = {
  wrapper: ({ spacings, palette }: Theme) =>
    css({
      padding: `${spacings.FULL}rem`,
      border: `${pixelsToRem(1)}rem solid ${palette.GREY_5}`,
    }),

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
          [mq.FORCED_COLOURS]: {
            background: colorCode,
            forcedColorAdjust: 'none',
          },
        },
      }),

  text: { display: 'block' },
};

export default styles;
