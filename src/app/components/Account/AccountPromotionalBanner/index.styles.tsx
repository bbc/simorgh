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

  buttonSeparatorText: ({ palette }: Theme) =>
    css({
      color: palette.WHITE,
      padding: `${pixelsToRem(4)}rem`,
    }),

  signInLink: ({ palette, mq }: Theme) =>
    css({
      width: `${pixelsToRem(83)}rem`,
      height: `${pixelsToRem(44)}rem`,
      padding: `${pixelsToRem(4)}rem`,
      color: palette.WHITE,
      backgroundColor: palette.SERVICE_NEUTRAL_CORE,
      '&:hover, &:focus': {
        backgroundColor: palette.SERVICE_NEUTRAL_DARK,
        color: palette.WHITE,
      },
      '&:visited': {
        color: palette.WHITE,
      },
      [mq.GROUP_3_MIN_WIDTH]: {
        width: `${pixelsToRem(147)}rem`,
      },
    }),

  accountIcon: ({ palette }: Theme) =>
    css({
      fill: palette.WHITE,
      width: `${pixelsToRem(14)}rem`,
      height: `${pixelsToRem(14)}rem`,
      alignSelf: 'center',
      marginInlineEnd: `${pixelsToRem(4)}rem`,
    }),
  registerLink: ({ palette }: Theme) =>
    css({
      width: `${pixelsToRem(60)}rem`,
      height: `${pixelsToRem(44)}rem`,
      color: palette.WHITE,
      textDecoration: 'underline',
      textDecorationThickness: `${pixelsToRem(2)}rem`,
      padding: `${pixelsToRem(8)}rem`,
      cursor: 'pointer',
      '&:hover, &:focus': {
        color: palette.WHITE,
        textDecoration: 'underline',
      },
      '&:visited': {
        color: palette.WHITE,
      },
    }),
};
