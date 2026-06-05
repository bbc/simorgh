import pixelsToRem from '#app/utilities/pixelsToRem';
import { css, Theme } from '@emotion/react';

const BORDER_WIDTH = pixelsToRem(1);
const SWITCH_BORDER_PADDING = pixelsToRem(2);
const SWITCH_MIN_WDITH = '2.7rem';

export default {
  container: ({ palette, spacings, mq }: Theme) =>
    css({
      [mq.GROUP_3_MIN_WIDTH]: {
        display: 'none',
      },
      display: 'flex',
      background: palette.BLACK,
      padding: `${spacings.FULL}rem`,
      alignItems: 'center',
      columnGap: `${spacings.HALF}rem`,
    }),
  onboardingContainer: () =>
    css({
      flexGrow: 1,
    }),
  onboardingText: ({ palette }: Theme) =>
    css({
      color: palette.WHITE,
    }),
  moreInfoLink: ({ palette }: Theme) =>
    css({
      color: palette.WHITE,
      'a:visited &': {
        color: palette.GREY_3,
        borderBottom: `${pixelsToRem(1)}rem solid ${palette.METAL}`,
      },
      'a &': {
        color: palette.WHITE,
      },
    }),
  switch: ({ palette, fontSizes, fontVariants, spacings }: Theme) =>
    css({
      color: `${palette.BLACK}`,
      backgroundColor: `${palette.POSTBOX}`,
      border: `${BORDER_WIDTH}rem solid ${palette.WHITE}`,
      ...fontSizes.minion,
      ...fontVariants.sansRegular,
      display: 'flex',
      flexDirection: 'row',
      padding: `${SWITCH_BORDER_PADDING}rem`,
      margin: `${spacings.HALF}rem`,
      height: 'fit-content',
      '& span': {
        display: 'block',
        padding: `${spacings.FULL}rem ${spacings.FULL}rem`,
        flex: '1',
        alignItems: 'center',
        minWidth: SWITCH_MIN_WDITH,
      },
    }),
  mode: ({ palette }: Theme) =>
    css({
      display: 'inline-block',
      color: palette.WHITE,
      backgroundColor: palette.POSTBOX,
      textAlign: 'center',
    }),
  on: ({ palette }: Theme) =>
    css({
      backgroundColor: `${palette.WHITE}`,
      color: `${palette.BLACK}`,
    }),
};
