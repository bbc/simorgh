import { css, Theme } from '@emotion/react';
// pass in the emotion prop you're trying to get access to
// just do normal css in a css ({}) entry
const styles = {
  link: ({ palette }: Theme) =>
    css({
      color: palette.BLACK,
      display: 'inline-block',
    }),
  linkbackground: ({ palette }: Theme) =>
    css({
      paddingTop: '1rem',
      paddingBottom: '1rem',
      paddingLeft: '1rem',
      paddingRight: '1rem',
      backgroundColor: palette.WHITE,
    }),
  image: ({ mq }: Theme) =>
    css({
      display: 'none',
      [mq.GROUP_1_MIN_WIDTH]: { display: 'inline-block' },
    }),
  card: ({ palette }: Theme) =>
    css({
      height: 'auto',
      width: '100%',
      backgroundColor: palette.CLOUD_DARK,
    }),
};

export default styles;
