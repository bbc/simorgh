import { css, Theme } from '@emotion/react';
import pixelsToRem from '../../utilities/pixelsToRem';

const focusIndicator = ({ palette }: Theme) => css`
  // default styling
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

  // reverts custom styling. Display default browser styling
  a.focusIndicatorRevert:focus {
    outline: revert;
    box-shadow: revert;
    outline-offset: revert;
  }

  a.focusIndicatorRevert:focus-visible {
    outline: revert;
    box-shadow: revert;
    outline-offset: revert;
  }

  // removes custom styling. Stops default browser styling from displaying
  a.focusIndicatorRemove:focus {
    outline: none;
    box-shadow: none;
    outline-offset: 0;
  }

  a.focusIndicatorRemove:focus-visible {
    outline: none;
    box-shadow: none;
    outline-offset: 0;
  }

  // add block display default styling
  a.focusIndicatorDisplayBlock:focus {
    display: block;
  }

  a.focusIndicatorDisplayBlock:focus:not(:focus-visible) {
    display: revert;
  }

  a.focusIndicatorDisplayBlock:focus-visible {
    display: block;
  }

  // add inline-block display default styling
  a.focusIndicatorDisplayInlineBlock:focus {
    display: inline-block;
    width: 100%;
  }

  a.focusIndicatorDisplayInlineBlock:focus:not(:focus-visible) {
    display: revert;
    width: revert;
  }

  a.focusIndicatorDisplayInlineBlock:focus-visible {
    display: inline-block;
    width: 100%;
  }

  // add table-cell display default styling
  a.focusIndicatorDisplayTableCell:focus {
    display: table-cell;
  }

  a.focusIndicatorDisplayTableCell:focus:not(:focus-visible) {
    display: revert;
  }

  a.focusIndicatorDisplayTableCell:focus-visible {
    display: table-cell;
  }

  a.focusIndicatorReducedWidth:focus {
    outline: ${pixelsToRem(2)}rem solid ${palette.BLACK};
    box-shadow: 0 0 0 ${pixelsToRem(1)}rem ${palette.WHITE};
    outline-offset: ${pixelsToRem(1)}rem;
  }

  a.focusIndicatorReducedWidth:focus:not(:focus-visible) {
    outline: none;
    box-shadow: none;
    outline-offset: 0;
  }

  a.focusIndicatorReducedWidth:focus-visible {
    outline: ${pixelsToRem(2)}rem solid ${palette.BLACK};
    box-shadow: 0 0 0 ${pixelsToRem(1)}rem ${palette.WHITE};
    outline-offset: ${pixelsToRem(1)}rem;
  }
`;

export default focusIndicator;
