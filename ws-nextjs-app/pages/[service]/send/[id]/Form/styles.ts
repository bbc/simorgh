import pixelsToRem from '#app/utilities/pixelsToRem';
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
  heading: () =>
    css({
      '&:focus': {
        outline: 'none',
      },
    }),
  description: ({ palette, spacings, fontVariants, fontSizes, mq }: Theme) =>
    css({
      borderBottom: `${pixelsToRem(1)}rem solid ${palette.GREY_5}`,
      marginBottom: `${spacings.DOUBLE}rem`,

      ...fontVariants.sansRegular,
      ...fontSizes.bodyCopy,

      [mq.GROUP_2_MIN_WIDTH]: {
        paddingBottom: `${spacings.FULL}rem`,
        marginBottom: `${spacings.TRIPLE}rem`,
      },
    }),
  privacyNotice: ({ fontVariants, fontSizes }: Theme) =>
    css({
      ...fontVariants.sansRegular,
      ...fontSizes.brevier,
    }),
  privacyHeading: ({ fontVariants, fontSizes }: Theme) =>
    css({
      ...fontVariants.sansBold,
      ...fontSizes.brevier,
    }),
};
