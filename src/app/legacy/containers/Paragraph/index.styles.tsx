import { Theme, css } from '@emotion/react';

export default {
  paragraph: ({ mq, spacings, isDarkUi, palette }: Theme) =>
    css({
      color: isDarkUi ? palette.GREY_2 : palette.GREY_10,
      [mq.GROUP_4_MIN_WIDTH]: { paddingInlineEnd: `${spacings.QUINTUPLE}rem` },
    }),
  doubleSpacing: ({ spacings }: Theme) =>
    css({
      // to review with UX, as colour does not automatically apply to inline links etc.
      // color: palette.BLACK,
      paddingBottom: `${spacings.DOUBLE}rem`,
    }),
  tripleSpacing: ({ spacings }: Theme) =>
    css({
      paddingBottom: `${spacings.TRIPLE}rem`,
    }),
};
