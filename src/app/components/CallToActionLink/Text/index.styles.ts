import { css, Theme } from '@emotion/react';
import pixelsToRem from '../../../utilities/pixelsToRem';

export default {
  text: () =>
    css({
      color: 'inherit',
    }),
  defaultTextStyles: ({ palette }: Theme) =>
    css({
      borderBottom: `${pixelsToRem(1)}rem solid ${palette.GREY_10}`,
      'a:visited &': {
        color: palette.METAL,
        borderBottom: `${pixelsToRem(1)}rem solid ${palette.METAL}`,
      },
      'a:focus &, a:hover &': {
        color: palette.POSTBOX,
        borderBottom: `${pixelsToRem(2)}rem solid ${palette.POSTBOX}`,
      },
    }),
  underlineOnHoverFocus: () =>
    css({
      'a:focus &, a:hover &': {
        textDecoration: 'underline',
      },
    }),
};
