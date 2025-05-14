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
  link: ({ palette, fontVariants, fontSizes }: Theme) =>
    css({
      color: palette.GREY_10,
      textDecoration: 'none',
      ...fontSizes.pica,
      ...fontVariants.sansBold,
      overflow: 'hidden',
      '&:visited': {
        color: palette.GREY_6,
      },
      '&:hover, &:focus': {
        textDecoration: 'underline',
        textDecorationThickness: `${pixelsToRem(2)}rem`,
      },
      '::before': {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        content: '""',
      },
    }),
};

export default styles;
