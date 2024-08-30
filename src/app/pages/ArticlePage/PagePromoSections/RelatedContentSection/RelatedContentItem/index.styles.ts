import { css, Theme } from '@emotion/react';
import { BORDER_SPACING } from '../../constants';

export default {
  titleWithContent: ({ spacings }: Theme) =>
    css({
      paddingBottom: `${spacings.HALF}rem`,
    }),
  relatedContentWrapper: () =>
    css({
      border: `${BORDER_SPACING} solid transparent`,
      height: '100%',
    }),
};
