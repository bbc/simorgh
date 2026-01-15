import { css, Theme } from '@emotion/react';
import pixelsToRem from '#app/utilities/pixelsToRem';

const styles = {
  usefulLinksWrapper: ({ fontSizes, palette, mq, spacings }: Theme) =>
    css({
      width: '100%',
      maxWidth: `clamp(${pixelsToRem(600)}rem, 70vw, ${pixelsToRem(1008)}rem)`,
      margin: '0 auto',

      paddingInlineStart: `${spacings.DOUBLE}rem`,
      paddingInlineEnd: `${spacings.DOUBLE}rem`,

      // 600px +
      [mq.GROUP_3_MIN_WIDTH]: {
        paddingInlineStart: `${pixelsToRem(96)}rem`,
        paddingInlineEnd: `${pixelsToRem(96)}rem`,
      },

      // 1008px+
      [mq.GROUP_4_MIN_WIDTH]: {
        paddingInlineStart: `${pixelsToRem(40)}rem`,
        paddingInlineEnd: `${pixelsToRem(40)}rem`,
      },

      // 1280px +
      [mq.GROUP_5_MIN_WIDTH]: {
        marginInlineStart: `${pixelsToRem(200)}rem`,
        marginInlineEnd: `${pixelsToRem(200)}rem`,
      },

      '& ul': {
        gridTemplateColumns: '1fr !important',
      },

      '& h2': {
        ...fontSizes.trafalgar,
      },

      '& a': {
        fontSize: `${pixelsToRem(18)}rem`,
        '&:hover': { color: palette.ARCHIVE_BLUE },
        '&:visited': { color: palette.GREY_6 },
      },
    }),
};

export default styles;
