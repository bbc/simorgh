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
      backgroundColor: '#4D0B0B',
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
    }),

  TextWrapper: () =>
    css({
      display: 'grid',
    }),

  StyledTitle: () =>
    css({
      color: '#F6F6F6',
      height: `${pixelsToRem(32)}rem`, // change to correct height - Class/Line Height/Index Headline Large
      weight: 700,
    }),

  StyledDescription: ({ mq }: Theme) =>
    css({
      color: '#F6F6F6',
      height: `${pixelsToRem(22)}rem`, // Class/Line Height/Index Headline Small
      [mq.GROUP_0_MAX_WIDTH]: {
        display: 'none',
      },
    }),

  CTAWrapper: () =>
    css({
      display: 'flex',
      alignContent: 'center',
      justifyContent: 'flex-start',
      gap: `${pixelsToRem(12)}rem`,
      lineHeight: 1,
    }),

  StyledButtonOne: ({ palette }: Theme) =>
    css({
      color: '#FFFFFF',
      backgroundColor: palette.SERVICE_NEUTRAL_CORE,
      border: 'none',
      height: `${pixelsToRem(44)}rem`,
      padding: `${pixelsToRem(12)}rem`, // change to correct
      cursor: 'pointer',
    }),

  StyledText: () =>
    css({
      color: '#F6F6F6',
      fontSize: `${pixelsToRem(18)}rem`,
      height: `${pixelsToRem(22)}rem`, // Class/Line Height/Index Headline Small
      margin: 0,
      alignText: 'center',
    }),

  StyledButtonTwo: () =>
    css({
      color: '#73B5FF',
      backgroundColor: 'transparent',
      border: 'none',
      textDecoration: 'underline',
      height: `${pixelsToRem(44)}rem`,
      padding: `${pixelsToRem(12)}rem`, // change to correct
      cursor: 'pointer',
    }),

  subNavCloseButton: ({ palette }: Theme) =>
    css({
      position: 'absolute',
      top: 0, // change to correct
      right: 0, // change to correct
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
      top: `${pixelsToRem(14)}rem`, // change to correct
      right: `${pixelsToRem(14)}rem`, // change to correct
      color: palette.WHITE,
      fill: 'currentColor',
      width: `${pixelsToRem(18)}rem`,
      height: `${pixelsToRem(18)}rem`,
      pointerEvents: 'none',
    }),
};

export default styles;
