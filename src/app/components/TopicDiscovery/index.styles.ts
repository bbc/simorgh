import { css, Theme } from '@emotion/react';

const styles = {
  section: ({ spacings, mq }: Theme) =>
    css({
      marginTop: `${spacings.DOUBLE}rem`,
      [mq.GROUP_4_MIN_WIDTH]: {
        marginTop: `${spacings.TRIPLE}rem`,
      },
    }),

  heading: ({ palette, spacings, fontSizes, fontVariants }: Theme) =>
    css({
      ...fontVariants.sansBold,
      ...fontSizes.doublePica,
      color: palette.GREY_10,
      margin: 0,
      paddingBottom: `${spacings.FULL}rem`,
    }),

  tabPanel: ({ spacings }: Theme) =>
    css({
      paddingTop: `${spacings.DOUBLE}rem`,
    }),
};

export default styles;
