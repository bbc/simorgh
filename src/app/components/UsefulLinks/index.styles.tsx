import { css, Theme } from '@emotion/react';

const styles = {
  container: () =>
    css({
      paddingTop: '2rem',
      paddingBottom: '2rem',
    }),

  heading: ({ palette }: Theme) =>
    css({
      paddingTop: '1.5rem',
      paddingBottom: '0.5rem',
      color: palette.BLACK,
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

  link: ({ palette }: Theme) =>
    css({
      color: palette.BLACK,
      textDecoration: 'none',
      '&:hover, &:focus': {
        textDecoration: 'underline',
        color: palette.BLACK,
      },
      paddingInlineStart: '0.5rem',
      verticalAlign: 'middle',
      '&:visited': {
        color: palette.BLACK,
      },
    }),

  unorderedList: () =>
    css({
      columnCount: 2,

      listStyleType: 'none',
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
