import { css, Theme } from '@emotion/react';

export default {
  transcript: ({ palette }: Theme) =>
    css({
      background: palette.SPORT_YELLOW,
      display: 'block',
    }),
};
