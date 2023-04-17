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
      paddingLeft: `${spacings.DOUBLE}rem`,
      paddingRight: `${spacings.DOUBLE}rem`,
    }),
  heading: ({ spacings }: Theme) =>
    css({
      paddingTop: `${spacings.DOUBLE}rem`,
      paddingBottom: `${pixelsToRem(12)}rem`,
    }),
  linkContainer: () =>
    css({
      display: 'flex',
      justifyContent: 'start',
    }),
  linkBackground: ({ spacings, palette }: Theme) =>
    css({
      padding: `${pixelsToRem(11)}rem 
      ${pixelsToRem(15)}rem 
      ${pixelsToRem(13)}rem 
      ${spacings.DOUBLE}rem`,
      marginTop: `${spacings.DOUBLE}rem`,
      marginBottom: `${spacings.DOUBLE}rem`,
      backgroundColor: palette.GREY_10,
      width: 'auto',
      textDecoration: 'none',
    }),
  link: ({ palette }: Theme) =>
    css({
      color: palette.WHITE,
    }),
  chevron: ({ palette }: Theme) =>
    css({
      marginInlineStart: `${pixelsToRem(12)}rem`,
      color: palette.WHITE,
      fill: 'currentcolor',
    }),
};
export default styles;
