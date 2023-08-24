import { css, Theme } from '@emotion/react';

const styles = {
  embedDiv: ({ spacings, mq, palette }: Theme) =>
    css({
      backgroundColor: palette.WHITE,
      maxWidth: '100%',
      margin: `0 ${spacings.FULL}rem ${spacings.TRIPLE}rem`,
      padding: `${spacings.DOUBLE}rem`,
      [mq.GROUP_2_MIN_WIDTH]: {
        margin: `0 ${spacings.DOUBLE}rem ${spacings.TRIPLE}rem`,
      },
      [mq.GROUP_4_MIN_WIDTH]: {
        margin: `0 0 ${spacings.TRIPLE}rem`,
      },
    }),
  errorLinkWrapper: ({ fontVariants, spacings }: Theme) =>
    css({
      ...fontVariants.sansBold,
      paddingTop: `${spacings.FULL}rem`,
    }),
  inlineLink: ({ palette, fontVariants, fontSizes }: Theme) =>
    css({
      color: palette.BLACK,
      borderBottom: `1px solid black`,
      ...fontVariants.sansRegular,
      ...fontSizes.bodyCopy,
    }),
};

export default styles;
