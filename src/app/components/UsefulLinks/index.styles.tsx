import { css, Theme } from '@emotion/react';
import pixelsToRem from '#app/utilities/pixelsToRem';

const styles = {
  container: ({ spacings }: Theme) =>
    css({
      marginTop: `${spacings.QUADRUPLE}rem`,
      marginBottom: `${spacings.TRIPLE}rem`,
    }),
  heading: ({ fontSizes, fontVariants, spacings }: Theme) =>
    css({
      ...fontSizes.doublePica,
      ...fontVariants.sansBold,
      marginBottom: `${spacings.TRIPLE}rem`,
    }),
  unorderedList: ({ spacings, mq }: Theme) =>
    css({
      padding: 0,
      margin: 0,
      display: 'grid',
      listStyleType: 'none',
      gap: `${spacings.DOUBLE}rem`,
      [mq.GROUP_2_MIN_WIDTH]: {
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: `${spacings.TRIPLE}rem`,
      },
    }),
  item: ({ spacings, mq }: Theme) =>
    css({
      position: 'relative',
      display: 'flex',
      minWidth: '0',
      alignItems: 'center',
      gap: `${spacings.FULL}rem`,
      [mq.GROUP_3_MIN_WIDTH]: {
        gap: `${spacings.DOUBLE}rem`,
      },
    }),
  link: ({ palette, fontVariants, fontSizes, mq }: Theme) =>
    css({
      color: palette.GREY_10,
      textDecoration: 'none',
      ...fontSizes.pica,
      ...fontVariants.sansBold,
      '&:visited': {
        color: palette.GREY_6,
      },
      '&:hover, &:focus': {
        textDecoration: 'underline',
        textDecorationThickness: `${pixelsToRem(2)}rem`,
      },
      '::before': {
        [mq.GROUP_3_MIN_WIDTH]: {
          top: `${pixelsToRem(-12)}rem`,
          bottom: `${pixelsToRem(-12)}rem`,
          insetBlock: `${pixelsToRem(-12)}rem`,
        },
        position: 'absolute',
        top: `${pixelsToRem(-6)}rem`,
        right: 0,
        bottom: `${pixelsToRem(-6)}rem`,
        left: 0,
        content: '""',
        insetBlock: `${pixelsToRem(-6)}rem`,
        insetInline: '0px',
      },
    }),
};

export default styles;
