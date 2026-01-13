import { css, Theme } from '@emotion/react';
import pixelsToRem from '#app/utilities/pixelsToRem';

const styles = {
  usefulLinksWrapper: ({ fontSizes }: Theme) =>
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
      },
    }),
};

export default styles;
