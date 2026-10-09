import { Theme, css } from '@emotion/react';
import pixelsToRem from '#app/utilities/pixelsToRem';

const styles = {
  callToActionLink: ({ mq }: Theme) =>
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

  separatorText: ({ palette, spacings }: Theme) =>
    css({
      color: palette.WHITE,
      padding: `${spacings.HALF}rem`,
    }),

  signInLink: ({ palette, spacings, mq }: Theme) =>
    css({
      height: `${pixelsToRem(44)}rem`,
      padding: `${spacings.HALF}rem`,
      [mq.GROUP_1_MIN_WIDTH]: {
        paddingInline: `${spacings.FULL}rem`,
      },
      color: palette.WHITE,
      textDecorationThickness: `${pixelsToRem(1)}rem`,
      backgroundColor: palette.SERVICE_NEUTRAL_CORE,
      '&:hover, &:focus': {
        backgroundColor: palette.SERVICE_NEUTRAL_DARK,
        color: palette.WHITE,
        textDecorationThickness: `${pixelsToRem(2)}rem`,
      },
      '&:visited': {
        color: palette.WHITE,
      },
    }),

  accountIcon: ({ mq, spacings }: Theme) =>
    css({
      fill: 'currentColor',
      width: `${pixelsToRem(14)}rem`,
      height: `${pixelsToRem(14)}rem`,
      alignSelf: 'center',
      marginInlineEnd: `${spacings.HALF}rem`,
      [mq.FORCED_COLOURS]: {
        fill: 'ButtonText',
      },
    }),

  registerLink: ({ palette }: Theme) =>
    css({
      height: `${pixelsToRem(44)}rem`,
      color: palette.WHITE,
      textDecoration: 'underline',
      textDecorationThickness: `${pixelsToRem(1)}rem`,
      padding: 0,
      cursor: 'pointer',
      '&&:hover, &&:focus': {
        textDecorationThickness: `${pixelsToRem(2)}rem`,
        color: palette.NEUTRAL_LIGHT,
        textDecorationColor: palette.NEUTRAL_LIGHT,
      },
      '&:visited': {
        color: palette.WHITE,
      },
    }),

  separatorTextOnLightBackground: ({ palette, spacings }: Theme) =>
    css({
      color: palette.GREY_10,
      padding: `${spacings.HALF}rem`,
    }),

  registerLinkOnLightBackground: ({ palette }: Theme) =>
    css({
      color: palette.GREY_10,
      '&&:hover, &&:focus': {
        color: palette.GREY_10,
        textDecorationColor: palette.GREY_10,
      },
      '&:visited': {
        color: palette.GREY_10,
      },
    }),
};

export default styles;
