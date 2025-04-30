import { css, Theme } from '@emotion/react';
import pixelsToRem from '#app/utilities/pixelsToRem';

const styles = {
  container: () =>
    css({
      // TODO: Double check re. section padding; Should it be controlled on the items instead?
      paddingTop: `${pixelsToRem(32)}rem`,
      paddingBottom: `${pixelsToRem(32)}rem`,
    }),
  heading: ({ fontSizes, fontVariants }: Theme) =>
    css({
      paddingTop: `${pixelsToRem(24)}rem`,
      paddingBottom: `${pixelsToRem(32)}rem`,
      ...fontSizes.doublePica,
      ...fontVariants.sansBold,
    }),
  unorderedList: ({ spacings, mq }: Theme) =>
    css({
      padding: 0,
      margin: 0,
      // TODO: Double check re. grid.
      display: 'grid',
      listStyleType: 'none',
      gridGap: `${spacings.DOUBLE}rem`,

      [mq.GROUP_2_MIN_WIDTH]: {
        gridTemplateColumns: 'repeat(2, 1fr)',
      },

      [mq.GROUP_4_MIN_WIDTH]: {
        gridTemplateColumns: 'repeat(4, 1fr)',
      },
    }),
  item: () =>
    css({
      position: 'relative',
      display: 'flex',
      gap: '1rem',
      alignItems: 'center',
    }),
  image: ({ mq }: Theme) =>
    css({
      // TODO - Review img src too;
      width: `${pixelsToRem(80)}rem`,
      height: `${pixelsToRem(80)}rem`,

      [mq.GROUP_2_MIN_WIDTH]: {
        width: `${pixelsToRem(55)}rem`,
        height: `${pixelsToRem(55)}rem`,
      },

      [mq.GROUP_3_MIN_WIDTH]: {
        width: `${pixelsToRem(80)}rem`,
        height: `${pixelsToRem(80)}rem`,
      },

      [mq.GROUP_4_MIN_WIDTH]: {
        width: `${pixelsToRem(67)}rem`,
        height: `${pixelsToRem(67)}rem`,
      },
    }),
  link: () =>
    css({
      // Temp: Note: the approach to make the "image" clickable without wrapping it by <a/>
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
