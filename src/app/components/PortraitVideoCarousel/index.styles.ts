import { css, Theme } from '@emotion/react';
import pixelsToRem from '#app/utilities/pixelsToRem';
import { PROMO_ITEM_WIDTH_MIN } from '.';

const styles = {
  heading: ({ fontSizes, fontVariants, palette }: Theme) =>
    css({
      ...fontVariants.sansBold,
      ...fontSizes.doublePica,
      color: palette.GREY_10,
    }),
  scrollContainer: () =>
    css({
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
    }),
  scrollWrapper: ({ spacings }: Theme) =>
    css({
      display: 'flex',
      overflowX: 'auto',
      scrollSnapType: 'x mandatory',
      gap: `${spacings.DOUBLE}rem`,
      scrollBehavior: 'smooth',
      WebkitOverflowScrolling: 'touch',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
      scrollbarWidth: 'none',
      flex: 1,
      padding: `${spacings.FULL}rem 0`,
    }),
  promo: ({ mq }: Theme) =>
    css({
      scrollSnapAlign: 'start',
      flex: '0 0 35%',
      textDecoration: 'none',
      display: 'block',
      position: 'relative',
      overflow: 'hidden',

      [mq.GROUP_3_MIN_WIDTH]: {
        flex: `0 0 ${pixelsToRem(PROMO_ITEM_WIDTH_MIN)}rem`,
      },
    }),
  endBlankItem: ({ mq }: Theme) =>
    css({
      display: 'none',

      [mq.GROUP_3_MIN_WIDTH]: {
        display: 'block',
        flex: `0 0 ${pixelsToRem(PROMO_ITEM_WIDTH_MIN / 1.5)}rem`,
      },
    }),
};

export default styles;
