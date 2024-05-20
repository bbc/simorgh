import { css, Theme } from '@emotion/react';

import pixelsToRem from '../../utilities/pixelsToRem';

export const getInlineLinkStyles = (palette: Theme['palette']) => ({
  color: palette.EBON,
  borderBottom: `${pixelsToRem(1)}rem solid ${palette.POSTBOX}`,
  textDecoration: 'none',
  '&:visited': {
    color: palette.METAL,
    borderBottom: `${pixelsToRem(1)}rem solid ${palette.METAL}`,
  },
  '&:focus, &:hover': {
    borderBottom: `${pixelsToRem(2)}rem solid ${palette.POSTBOX}`,
    color: palette.POSTBOX,
  },
});

export const styles = {
  self: ({ palette }: Theme) => css(getInlineLinkStyles(palette)),
};
