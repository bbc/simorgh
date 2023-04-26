import { css, Theme } from '@emotion/react';

const BLUR_RADIUS = 15;
const scaleAmount = 1 + BLUR_RADIUS / 100;
const scaleX = `scaleX(${scaleAmount})`;
const scaleY = `scaleY(${-1 * scaleAmount})`;

export default {
  componentWrapper: ({ palette }: Theme) =>
    css({
      position: 'relative',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      textDecoration: 'none',
      '&:hover a': {
        textDecoration: 'underline',
      },
      '&:visited a': {
        color: palette.GREY_3,
      },
    }),
  // This is an unfocusable element, hidden from screenreaders
  // This is to allow mouse users to click anywhere on the promo
  // But for keyboard and AT users, and scenarios where there is no CSS,
  // only the link inside the H3 should be interactive
  clickableArea: () =>
    css({
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 5,
    }),
  header: () =>
    css({
      margin: 0,
    }),
  anchor: ({ fontVariants, spacings, mq }: Theme) =>
    css({
      ...fontVariants.serifRegular,
      fontSize: '0.9375rem',
      fontWeight: 400,
      lineHeight: 1.33,
      display: 'inline-block',
      textDecoration: 'none',
      margin: `0.875rem ${spacings.FULL}rem 0 ${spacings.FULL}rem`,

      '&:focus': {
        textDecoration: 'underline',
      },

      [mq.GROUP_2_MIN_WIDTH]: {
        fontSize: '1rem',
        lineHeight: 1.25,
        margin: `0.875rem ${spacings.DOUBLE}rem 0 ${spacings.DOUBLE}rem`,
      },
    }),
  lazyloadPlaceholder: ({ spacings }: Theme) =>
    css({
      minHeight: '100px',
      paddingBottom: `${spacings.DOUBLE}rem`,
    }),
  panelWrapper: () =>
    css({
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    }),
  panelBackground: ({ palette }: Theme) =>
    css({
      display: 'none',

      [`@supports (filter: blur(${BLUR_RADIUS}px))`]: {
        display: 'block',
        zIndex: 1,
        position: 'absolute',
        bottom: 0,
        top: `-${BLUR_RADIUS}px`,
        left: 0,
        right: 0,
        backgroundColor: palette.GREY_8,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'bottom',
        transform: `${scaleX} ${scaleY}`,
        filter: `blur(${BLUR_RADIUS}px)`,
      },
    }),
  panelChildren: ({ spacings }: Theme) =>
    css({
      position: 'relative',
      zIndex: 3,
      paddingBottom: `${spacings.DOUBLE}rem`,
      transition: 'background 0.5s ease-in-out',
      height: '100%',
    }),
  timestamp: ({ spacings, mq, fontVariants }: Theme) =>
    css({
      ...fontVariants.sansRegular,
      fontSize: '0.8125rem',
      padding: `0.75rem ${spacings.FULL}rem 0 ${spacings.FULL}rem`,

      [mq.GROUP_2_MIN_WIDTH]: {
        fontSize: '0.875rem',
        padding: `0.75rem ${spacings.DOUBLE}rem 0 ${spacings.DOUBLE}rem`,
      },
    }),
};
