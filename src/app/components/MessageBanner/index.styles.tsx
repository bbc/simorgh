import { css, Theme } from '@emotion/react';

const styles = {
  container: () =>
    css({
      paddingTop: '2rem',
      paddingBottom: '2rem',
    }),
  card: ({ mq }: Theme) =>
    css({
      height: 'auto',
      background:
        'radial-gradient(circle at 20% 90%, #A20219, #180109 60%, #500115 90%)',
      paddingLeft: '1rem',
      paddingRight: '1rem',
      [mq.GROUP_3_MIN_WIDTH]: {
        background:
          'linear-gradient(-120deg, #A20219 0%, #180109 54%, #180109 90%)',
      },
      [mq.HIGH_CONTRAST]: {
        border: '0.1875rem solid transparent',
      },
    }),
  textWrap: ({ mq }: Theme) =>
    css({
      [mq.GROUP_3_ONLY]: {
        width: '66%',
      },
      [mq.GROUP_4_MIN_WIDTH]: {
        width: '75%',
      },
    }),
  heading: ({ palette }: Theme) =>
    css({
      paddingTop: '1.5rem',
      paddingBottom: '0.5rem',
      color: palette.WHITE,
    }),
  paragraph: ({ palette }: Theme) =>
    css({
      paddingBottom: '1rem',
      color: palette.WHITE,
    }),
  imageLtr: ({ mq }: Theme) =>
    css({
      maxWidth: '184px',
      [mq.GROUP_3_MIN_WIDTH]: {
        maxWidth: '224px',
        bottom: 0,
        right: 0,
        position: 'absolute',
      },

      img: { objectPosition: 'top' },
    }),
  imageRtl: ({ mq }: Theme) =>
    css({
      maxWidth: '184px',
      [mq.GROUP_3_MIN_WIDTH]: {
        maxWidth: '224px',
        bottom: 0,
        left: 0,
        position: 'absolute',
      },
      img: { objectPosition: 'top' },
    }),
  linkBackground: ({ mq, palette }: Theme) =>
    css({
      padding: '1rem',
      backgroundColor: palette.WHITE,
      margin: '0 1rem 1rem 1rem',
      width: '100%',
      textDecoration: 'none',
      '&:hover': {
        backgroundColor: '#F6F6F6',
        textDecoration: 'underline',
        color: palette.BLACK,
      },
      '&:focus': {
        backgroundColor: '#F6F6F6',
        textDecoration: 'underline',
        color: palette.BLACK,
      },
      [mq.GROUP_3_MIN_WIDTH]: {
        width: 'auto',
        maxWidth: 'calc(100% - 240px)',
        margin: '0 0 1.5rem 0',
        paddingBottom: '1rem',
      },
    }),
  link: ({ palette }: Theme) =>
    css({
      color: palette.BLACK,
      textDecoration: 'none',
      paddingInlineStart: '0.5rem',
      verticalAlign: 'middle',
      '&:visited': {
        color: palette.BLACK,
      },
    }),
  chevron: () =>
    css({
      marginInlineStart: '0.5rem',
      width: '1rem',
      height: '1rem',
      verticalAlign: 'middle',
      fill: 'currentcolor',
    }),
  linkAndChevron: () =>
    css({
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    }),
  flex: ({ mq }: Theme) =>
    css({
      display: 'flex',
      flexDirection: 'column-reverse',
      alignItems: 'center',
      [mq.GROUP_3_MIN_WIDTH]: {
        display: 'flex',
        flexDirection: 'row-reverse',
        justifyContent: 'start',
        alignItems: 'flex-end',
        position: 'relative',
      },
    }),
};
export default styles;
