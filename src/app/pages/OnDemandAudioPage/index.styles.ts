import { css, Theme } from '@emotion/react';

export default {
  wrapper: ({ mq, spacings }: Theme) =>
    css({
      [mq.GROUP_4_MIN_WIDTH]: {
        paddingTop: `${spacings.TRIPLE}rem`,
      },
    }),
  paragraph: ({ mq }: Theme) =>
    css({
      [mq.GROUP_1_AND_GROUP_2]: {
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridColumnEnd: 'span 4',
      },
    }),
  image: ({ mq }: Theme) =>
    css({
      [mq.GROUP_1_AND_GROUP_2]: {
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridColumnEnd: 'span 2',
      },
    }),
};
