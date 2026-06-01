import { css } from '@emotion/react';
import { DISPLAY_ACCOUNT_PROMOTIONAL_BANNER_CSS_CLASS } from './utilities';

export default {
  bannerWrapper: () =>
    css({
      display: 'none',
      [`.${DISPLAY_ACCOUNT_PROMOTIONAL_BANNER_CSS_CLASS} &`]: {
        display: 'block',
      },
    }),
};
