import { css, Theme } from '@emotion/react';
import pixelsToRem from '#app/utilities/pixelsToRem';

const styles = {
  container: css({
    width: '100%',
  }),

  usefulLinksWrapper: ({ fontSizes, palette, mq, spacings }: Theme) =>
    css({
      width: '100%',
      margin: '0 auto',
      paddingInline: `${spacings.DOUBLE}rem`,

      [mq.GROUP_3_MIN_WIDTH]: {
        paddingInline: `${pixelsToRem(120)}rem`,
      },

      [mq.GROUP_4_MIN_WIDTH]: {
        maxWidth: `${pixelsToRem(1008)}rem`,
        paddingInline: `${pixelsToRem(200)}rem`,
      },

      [mq.GROUP_5_MIN_WIDTH]: {
        maxWidth: `${pixelsToRem(1008)}rem`,
        paddingInline: `${pixelsToRem(100)}rem`,
        margin: '0 auto',
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
