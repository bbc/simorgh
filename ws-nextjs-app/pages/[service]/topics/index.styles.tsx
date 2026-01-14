import { css, Theme } from '@emotion/react';
import pixelsToRem from '#app/utilities/pixelsToRem';

const styles = {
  usefulLinksWrapper: ({ fontSizes, palette, mq, spacings }: Theme) =>
    css({
      width: '100%',
      maxWidth: `${pixelsToRem(700)}rem`,
      margin: '0 auto',
      paddingInlineStart: `${spacings.DOUBLE}rem`,
      paddingInlineEnd: `${spacings.DOUBLE}rem`,

      [mq.GROUP_3_MIN_WIDTH]: {
        paddingInlineStart: `${pixelsToRem(96)}rem`,
        paddingInlineEnd: `${spacings.DOUBLE}rem`,
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
