import { css, Theme } from '@emotion/react';

const styles = {
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
      color: palette.BLUEJAY,
      textDecoration: 'none',
      paddingInlineStart: '0.5rem',
      verticalAlign: 'middle',
      '&:visited': {
        color: palette.BLUEJAY,
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
};

export default styles;
