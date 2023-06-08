import { css, Theme } from '@emotion/react';
import pixelsToRem from '../../../../../../src/app/utilities/pixelsToRem';

export default {
  postItem: ({ palette }: Theme) =>
    css({
      backgroundColor: palette.WHITE,
      padding: `${pixelsToRem(16)}rem`,

      '&:not(:last-child)': {
        marginBottom: `${pixelsToRem(16)}rem`,
      },
    }),
};
