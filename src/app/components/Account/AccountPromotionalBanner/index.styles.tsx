import { Theme, css } from '@emotion/react';
import pixelsToRem from '#app/utilities/pixelsToRem';

export default {
  callToActionLink: ({ mq }) =>
    css({
      padding: '1rem',
      display: 'inline-flex',
      justifyContent: 'center',
      flexDirection: 'column',
      flex: '0 0 auto',
      alignItems: 'center',
      gap: '1rem',
      [mq.GROUP_2_MIN_WIDTH]: {
        flexDirection: 'row',
      },
    }),

  buttonSeparatorText: ({ palette, spacings }: Theme) =>
    css({
      color: palette.WHITE,
      padding: `${spacings.HALF}rem`,
    }),

  signInLink: ({ palette, mq, spacings }: Theme) =>
    css({
      height: `${pixelsToRem(44)}rem`,
      padding: `${spacings.HALF}rem`,
      color: palette.WHITE,
      backgroundColor: palette.SERVICE_NEUTRAL_CORE,
      '&:hover, &:focus': {
        backgroundColor: palette.SERVICE_NEUTRAL_DARK,
        color: palette.WHITE,
        textDecorationThickness: `${pixelsToRem(2)}rem`,
      },
      '&:visited': {
        color: palette.WHITE,
      },
      [mq.GROUP_3_MIN_WIDTH]: {
        minWidth: `${pixelsToRem(147)}rem`,
      },
    }),

  accountIcon: ({ palette, spacings }: Theme) =>
    css({
      fill: palette.WHITE,
      width: `${pixelsToRem(14)}rem`,
      height: `${pixelsToRem(14)}rem`,
      alignSelf: 'center',
      marginInlineEnd: `${spacings.HALF}rem`,
    }),
  registerLink: ({ palette, spacings }: Theme) =>
    css({
      width: `${pixelsToRem(60)}rem`,
      height: `${pixelsToRem(44)}rem`,
      color: palette.WHITE,
      textDecoration: 'underline',
      padding: `${spacings.FULL}rem`,
      cursor: 'pointer',
      '&:hover, &:focus': {
        textDecorationThickness: `${pixelsToRem(2)}rem`,
        color: palette.NEUTRAL_LIGHT,
        textDecorationColor: palette.NEUTRAL_LIGHT,
      },
      '&:visited': {
        color: palette.WHITE,
      },
    }),
};
