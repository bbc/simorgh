import { css, Theme } from '@emotion/react';
import pixelsToRem from '#app/utilities/pixelsToRem';

const styles = {
  container: ({ spacings, mq }: Theme) =>
    css({
      margin: `${spacings.TRIPLE}rem ${spacings.FULL}rem`,
      [mq.GROUP_2_MIN_WIDTH]: {
        marginLeft: `${spacings.DOUBLE}rem`,
        marginRight: `${spacings.DOUBLE}rem`,
      },
      [mq.GROUP_4_MIN_WIDTH]: { marginLeft: 0, marginRight: 0 },
    }),
  card: ({ spacings, palette }: Theme) =>
    css({
      backgroundColor: palette.WHITE,
      padding: `${spacings.DOUBLE}rem`,
    }),
  heading: ({ spacings }: Theme) =>
    css({
      paddingTop: `${spacings.DOUBLE}rem`,
      paddingBottom: `${pixelsToRem(12)}rem`,
    }),
  paragraph: () =>
    css({
      color: '#000000',
    }),
  linkBackground: () =>
    css({
      color: '#000000',
    }),
  link: () =>
    css({
      color: '#000000',
    }),
  chevron: () =>
    css({
      marginInlineStart: `${pixelsToRem(12)}rem`,
    }),
};
export default styles;
