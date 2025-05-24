import { css, Theme } from '@emotion/react';
import { calculateVariedNavContainerWidths } from './utils/styleUtils';

const styles = {
  section: ({ mq, spacings }: Theme) =>
    css({
      margin: `${spacings.DOUBLE}rem 0`,
      [mq.GROUP_1_MIN_WIDTH]: {
        margin: `${spacings.TRIPLE}rem 0`,
      },
      [mq.GROUP_3_MIN_WIDTH]: {
        margin: `${spacings.DOUBLE}rem 0`,
      },
    }),
  heading: ({ fontSizes, fontVariants, palette, mq, spacings }: Theme) =>
    css({
      display: 'inline-block',
      ...fontVariants.sansBold,
      ...fontSizes.doublePica,
      color: palette.GREY_10,
      margin: `${spacings.DOUBLE}rem 0 0 0`,
      [mq.GROUP_3_MIN_WIDTH]: {
        margin: `${spacings.DOUBLE}rem 0 00`,
      },
    }),
  carouselContainer: () =>
    css({
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
    }),
  carousel: ({ spacings, mq }: Theme) =>
    css({
      display: 'flex',
      flex: 1,
      overflowX: 'auto',
      scrollSnapType: 'x mandatory',
      padding: `${spacings.DOUBLE}rem 0`,
      columnGap: `${spacings.FULL}rem`,
      [mq.GROUP_3_MIN_WIDTH]: {
        columnGap: `${spacings.DOUBLE}rem`,
        padding: `${spacings.TRIPLE}rem 0`,
      },
      scrollBehavior: 'smooth',
      WebkitOverflowScrolling: 'touch',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
      scrollbarWidth: 'none',
      '&:after': {
        content: '""',
        display: 'none',
        flexGrow: 0,
        flexShrink: 0,
        ...calculateVariedNavContainerWidths({
          mq,
          display: 'block',
          widthParameter: 'flexBasis',
        }),
      },
    }),
};

export default styles;
