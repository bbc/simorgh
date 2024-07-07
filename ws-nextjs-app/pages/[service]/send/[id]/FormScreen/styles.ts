import pixelsToRem from '#app/utilities/pixelsToRem';
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
      p: { color: palette.BLACK },
      a: { ...getInlineLinkStyles(palette), ...fontVariants.sansBold },
    }),
  privacyNotice: ({ palette, fontVariants, fontSizes }: Theme) =>
    css({
      ...fontVariants.sansRegular,
      ...fontSizes.longPrimer,
      p: { color: palette.BLACK },
      a: getInlineLinkStyles(palette),
    }),

  privacyHeading: ({ fontVariants, fontSizes, palette }: Theme) =>
    css({
      color: palette.BLACK,
      ...fontVariants.sansBold,
      ...fontSizes.longPrimer,
    }),
  privacyContainer: ({ spacings }: Theme) =>
    css({
      marginTop: `${spacings.DOUBLE}rem`,
    }),
};
