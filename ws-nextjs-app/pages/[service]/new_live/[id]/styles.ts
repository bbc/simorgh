import { css } from '@emotion/react';
import pixelsToRem from '../../../../../src/app/utilities/pixelsToRem';

export default {
  wrapper: () =>
    css({
      maxWidth: `${pixelsToRem(1008)}rem`,
      margin: `${pixelsToRem(20)}rem auto`,
    }),
  code: () =>
    css({
      whiteSpace: 'pre-wrap',
      maxHeight: '50vh',
      overflow: 'auto',
      backgroundColor: '#f6f8fa',
      padding: `${pixelsToRem(20)}rem`,
      borderRadius: `${pixelsToRem(12)}rem`,

      '& > h4': {
        textDecoration: 'underline',
        marginBottom: `${pixelsToRem(10)}rem`,
      },

      '& > p': {
        margin: '0.25rem 0',
      },
    }),
};
