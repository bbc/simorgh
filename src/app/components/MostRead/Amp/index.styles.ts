import { css, Theme } from '@emotion/react';

const styles = {
  paragraph: ({ palette, fontVariants, fontSizes }: Theme) =>
    css({
      color: palette.SHADOW,
      margin: 0,
      ...fontVariants.sansRegular,
      ...fontSizes.bodyCopy,
    }),
};

export default styles;
