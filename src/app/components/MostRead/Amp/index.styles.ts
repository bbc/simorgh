import { css, Theme } from '@emotion/react';

const styles = {
  paragraph: ({ palette, fontVariants, fontSizes }: Theme) =>
    css({
      color: palette.GREY_7,
      margin: 0,
      ...fontVariants.sansRegular,
      ...fontSizes.bodyCopy,
    }),
};

export default styles;
