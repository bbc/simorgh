import { css, keyframes, Theme } from '@emotion/react';

const IMAGE_WIDTH = 184;
const IMAGE_WIDTH_GROUP_3_MIN_WIDTH = 224;

const greenPulse = keyframes({
  '0%': {
    boxShadow: '0 0 5px #00ff00, 0 0 10px #00ff00, 0 0 600px #00ff00',
  },
  '50%': {
    boxShadow:
      '0 0 5px rgb(208, 255, 0), 0 0 10px rgb(255, 255, 0), 0 0 600px rgb(234, 255, 0)',
  },
  '100%': {
    boxShadow: '0 0 5px #00ff00, 0 0 10px #00ff00, 0 0 600px #00ff00',
  },
});

const redPulse = keyframes({
  '0%': {
    boxShadow:
      '0 0 5px rgb(255, 0, 0), 0 0 10px rgb(255, 0, 72), 0 0 60px rgb(255, 51, 0)',
  },
  '50%': {
    boxShadow:
      '0 0 5px rgb(255, 102, 0), 0 0 10px rgb(255, 174, 0), 0 0 30px rgb(255, 0, 0)',
  },
  '100%': {
    boxShadow:
      '0 0 5px rgb(255, 0, 0), 0 0 10px rgb(255, 0, 72), 0 0 60px rgb(255, 51, 0)',
  },
});

const styles = {
  IMAGE_WIDTH,
  IMAGE_WIDTH_GROUP_3_MIN_WIDTH,
  container: () =>
    css({
      paddingTop: '2rem',
      paddingBottom: '2rem',
    }),
  card: ({ mq }: Theme) =>
    css({
      height: 'auto',
      position: 'relative',
      background:
        'radial-gradient(circle at 20% 90%, #A20219, #180109 60%, #500115 90%)',
      paddingLeft: '1rem',
      paddingRight: '1rem',
      [mq.GROUP_3_MIN_WIDTH]: {
        background:
          'linear-gradient(-120deg, #A20219 0%, #180109 54%, #180109 90%)',
      },
      [mq.FORCED_COLOURS]: {
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
  image: ({ mq }: Theme) =>
    css({
      maxWidth: `${IMAGE_WIDTH}px`,
      [mq.GROUP_3_MIN_WIDTH]: {
        maxWidth: `${IMAGE_WIDTH_GROUP_3_MIN_WIDTH}px`,
        insetInlineEnd: 0,
        position: 'absolute',
      },
      pointerEvents: 'none',
      img: { objectPosition: 'top' },
    }),
  callToActionLink: ({ mq, palette }: Theme) =>
    css({
      '&:after': {
        content: '""',
        position: 'absolute',
        inset: 0,
        animation: `${redPulse} 10s ease-in-out infinite`,
      },
      padding: '1rem',
      backgroundColor: palette.WHITE,
      margin: '0 1rem 1rem 1rem',
      width: '100%',
      color: palette.BLACK,
      '&:hover, &:focus': {
        backgroundColor: '#F6F6F6',
        color: palette.BLACK,
        boxShadow: '0 0 10px 2px rgb(0, 255, 136)',
        '&:after': {
          animation: `${greenPulse} 10s ease-in-out infinite`,
        },
      },
      [mq.GROUP_3_MIN_WIDTH]: {
        width: 'auto',
        maxWidth: 'calc(100% - 240px)',
        margin: '0 0 1.5rem 0',
        paddingBottom: '1rem',
      },
      '& span': {
        paddingInlineStart: '0.5rem',
      },
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
      },
    }),
};
export default styles;
