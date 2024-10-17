import { css, Theme } from '@emotion/react';

export default {
  experimentTopStoriesSection: ({ spacings, mq }: Theme) =>
    css({
      display: 'none',
      marginBottom: `${spacings.TRIPLE}rem`,
      '[amp-x-topStoriesExperiment="show_at_halfway"] &': {
        display: 'block',
        [mq.GROUP_4_MIN_WIDTH]: {
          display: 'none',
        },
      },
    }),
};
