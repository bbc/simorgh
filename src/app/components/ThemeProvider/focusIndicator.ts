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

  // a.someClassName:focus-visible {
  //   background-color: yellow;
  // }
`;

export default focusIndicator;
