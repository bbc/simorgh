import pixelsToRem from '#app/utilities/pixelsToRem';
import { css, Theme } from '@emotion/react';

const styles = {
  ColoredContainer: () =>
    css({
      position: 'relative',
      margin: '0 auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      background:
        'linear-gradient(to bottom left, #bb1919 0%, #000 50%, #bb1919 100%)',
      padding: `${pixelsToRem(16)}rem`,
      minHeight: `${pixelsToRem(170)}rem`,
      maxHeight: `${pixelsToRem(370)}rem`,
      height: 'auto',

      width: '100%',
      maxWidth: `${pixelsToRem(1008)}rem`,
      minWidth: `${pixelsToRem(288)}rem`,
    }),

  Wrap: () =>
    css({
      width: '100%',
    }),

  StyledContent: () =>
    css({
      display: 'grid',
      position: 'relative',
      width: '100%',
      gap: `${pixelsToRem(8)}rem`,
    }),

  TextWrapper: () =>
    css({
      display: 'grid',
      marginRight: `${pixelsToRem(44)}rem`,
    }),

  StyledTitle: () =>
    css({
      color: '#F6F6F6',
      height: 'auto',
      weight: 700,
      margin: 0,
    }),

  StyledDescription: ({ mq }: Theme) =>
    css({
      color: '#F6F6F6',
      marginBottom: 0,
      height: 'auto',
      [mq.GROUP_0_MAX_WIDTH]: {
        display: 'none',
      },
    }),

  CTAWrapper: ({ mq }: Theme) =>
    css({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      gap: `${pixelsToRem(12)}rem`,
      lineHeight: 1,
      [mq.GROUP_1_MAX_WIDTH]: {
        flexDirection: 'column',
        alignItems: 'flex-start',
      },
    }),

  StyledButtonPrimary: ({ palette }: Theme) =>
    css({
      color: '#FFFFFF',
      backgroundColor: palette.SERVICE_NEUTRAL_CORE,
      border: 'none',
      height: `${pixelsToRem(44)}rem`,
      padding: `${pixelsToRem(12)}rem`,
      cursor: 'pointer',
      whiteSpace: 'nowrap',
    }),

  StyledText: () =>
    css({
      color: '#F6F6F6',
      fontSize: `${pixelsToRem(18)}rem`,
      height: `${pixelsToRem(22)}rem`,
      margin: 0,
      alignText: 'center',
    }),

  StyledbuttonSecondary: ({ mq }: Theme) =>
    css({
      color: '#73B5FF',
      backgroundColor: 'transparent',
      border: 'none',
      textDecoration: 'underline',
      height: `${pixelsToRem(44)}rem`,
      padding: `${pixelsToRem(6)}rem`,
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      [mq.GROUP_1_MAX_WIDTH]: {
        padding: 0,
        marginTop: `${pixelsToRem(-6)}rem`,
      },
    }),

  subNavCloseButton: ({ palette }: Theme) =>
    css({
      position: 'absolute',
      top: `${pixelsToRem(-16)}rem`,
      right: `${pixelsToRem(-10)}rem`,
      border: 'none',
      background: 'transparent',
      padding: 0,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: `${pixelsToRem(44)}rem`,
      height: `${pixelsToRem(44)}rem`,
      color: palette.WHITE,
      '&:hover, &:focus': {
        outline: `${pixelsToRem(1)}rem solid ${palette.WHITE}`,
        outlineOffset: `${pixelsToRem(1)}rem`,
        backgroundColor: palette.POSTBOX,
        fill: palette.WHITE,
        color: palette.WHITE,
      },
    }),

  subNavCloseButtonIcon: ({ palette }: Theme) =>
    css({
      position: 'absolute',
      top: `${pixelsToRem(-2)}rem`,
      right: `${pixelsToRem(3)}rem`,
      color: palette.WHITE,
      fill: 'currentColor',
      width: `${pixelsToRem(18)}rem`,
      height: `${pixelsToRem(18)}rem`,
      pointerEvents: 'none',
    }),
};

export default styles;
