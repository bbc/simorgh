import { css, Theme } from '@emotion/react';

export default {
  parent: ({ spacings, palette, typography }: Theme) =>
    css({
      backgroundColor: palette.WHITE,
      padding: `${spacings.QUADRUPLE}rem ${spacings.DOUBLE}rem`,
      minHeight: 280,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      fontFamily: typography.fontFamilies.primary,
    }),

  heading: ({ palette, typography, mq }: Theme) =>
    css({
      color: palette.GREY_10,

      fontSize: `${typography.script.greatPrimer.groupA.fontSize / 16}rem`,
      lineHeight: `${typography.script.greatPrimer.groupA.lineHeight / 16}rem`,

      [mq.GROUP_2_MIN_WIDTH]: {
        fontSize: `${typography.script.greatPrimer.groupB.fontSize / 16}rem`,
        lineHeight: `${
          typography.script.greatPrimer.groupB.lineHeight / 16
        }rem`,
      },

      [mq.GROUP_3_MIN_WIDTH]: {
        // ...typography.script.greatPrimer.groupD,
        // fontSize: `${typography.script.greatPrimer.groupD.fontSize / 16}rem`,
        // lineHeight: `${
        //   typography.script.greatPrimer.groupD.lineHeight / 16
        // }rem`,
      },
    }),

  textBody: ({ spacings, palette, typography, mq }: Theme) =>
    css({
      color: palette.GREY_10,
      margin: `${spacings.DOUBLE}rem 0`,

      fontSize: `${typography.script.bodyCopy.groupB.fontSize / 16}rem`,
      lineHeight: `${typography.script.bodyCopy.groupB.lineHeight / 16}rem`,

      [mq.GROUP_3_MIN_WIDTH]: {
        fontSize: `${typography.script.bodyCopy.groupD.fontSize / 16}rem`,
        lineHeight: `${typography.script.bodyCopy.groupD.lineHeight / 16}rem`,
      },

      a: {
        color: 'inherit',
        textDecoration: 'none',
        borderBottom: `1px solid ${palette.GREY_10}`,

        '&:hover, &:focus': {
          color: palette.POSTBOX,
          borderBottom: `2px solid ${palette.POSTBOX}`,
        },

        '&:visited': {
          color: palette.GREY_6,
          borderBottom: `1px solid ${palette.GREY_6}`,
        },
      },
    }),

  button: ({ spacings, palette, typography, mq }: Theme) =>
    css({
      color: palette.GREY_10,
      backgroundColor: palette.WHITE,
      border: `1px solid ${palette.PHILIPPINE_GREY}`,
      borderRadius: 0,
      fontWeight: 'bold',
      padding: `${spacings.FULL}rem`,
      cursor: 'pointer',

      fontSize: `${typography.script.pica.groupB.fontSize / 16}rem`,
      lineHeight: `${typography.script.pica.groupB.lineHeight / 16}rem`,

      [mq.GROUP_3_MIN_WIDTH]: {
        fontSize: `${typography.script.pica.groupD.fontSize / 16}rem`,
        lineHeight: `${typography.script.pica.groupD.lineHeight / 16}rem`,
      },

      '&:hover, &:focus': {
        backgroundColor: palette.POSTBOX,
        color: palette.WHITE,
        border: `1px solid ${palette.POSTBOX}`,
      },
    }),
};
