import { css, Theme } from '@emotion/react';

export default {
  feedbackWrapper: ({ palette, spacings, mq }: Theme) =>
    css({
      backgroundColor: palette.WHITE,
      padding: `${spacings.HALF}rem ${spacings.DOUBLE}rem`,
      margin: `${spacings.FULL}rem`,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderInlineStart: `${spacings.HALF}rem solid ${palette.POSTBOX}`,

      [mq.GROUP_2_MIN_WIDTH]: {
        margin: `${spacings.DOUBLE}rem`,
      },

      [mq.GROUP_4_MIN_WIDTH]: {
        margin: `${spacings.DOUBLE}rem 0`,
      },
    }),
  feedbackParagraph: () =>
    css({
      margin: 0,
    }),
  feedbackButtons: () =>
    css({
      display: 'flex',
    }),
  feedbackButton: ({ palette, spacings }: Theme) =>
    css({
      display: 'block',
      border: 'none',
      backgroundColor: 'transparent',
      padding: `${spacings.FULL}rem 0.75rem`,
      cursor: 'pointer',

      '&:hover, &:focus-visible': {
        svg: {
          fill: palette.GREY_4,
        },
      },

      '&:not(:last-child)': {
        marginInlineEnd: `${spacings.DOUBLE}rem`,
      },

      svg: {
        width: `${spacings.TRIPLE}rem`,
        height: `${spacings.TRIPLE}rem`,
        fill: palette.GREY_8,
      },
    }),
  iframe: ({ spacings }: Theme) =>
    css({
      border: 'none',
      width: '90%',
      height: '1430px',
      marginTop: `${spacings.FULL}rem`,
    }),
};
