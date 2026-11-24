import { css, Theme } from '@emotion/react';
import pixelsToRem from '../../utilities/pixelsToRem';

export default {
  bylineContainer: ({ spacings, mq }: Theme) =>
    css({
      paddingInlineStart: `${spacings.FULL}rem`,
      paddingBottom: `${spacings.TRIPLE}rem`,
      lineHeight: '1.35rem', // not sure I should do this due to script sizes
      [mq.GROUP_2_MIN_WIDTH]: {
        paddingInlineStart: `${spacings.DOUBLE}rem`,
      },
      [mq.GROUP_4_MIN_WIDTH]: { paddingInlineStart: 0 },
    }),

  postBylineContainer: () =>
    css({
      margin: `${pixelsToRem(16)}rem`,
    }),

  bylineContainerSingleContributor: () =>
    css({
      display: 'flex',
      flexWrap: 'wrap',
    }),

  list: () => css({ listStyle: 'none', padding: 0, margin: 0 }),
};
