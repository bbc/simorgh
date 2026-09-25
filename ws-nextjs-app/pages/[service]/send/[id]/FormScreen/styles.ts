import pixelsToRem from '#app/utilities/pixelsToRem';
import { Theme, css } from '@emotion/react';
import { getInlineLinkStyles } from '../styles';

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
  fieldset: ({ spacings, palette, mq }: Theme) =>
    css({
      border: 0,
      margin: 0,
      padding: 0,
      width: '100%',
      marginTop: `${spacings.DOUBLE}rem`,
      paddingBottom: `${spacings.DOUBLE}rem`,
      borderBottom: `${pixelsToRem(1)}rem solid ${palette.GREY_5}`,
      '&:first-of-type': {
        marginTop: 0,
      },
      '&:last-of-type': {
        paddingBottom: 0,
        borderBottom: 'none',
      },
      [mq.GROUP_2_MIN_WIDTH]: {
        marginTop: `${spacings.TRIPLE}rem`,
        paddingBottom: `${spacings.TRIPLE}rem`,
        '&:first-of-type': {
          marginTop: 0,
        },
      },
    }),
  legend: () =>
    css({
      display: 'block',
      margin: 0,
      maxWidth: '100%',
      padding: 0,
      width: '100%',
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
