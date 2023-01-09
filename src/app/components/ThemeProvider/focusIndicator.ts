import { css, Theme } from '@emotion/react';
import pixelsToRem from '../../utilities/pixelsToRem';

// export const globalStyles = css({
//   '&a:focus-visible': {
//     backgroundColor: yellow,
//   },
// });

const focusIndicator = ({ palette }: Theme) => css`
  a:focus {
    outline: ${pixelsToRem(3)}rem solid ${palette.BLACK};
    box-shadow: 0 0 0 ${pixelsToRem(3)}rem ${palette.WHITE};
    outline-offset: ${pixelsToRem(3)}rem;
  }

  a:focus:not(:focus-visible) {
    outline: none;
    box-shadow: none;
    outline-offset: 0;
  }

  a:focus-visible {
    outline: ${pixelsToRem(3)}rem solid ${palette.BLACK};
    box-shadow: 0 0 0 ${pixelsToRem(3)}rem ${palette.WHITE};
    outline-offset: ${pixelsToRem(3)}rem;
  }

  .someClassName {
    background-color: yellow;
  }
`;

export default focusIndicator;
