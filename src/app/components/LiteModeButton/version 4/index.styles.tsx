import pixelsToRem from '#app/utilities/pixelsToRem';
import { css, Theme } from '@emotion/react';

const BORDER_WIDTH = pixelsToRem(1);
const SWITCH_BORDER_PADDING = pixelsToRem(10);
const SWITCH_MIN_WDITH = pixelsToRem(80);

export default {
  container: ({ spacings, mq }: Theme) =>
    css({
      [mq.GROUP_3_MIN_WIDTH]: {
        display: 'none',
      },
      display: 'flex',
      padding: `${spacings.FULL}rem`,
      alignItems: 'center',
      columnGap: `${spacings.HALF}rem`,
    }),
  liteBackground: ({ palette }: Theme) =>
    css({
      background: `linear-gradient(${palette.BLACK}, ${palette.BLUEJAY});`,
    }),
  standardBackground: ({ palette }: Theme) =>
    css({
      // background: `linear-gradient(${palette.BLACK}, ${palette.STORM});`,

      background:
        'radial-gradient(circle at 0% 200%, #A20219, #180109 60%, #500115 90%)',
    }),
  onboardingContainer: () =>
    css({
      flexGrow: 1,
    }),
  indicator: ({ palette, spacings }: Theme) =>
    css({
      display: 'inline-block',
      background: palette.WHITE,
      padding: `${pixelsToRem(1)}rem ${spacings.HALF}rem`,
      marginBottom: `${spacings.HALF}rem`,
    }),
  onboardingText: ({ palette }: Theme) =>
    css({
      display: 'block',
      color: palette.WHITE,
    }),
  moreInfoLink: ({ palette, spacings }: Theme) =>
    css({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',

      color: `${palette.WHITE}`,
      fill: `${palette.WHITE}`,
      backgroundColor: `${palette.POSTBOX}`,

      border: `${BORDER_WIDTH}rem solid ${palette.WHITE}`,
      borderRight: 'none',

      padding: `0 ${spacings.FULL}rem`,

      'a:visited': {
        color: palette.WHITE,
      },
    }),
  switchContainer: ({ spacings }: Theme) =>
    css({
      display: 'flex',
      padding: `${spacings.HALF}rem`,
    }),
  switch: ({ palette, fontSizes, fontVariants }: Theme) =>
    css({
      display: 'inline-block',
      color: `${palette.BLACK}`,
      border: `${BORDER_WIDTH}rem solid ${palette.WHITE}`,
      ...fontSizes.minion,
      ...fontVariants.sansRegular,
      width: `${SWITCH_MIN_WDITH}rem`,
      textAlign: 'center',
      padding: `${SWITCH_BORDER_PADDING}rem 0`,
    }),
  canonical: ({ palette }: Theme) =>
    css({
      backgroundColor: palette.POSTBOX,
      span: {
        color: palette.WHITE,
      },
    }),
  lite: ({ palette }: Theme) =>
    css({
      backgroundColor: palette.WHITE,
      span: {
        color: palette.BLACK,
      },
    }),
};
