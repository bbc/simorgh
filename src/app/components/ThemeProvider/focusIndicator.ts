import { css, Theme } from '@emotion/react';
import pixelsToRem from '../../utilities/pixelsToRem';

export const focusIndicatorThickness = `${pixelsToRem(3)}rem`; // 3px

const focusIndicator = ({ palette }: Theme) => css`
  // Adds focus indicator styling to all a, button and h3 elements by default.
  a:focus-visible,
  button:focus-visible,
  button[type='submit']:focus-visible,
  button[type='button']:focus-visible,
  h3:focus-visible {
    outline: ${focusIndicatorThickness} solid ${palette.BLACK};
    box-shadow: 0 0 0 ${focusIndicatorThickness} ${palette.WHITE};
    outline-offset: ${focusIndicatorThickness};
  }

  // Removes focus indicator styling and stops default browser styling from displaying.
  a.focusIndicatorRemove:focus-visible,
  button.focusIndicatorRemove:focus-visible {
    outline: none;
    box-shadow: none;
    outline-offset: 0;
  }

  // Adds display: block to focus indicator styling
  a.focusIndicatorDisplayBlock:focus-visible {
    display: block;
  }

  // Adds display: inline-block to focus indicator styling
  a.focusIndicatorDisplayInlineBlock:focus-visible {
    display: inline-block;
    width: 100%;
  }

  // Adds display:table-cell to focus indicator styling
  a.focusIndicatorDisplayTableCell:focus-visible {
    display: table-cell;
  }

  // Overrides focus indicator styles with a thinner version of the focus indicator. E.g. for inline links.
  a.focusIndicatorReducedWidth:focus-visible {
    outline: ${pixelsToRem(2)}rem solid ${palette.BLACK};
    box-shadow: 0 0 0 ${pixelsToRem(1)}rem ${palette.WHITE};
    outline-offset: ${pixelsToRem(1)}rem;
  }

  // Overrides focus indicator styles with just a black outline. Used when a red border is already applied. E.g. Pagination.
  a.focusIndicatorOutlineBlack:focus-visible {
    outline: ${focusIndicatorThickness} solid ${palette.BLACK};
    box-shadow: none;
    outline-offset: 0;
  }

  // Overrides focus indicator styles with inverted colours. Used on a dark background page. E.g. Episode lists.
  a.focusIndicatorInvert:focus-visible,
  button.focusIndicatorInvert:focus-visible {
    outline: ${focusIndicatorThickness} solid ${palette.WHITE};
    box-shadow: 0 0 0 ${focusIndicatorThickness} ${palette.BLACK};
    outline-offset: ${focusIndicatorThickness};
  }

  // Overrides focus indicator styles with a thinner version in inverted colours. E.g. for links on coloured backgrounds.
  a.focusIndicatorReducedWidthInverted:focus-visible {
    outline: ${pixelsToRem(2)}rem solid ${palette.WHITE};
    box-shadow: 0 0 0 ${pixelsToRem(1)}rem ${palette.BLACK};
    outline-offset: ${pixelsToRem(1)}rem;
  }
`;

export default focusIndicator;
