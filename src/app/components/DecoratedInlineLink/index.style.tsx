import { Theme, css } from '@emotion/react';

export default {
  InlineLink: ({ palette, isDarkUi }: Theme) =>
    css({
      color: isDarkUi ? palette.GREY_2 : palette.EBON,
      borderBottom: `1px solid ${palette.POSTBOX}`,
      textDecoration: 'none',
      ' &:visited': {
        color: palette.METAL,
        borderBottom: `1px solid ${palette.METAL}`,
      },
      '&:focus, &:hover': {
        borderBottom: `2px solid ${palette.POSTBOX}`,
        color: palette.POSTBOX,
      },
    }),
};
