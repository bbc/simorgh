import { css, Theme } from '@emotion/react';

const styles = {
  embedDiv: ({ spacings, mq, palette }: Theme) =>
    css({
      backgroundColor: palette.GHOST,
      maxWidth: '100%',
      paddingLeft: `${spacings.FULL}rem`,
      paddingRight: `${spacings.FULL}rem`,
      paddingTop: `${spacings.TRIPLE}rem`,
      paddingBottom: `${spacings.TRIPLE}rem`,
      margin: `${spacings.TRIPLE}rem ${spacings.DOUBLE}rem`,
      [mq.GROUP_2_MIN_WIDTH]: {
        paddingLeft: `${spacings.DOUBLE}rem`,
        paddingRight: `${spacings.DOUBLE}rem`,
      },
      [mq.GROUP_4_MIN_WIDTH]: {
        marginRight: `0`,
        marginLeft: `0`,
      },
    }),
  errorLink: ({ fontVariants }: Theme) =>
    css({
      ...fontVariants.sansBold,
    }),
  errorMessage: ({ fontVariants }: Theme) =>
    css({
      ...fontVariants.sansRegular,
    }),
};

export default styles;
