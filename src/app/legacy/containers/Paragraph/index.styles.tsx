import { Theme, css } from '@emotion/react';

export default {
  paragraph: ({ mq, spacings }: Theme) =>
    css({
      [mq.GROUP_4_MIN_WIDTH]: { paddingInlineEnd: `${spacings.QUINTUPLE}rem` },
      paddingBottom: `${spacings.TRIPLE}rem`,
    }),
  postParagraph: ({ palette, spacings, mq }: Theme) =>
    css({
      [mq.GROUP_4_MIN_WIDTH]: { paddingInlineEnd: `${spacings.QUINTUPLE}rem` },
      // to review with UX, as colour does not automatically apply to inline links etc.
      // color: palette.BLACK,
      paddingBottom: `${spacings.DOUBLE}rem`,
    }),
};
