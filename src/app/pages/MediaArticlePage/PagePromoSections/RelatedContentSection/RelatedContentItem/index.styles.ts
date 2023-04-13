import { css, Theme } from '@emotion/react';

import { BORDER_SPACING } from '../../constants';

export default {
  wrapper: () =>
    css({
      border: `${BORDER_SPACING} solid transparent`,
      height: '100%',
    }),
  promoTitle: ({ spacings }: Theme) =>
    css({
      paddingBottom: `${spacings.FULL}rem`,
    }),
  promoTimestamp: ({ palette }: Theme) =>
    css({
      color: palette.GREY_6,
    }),
};
