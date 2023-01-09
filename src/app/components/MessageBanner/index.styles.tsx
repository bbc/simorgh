import { css, Theme } from '@emotion/react';
// pass in the emotion prop you're trying to get access to
// just do normal css in a css ({}) entry
const styles = {
  container: ({ palette }: Theme) =>
    css({
      paddingTop: '2rem',
      paddingBottom: '2rem',
    }),
  card: ({ palette }: Theme) =>
    css({
      height: 'auto',
      background:
        'linear-gradient(52deg, rgba(255,0,0,1) 8%, rgba(2,0,36,1) 61%)',
      paddingLeft: '0.5rem',
      paddingRight: '0.5rem',
    }),
  heading: ({ palette }: Theme) =>
    css({
      paddingTop: '1.5rem',
      paddingBottom: '0.5rem',
      paddingLeft: '1rem',
      color: palette.WHITE,
    }),
  paragraph: ({ palette }: Theme) =>
    css({
      paddingBottom: '1rem',
      color: palette.WHITE,
      paddingLeft: '1rem',
    }),
  image: ({ mq }: Theme) =>
    css({
      maxWidth: '184px',
      //   [mq.GROUP_1_MIN_WIDTH]: { display: 'inline-block' },
    }),
  linkbackground: ({ palette }: Theme) =>
    css({
      padding: '1rem',
      backgroundColor: palette.WHITE,
      margin: '0 1rem 1rem 1rem',
    }),
  link: ({ palette }: Theme) =>
    css({
      color: palette.BLACK,
      textDecoration: 'none',
      '&:hover, &:focus': {
        textDecoration: 'underline',
      },
      paddingRight: '0.5rem',
    }),
  flex: ({ palette }: Theme) =>
    css({
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }),
};
export default styles;
