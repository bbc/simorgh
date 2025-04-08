import { css, Theme } from '@emotion/react';
import pixelsToRem from '../../../utilities/pixelsToRem';

export default {
  text: () =>
    css({
      verticalAlign: 'middle',
      color: 'inherit',
    }),
  bottomBorder: ({ palette }: Theme) =>
    css({
      borderBottom: `${pixelsToRem(1)}rem solid ${palette.GREY_10}`, // with Chevron
      'a:visited &': {
        borderBottom: `${pixelsToRem(1)}rem solid ${palette.METAL}`, // with Chevron
      },
      'a:focus &, a:hover &': {
        borderBottom: `${pixelsToRem(2)}rem solid ${palette.POSTBOX}`, // with Chevron
      },
    }),
  underlineOnHoverFocus: () =>
    css({
      'a:focus &, a:hover &': {
        textDecoration: 'underline',
      },
    }),
};
