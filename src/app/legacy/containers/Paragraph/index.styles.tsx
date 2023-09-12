import { Theme, css } from '@emotion/react';

export default {
  paragraph: ({ mq, spacings, isDarkUi, palette }: Theme) =>
    css({
      color: isDarkUi ? palette.GREY_2 : palette.GREY_10,
      [mq.GROUP_4_MIN_WIDTH]: { paddingInlineEnd: `${spacings.QUINTUPLE}rem` },
      paddingBottom: `${spacings.TRIPLE}rem`,
    }),
};
