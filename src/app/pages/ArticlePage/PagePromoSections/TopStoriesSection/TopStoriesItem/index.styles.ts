import { css, Theme } from '@emotion/react';
import { BORDER_SPACING } from '../../constants';

export default {
  timestamp: ({ spacings }: Theme) =>
    css({
      paddingTop: `${spacings.HALF}rem`,
    }),
  title: ({ fontSizes }: Theme) =>
    css({ display: 'inline', ...fontSizes.pica }),
  titleWithContent: ({ spacings }: Theme) =>
    css({ paddingBottom: `${spacings.HALF}rem` }),
  topStoriesWrapper: () =>
    css({
      border: `${BORDER_SPACING} solid transparent`,
      height: '100%',
    }),
};
