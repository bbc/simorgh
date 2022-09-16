import { css, Theme } from '@emotion/react';

import pixelsToRem from '../../utilities/pixelsToRem';

const styles = {
  self: ({ palette }: Theme) =>
    css({
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
    }),
};

export default styles;
