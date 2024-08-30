import { css, Theme } from '@emotion/react';
import { GROUP_2_MAX_WIDTH_BP } from '#app/components/ThemeProvider/mediaQueries';

export const GROUP_1_FROM_360PX_AND_GROUP_2 = `@media (min-width: 22.5rem) and (max-width: ${GROUP_2_MAX_WIDTH_BP}rem)`;

export default {
  wrapper: ({ mq, spacings }: Theme) =>
    css({
      [mq.GROUP_4_MIN_WIDTH]: {
        paddingTop: `${spacings.TRIPLE}rem`,
      },
    }),
  paragraph: () =>
    css({
      [GROUP_1_FROM_360PX_AND_GROUP_2]: {
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridColumnEnd: 'span 4',
      },
    }),
  image: () =>
    css({
      [GROUP_1_FROM_360PX_AND_GROUP_2]: {
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridColumnEnd: 'span 2',
      },
    }),
};
