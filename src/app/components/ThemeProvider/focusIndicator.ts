import { css, Theme } from '@emotion/react';
import pixelsToRem from '../../utilities/pixelsToRem';

const focusIndicator = ({ palette }: Theme) => css`
  a:focus-visible {
    outline: ${pixelsToRem(3)}rem solid ${palette.BLACK};
    box-shadow: 0 0 0 ${pixelsToRem(3)}rem ${palette.WHITE};
    outline-offset: ${pixelsToRem(3)}rem;
  }

  button:focus-visible {
    outline: ${pixelsToRem(3)}rem solid ${palette.BLACK};
    box-shadow: 0 0 0 ${pixelsToRem(3)}rem ${palette.WHITE};
    outline-offset: ${pixelsToRem(3)}rem;
  }

  // reverts focus indicator styling. Display default browser styling
  a.focusIndicatorRevert:focus-visible {
    outline: revert;
    box-shadow: revert;
    outline-offset: revert;
  }

  // removes focus indicator styling. Stops default browser styling from displaying. Removed a. as also applies to Navbar button
  .focusIndicatorRemove:focus-visible {
    outline: none;
    box-shadow: none;
    outline-offset: 0;
  }

  // add block display default styling
  a.focusIndicatorDisplayBlock:focus-visible {
    display: block;
  }

  // add inline-block display default styling
  a.focusIndicatorDisplayInlineBlock:focus-visible {
    display: inline-block;
    width: 100%;
  }

  // add table-cell display default styling
  a.focusIndicatorDisplayTableCell:focus-visible {
    display: table-cell;
  }

  // Overrides global styles with a thinner version of the focus indicator. E.g. for inline links.
  a.focusIndicatorReducedWidth:focus-visible {
    outline: ${pixelsToRem(2)}rem solid ${palette.BLACK};
    box-shadow: 0 0 0 ${pixelsToRem(1)}rem ${palette.WHITE};
    outline-offset: ${pixelsToRem(1)}rem;
  }

  // Overrides global style with just a black outline. Used when a red border is already applied. E.g. Pagination.
  a.focusIndicatorOutlineBlack:focus-visible {
    outline: ${pixelsToRem(3)}rem solid ${palette.BLACK};
    box-shadow: none;
    outline-offset: 0;
  }

  a.focusIndicatorInvert:focus-visible {
    outline: ${pixelsToRem(3)}rem solid ${palette.WHITE};
    box-shadow: 0 0 0 ${pixelsToRem(3)}rem ${palette.BLACK};
    outline-offset: ${pixelsToRem(3)}rem;
  }
`;

export default focusIndicator;
