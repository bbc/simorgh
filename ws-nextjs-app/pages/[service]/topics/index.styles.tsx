import { css, Theme } from '@emotion/react';
import pixelsToRem from '#app/utilities/pixelsToRem';

const styles = {
  usefulLinksWrapper: ({ fontSizes, palette }: Theme) =>
    css({
      maxWidth: `${pixelsToRem(700)}rem`,
      margin: '0 auto',

      '& ul': {
        gridTemplateColumns: '1fr !important',
      },

      '& h2': {
        ...fontSizes.trafalgar,
      },

      '& a': {
        fontSize: `${pixelsToRem(18)}rem`,

        '&:hover': {
          color: palette.ARCHIVE_BLUE,
        },

        '&:visited': {
          color: palette.GREY_6,
        },
      },
    }),
};

export default styles;
