import { css, Theme } from '@emotion/react';

const style = {
  container: () =>
    css({
      position: 'relative',
      height: '100%',
    }),
  opinionHeading: () =>
    css({
      textAlign: 'end',
      fontStyle: 'italic',
      textDecoration: 'underline',
      margin: '1rem 0 3rem 0',
    }),
  opinionParagraph: () =>
    css({
      margin: '3rem 0 3rem 0',
    }),
  shuffleButton: () =>
    css({
      color: 'red',
    }),
  articleLink: () =>
    css({
      textDecoration: 'none',
      display: 'flex',
      flexWrap: 'nowrap',
    }),
  title: ({ fontVariants, fontSizes, palette }: Theme) =>
    css({
      color: palette.POSTBOX,
      '&:dir(ltr)': {
        borderLeft: 'solid red 0.4rem',
        padding: '0 0 0 0.4rem',
        margin: '0 0 0 0.1rem',
      },
      '&:dir(rtl)': {
        borderRight: 'solid red 0.4rem',
        padding: '0 0.4rem 0 0',
        margin: '0 0.1rem 0 0',
      },
      ...fontSizes.paragon,
      ...fontVariants.sansBold,
    }),
};

export default style;
