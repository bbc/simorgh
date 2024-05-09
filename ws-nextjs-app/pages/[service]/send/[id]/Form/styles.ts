import { Theme, css } from '@emotion/react';

export default {
  submissionError: () =>
    css({
      color: 'black',
      fontFamily: 'sans-serif',
      backgroundColor: 'pink',
      padding: '1rem',
      margin: '1rem 0',
    }),

  privacyNotice: ({ fontVariants, fontSizes }: Theme) =>
    css({
      ...fontVariants.sansRegular,
      ...fontSizes.bodyCopy,
    }),
  privacyHeading: ({ fontVariants, fontSizes }: Theme) =>
    css({
      ...fontVariants.sansBold,
      ...fontSizes.bodyCopy,
    }),
};
