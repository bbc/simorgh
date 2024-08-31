import { css, Theme } from '@emotion/react';
import { BORDER_SPACING } from '../../constants';

export default {
  timestamp: ({ spacings }: Theme) =>
    css({
      paddingTop: `${spacings.FULL}rem`,
    }),
  title: ({ fontSizes }: Theme) =>
    css({ display: 'inline', ...fontSizes.pica }),
  titleWithContent: ({ spacings }: Theme) =>
    css({ paddingBottom: `${spacings.FULL}rem` }),
  topStoriesWrapper: () =>
    css({
      border: `${BORDER_SPACING} solid transparent`,
      height: '100%',
    }),
};
