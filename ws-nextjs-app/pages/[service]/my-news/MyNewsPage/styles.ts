import { css, Theme } from '@emotion/react';
import pixelsToRem from '#app/utilities/pixelsToRem';

const styles = {
  main: ({ spacings, mq }) =>
    css({
      margin: `0 ${spacings.FULL}rem`,
      [mq.GROUP_2_MIN_WIDTH]: {
        margin: `0 ${spacings.DOUBLE}rem`,
      },
    }),
  inner: css({
    maxWidth: '63rem',
    margin: '0 auto',
  }),
  innerContent: css({
    '.no-js &': {
      display: 'none',
    },
  }),

  heading: ({ spacings, mq }: Theme) =>
    css({
      marginTop: `${spacings.TRIPLE}rem`,
      marginBottom: `${spacings.TRIPLE}rem`,
      [mq.GROUP_3_MIN_WIDTH]: {
        marginTop: `${spacings.QUINTUPLE}rem`,
        marginBottom: `${spacings.SEXTUPLE}rem`,
      },
    }),

  subheading: ({ spacings, mq }: Theme) =>
    css({
      marginBottom: `${spacings.DOUBLE}rem`,
      [mq.GROUP_3_MIN_WIDTH]: {
        marginBottom: `${pixelsToRem(20)}rem`,
      },
    }),

  section: ({ spacings, mq }: Theme) =>
    css({
      marginTop: `${spacings.QUADRUPLE}rem`,
      '&:first-of-type': {
        marginTop: 0,
      },
      [mq.GROUP_3_MIN_WIDTH]: {
        marginTop: `${spacings.SEXTUPLE}rem`,
      },
    }),

  spinnerWrapper: css({
    display: 'flex',
    justifyContent: 'center',
  }),

  spinner: ({ mq }) =>
    css({
      height: `${pixelsToRem(32)}rem`,
      width: `${pixelsToRem(32)}rem`,
      [mq.FORCED_COLOURS]: {
        fill: 'canvasText',
      },
    }),

  seeMoreButton: ({
    palette,
    spacings,
    fontVariants,
    fontSizes,
    isDarkUi,
  }: Theme) =>
    css({
      ...fontVariants.sansBold,
      ...fontSizes.pica,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      width: 'fit-content',
      minHeight: '2.75rem',
      gap: `${spacings.FULL}rem`,
      margin: `${spacings.DOUBLE}rem auto 0`,
      padding: `${spacings.HALF}rem ${spacings.DOUBLE}rem`,
      border: 'none',
      borderRadius: 0,
      background: 'none',
      color: palette.POSTBOX,
      cursor: 'pointer',
      '&:hover, &:focus-visible': {
        backgroundColor: isDarkUi ? palette.GREY_7 : palette.SPORT_SILVER,
      },
    }),

  seeMoreIcon: css({
    width: `${pixelsToRem(12)}rem`,
    height: `${pixelsToRem(12)}rem`,
    fill: 'currentColor',
    transform: 'rotate(90deg)',
  }),

  seeMoreIconFlipped: css({
    transform: 'rotate(-90deg)',
  }),
};

export default styles;
