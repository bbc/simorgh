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
      },
    }),
  legend: () =>
    css({
      display: 'block',
      margin: 0,
      padding: 0,
      width: '100%',
    }),
  description: ({ palette, fontVariants, fontSizes }: Theme) =>
    css({
      ...fontVariants.sansRegular,
      ...fontSizes.bodyCopy,
      p: { color: palette.BLACK },
      a: { ...getInlineLinkStyles(palette), ...fontVariants.sansBold },
    }),
  formDescription: ({ palette, spacings, mq }: Theme) =>
    css({
      borderBottom: `${pixelsToRem(1)}rem solid ${palette.GREY_5}`,
      marginBottom: `${spacings.DOUBLE}rem`,
      [mq.GROUP_2_MIN_WIDTH]: {
        paddingBottom: `${spacings.FULL}rem`,
        marginBottom: `${spacings.TRIPLE}rem`,
      },
    }),
  fieldsetDescription: ({ spacings }: Theme) =>
    css({
      marginTop: `${spacings.DOUBLE}rem`,
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
