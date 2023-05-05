import { css, Theme } from '@emotion/react';

const styles = {
  body: ({ spacings, palette, fontSizes, fontVariants }: Theme) =>
    css({
      ...fontSizes.pica,
      ...fontVariants.serifMedium,

      position: 'static',
      color: palette.EBON,
      textDecoration: 'none',
      marginBottom: `${spacings.FULL}rem`,

      '&:hover, &:focus': {
        textDecoration: 'underline',
      },
      '&:before': {
        bottom: 0,
        content: '',
        left: 0,
        overflow: 'hidden',
        position: 'absolute',
        right: 0,
        top: 0,
        whiteSpace: 'nowrap',
        zIndex: 1,
      },
    }),

  default: ({ mq, fontSizes }: Theme) =>
    css({
      [mq.GROUP_2_MIN_WIDTH]: {
        ...fontSizes.greatPrimer,
      },
    }),
};

export default styles;
