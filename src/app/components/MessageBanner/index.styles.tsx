import { css, Theme } from '@emotion/react';

const IMAGE_WIDTH = 184;
const IMAGE_WIDTH_GROUP_3_MIN_WIDTH = 224;

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

      img: { objectPosition: 'top' },
    }),
  callToActionLink: ({ mq, palette }: Theme) =>
    css({
      padding: '1rem',
      backgroundColor: palette.WHITE,
      margin: '0 1rem 1rem 1rem',
      width: '100%',
      color: palette.BLACK,
      '&:hover, &:focus': {
        backgroundColor: '#F6F6F6',
        color: palette.BLACK,
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
  chevron: () =>
    css({
      marginInlineStart: '0.5rem',
      width: '1rem',
      height: '1rem',
      verticalAlign: 'middle',
      fill: 'currentcolor',
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
