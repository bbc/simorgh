import { css, Theme } from '@emotion/react';
import pixelsToRem from '../../../../../src/app/utilities/pixelsToRem';

export default {
  wrapper: () =>
    css({
      maxWidth: `${pixelsToRem(1008)}rem`,
      margin: `${pixelsToRem(20)}rem auto`,
    }),
  code: ({ fontVariants }: Theme) =>
    css({
      whiteSpace: 'pre-wrap',
      maxHeight: '50vh',
      overflow: 'auto',
      backgroundColor: '#f6f8fa',
      padding: `${pixelsToRem(20)}rem`,
      borderRadius: `${pixelsToRem(12)}rem`,

      '& > ul': {
        margin: 0,
        padding: 0,
        listStyle: 'none',
        ...fontVariants.serifBold,
      },
    }),
};
