import { Theme, css } from '@emotion/react';
import { getInlineLinkStyles } from '#app/components/InlineLink/index.styles';

export default {
  submissionError: () =>
    css({
      color: 'black',
      fontFamily: 'sans-serif',
      backgroundColor: 'pink',
      padding: '1rem',
      margin: '1rem 0',
    }),

  privacyNotice: ({ palette, fontVariants, fontSizes }: Theme) =>
    css({
      ...fontVariants.sansRegular,
      ...fontSizes.brevier,
      p: { color: palette.BLACK },
      a: getInlineLinkStyles(palette),
    }),

  privacyHeading: ({ fontVariants, fontSizes }: Theme) =>
    css({
      ...fontVariants.sansBold,
      ...fontSizes.brevier,
    }),
};
