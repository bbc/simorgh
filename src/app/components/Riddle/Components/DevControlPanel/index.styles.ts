import { css, Theme } from '@emotion/react';

export default {
  title: ({ spacings }: Theme) =>
    css({
      display: 'block',
      marginTop: `${spacings.DOUBLE}rem`,
    }),
  date: () =>
    css({
      fontFamily: '"Lucida Console", "Courier New", monospace',
      display: 'block',
    }),
  container: () =>
    css({
      display: 'flex',
      flexWrap: 'wrap',
    }),
  optionContainer: ({ spacings, palette }: Theme) =>
    css({
      fontFamily: '"Lucida Console", "Courier New", monospace',
      width: '11rem',
      display: 'flex',
      flexWrap: 'wrap',
      alignContent: 'start',
      justifyContent: 'center',
      '& > span': {
        fontFamily: '"Lucida Console", "Courier New", monospace',
        textAlign: 'center',
        width: '100%',
        padding: `${spacings.HALF}rem`,
        background: `${palette.BLACK}`,
        color: `${palette.WHITE}`,
      },
      '& button': {
        height: '3rem',
        width: '100%',
        background: `${palette.BLACK}`,
        color: `${palette.WHITE}`,
        cursor: 'pointer',
      },
    }),
};
