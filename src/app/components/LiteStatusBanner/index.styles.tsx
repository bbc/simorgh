import pixelsToRem from '#app/utilities/pixelsToRem';
import { css, keyframes, Theme } from '@emotion/react';

const IMAGE_WIDTH = 184;
const IMAGE_WIDTH_GROUP_3_MIN_WIDTH = 224;

const greenPulse = keyframes({
  '0%': {
    boxShadow: '0 0 5px #00ff00, 0 0 10px #00ff00, 0 0 100px #00ff00',
  },
  '50%': {
    boxShadow:
      '0 0 5px rgb(208, 255, 0), 0 0 10px rgb(255, 255, 0), 0 0 30px rgb(234, 255, 0)',
  },
  '100%': {
    boxShadow: '0 0 5px #00ff00, 0 0 10px #00ff00, 0 0 100px #00ff00',
  },
});

const redPulse = keyframes({
  '0%': {
    boxShadow:
      '0 0 5px rgb(255, 0, 0), 0 0 10px rgb(255, 0, 72), 0 0 100px rgb(255, 51, 0)',
  },
  '50%': {
    boxShadow:
      '0 0 5px rgb(255, 136, 0), 0 0 10px rgb(255, 174, 0), 0 0 30px rgb(255, 42, 0)',
  },
  '100%': {
    boxShadow:
      '0 0 5px rgb(255, 0, 0), 0 0 10px rgb(255, 0, 72), 0 0 100px rgb(255, 51, 0)',
  },
});

const styles = {
  IMAGE_WIDTH,
  IMAGE_WIDTH_GROUP_3_MIN_WIDTH,
  container: () =>
    css({
      position: 'relative',
      zIndex: 1,
    }),
  canonicalBackground: ({ mq }: Theme) =>
    css({
      background:
        'radial-gradient(circle at 20% 90%, #A20219, #180109 60%, #500115 90%)',
      [mq.GROUP_3_MIN_WIDTH]: {
        background:
          'linear-gradient(-120deg, #A20219 0%, #180109 54%, #180109 90%)',
      },
      '&:hover, &:focus': {
        background:
          'radial-gradient(circle at 20% 90%,rgb(2, 162, 18), #180109 60%,rgb(1, 80, 2) 90%)',
        [mq.GROUP_3_MIN_WIDTH]: {
          background:
            'linear-gradient(-120deg,rgb(2, 162, 7) 0%, #180109 54%,rgb(4, 24, 1) 90%)',
        },
      },
    }),
  liteBackground: ({ mq }: Theme) =>
    css({
      background:
        'radial-gradient(circle at 20% 90%,rgb(2, 162, 18), #180109 60%,rgb(1, 80, 2) 90%)',
      [mq.GROUP_3_MIN_WIDTH]: {
        background:
          'linear-gradient(-120deg,rgb(2, 162, 7) 0%, #180109 54%,rgb(4, 24, 1) 90%)',
      },
      '&:hover, &:focus': {
        background:
          'radial-gradient(circle at 20% 90%, #A20219, #180109 60%, #500115 90%)',
        [mq.GROUP_3_MIN_WIDTH]: {
          background:
            'linear-gradient(-120deg, #A20219 0%, #180109 54%, #180109 90%)',
        },
      },
    }),
  card: ({ mq }: Theme) =>
    css({
      paddingLeft: '1rem',
      paddingRight: '1rem',
      [mq.FORCED_COLOURS]: {
        border: '0.1875rem solid transparent',
      },
      maxWidth: '63rem',
      margin: '0 auto',
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
  greenGlow: () =>
    css({
      '&:after': {
        animation: `${greenPulse} 10s ease-in-out infinite`,
      },
      '&:hover, &:focus': {
        boxShadow: '0 0 10px 2px rgb(255, 38, 0)',
        '&:after': {
          animation: `${redPulse} 10s ease-in-out infinite`,
        },
      },
    }),
  redGlow: () =>
    css({
      '&:after': {
        animation: `${redPulse} 10s ease-in-out infinite`,
      },
      '&:hover, &:focus': {
        boxShadow: '0 0 10px 2px rgb(0, 255, 136)',
        '&:after': {
          animation: `${greenPulse} 10s ease-in-out infinite`,
        },
      },
    }),
  sharedLinkStyles: ({ mq, palette }: Theme) =>
    css({
      padding: '1rem',
      margin: '0 1rem 1rem 1rem',
      backgroundColor: palette.WHITE,
      color: palette.BLACK,
      [mq.GROUP_3_MIN_WIDTH]: {
        width: 'auto',
        maxWidth: 'calc(100% - 240px)',
        margin: '0 0 1.5rem 0',
        paddingBottom: '1rem',
      },
      '&:hover, &:focus': {
        backgroundColor: '#F6F6F6',
        color: palette.BLACK,
      },
      width: '100%',
    }),
  informationLink: ({ mq, palette }: Theme) =>
    css({
      zIndex: '1',
      backgroundColor: `${palette.GREY_3}`,
      margin: '0 1rem 0.1rem 1rem',
      [mq.GROUP_3_MIN_WIDTH]: {
        marginInlineEnd: `${pixelsToRem(1)}rem`,
      },
    }),
  arrowDecorationEnd: ({ palette }: Theme) =>
    css({
      width: 0,
      height: 0,
      borderTop: '26px solid transparent',
      borderLeft: `15px solid ${palette.WHITE}`,
      borderBottom: '26px solid transparent',
      margin: '0 0 1.5rem 0',
    }),
  arrowDecorationStart: ({ palette }: Theme) =>
    css({
      zIndex: '2',
      width: 0,
      height: 0,
      borderTop: `26px solid ${palette.WHITE}`,
      borderLeft: `15px solid transparent`,
      borderBottom: `26px solid ${palette.WHITE}`,
      margin: '0 0 1.5rem -0.70rem',
    }),
  icon: ({ spacings }: Theme) =>
    css({
      marginInlineStart: `0`,
      width: `${spacings.DOUBLE}rem`,
      height: `${spacings.DOUBLE}rem`,
      verticalAlign: 'middle',
      fill: 'currentColor',
    }),
  callToActionLink: () =>
    css({
      '& span': {
        paddingInlineStart: '0.3rem',
      },
      '&:after': {
        content: '""',
        position: 'absolute',
        inset: 0,
      },
    }),
  flex: ({ mq }: Theme) =>
    css({
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      [mq.GROUP_3_MIN_WIDTH]: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'start',
        alignItems: 'flex-end',
      },
    }),
};
export default styles;
