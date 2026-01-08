import { css, Theme } from '@emotion/react';
import pixelsToRem from '#app/utilities/pixelsToRem';

const styles = {
  container: ({ spacings }: Theme) =>
    css({
      marginTop: `${spacings.QUADRUPLE}rem`,
      marginBottom: `${spacings.TRIPLE}rem`,
    }),
  heading: ({ fontSizes, fontVariants }: Theme) =>
    css({
      ...fontSizes.doublePica,
      ...fontVariants.sansBold,
      marginBottom: `${pixelsToRem(12)}rem`,
    }),
  unorderedList: ({ spacings, mq }: Theme) =>
    css({
      padding: 0,
      margin: 0,
      display: 'grid',
      listStyleType: 'none',
      columnGap: `${spacings.TRIPLE}rem`,
      [mq.GROUP_2_MIN_WIDTH]: {
        gridTemplateColumns: 'repeat(2, 1fr)',
      },
    }),
  item: ({ spacings }: Theme) =>
    css({
      position: 'relative',
      display: 'flex',
      minWidth: '0',
      alignItems: 'center',
      gap: `${spacings.FULL}rem`,
    }),
  link: ({ palette, fontVariants, fontSizes, isDarkUi }: Theme) =>
    css({
      color: isDarkUi ? palette.GREY_2 : palette.GREY_10,
      textDecoration: 'none',
      ...fontSizes.pica,
      ...fontVariants.sansBold,
      paddingTop: `${pixelsToRem(12)}rem`,
      paddingBottom: `${pixelsToRem(12)}rem`,
      width: '100%',
      '&:visited': {
        color: isDarkUi ? palette.GREY_4 : palette.GREY_6,
      },
      '&:hover, &:focus': {
        textDecoration: 'underline',
      },
    }),
};

export default styles;
