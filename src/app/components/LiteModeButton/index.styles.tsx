import pixelsToRem from '#app/utilities/pixelsToRem';
import { css, Theme } from '@emotion/react';
import { focusIndicatorThickness } from '../ThemeProvider/focusIndicator';

const BORDER_WIDTH = pixelsToRem(1);
const SWITCH_MIN_WDITH = '2.7rem';
const DIALOGUE_POINTER_WIDTH = '0.25rem';
const DIALOGUE_WIDTH = '15rem';

export default {
  container: ({ spacings }: Theme) =>
    css({
      display: 'flex',
      margin: `${spacings.FULL}rem ${spacings.HALF}rem`,
    }),
  switch: ({ palette, fontSizes, fontVariants, spacings }: Theme) =>
    css({
      color: `${palette.BLACK}`,
      backgroundColor: `${palette.POSTBOX}`,
      border: `${BORDER_WIDTH}rem solid ${palette.WHITE}`,
      ...fontSizes.minion,
      ...fontVariants.sansRegular,
      display: 'flex',
      flexDirection: 'column',
      '& span': {
        display: 'block',
        padding: `${BORDER_WIDTH}rem ${spacings.FULL}rem`,
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
  detail: () =>
    css({
      position: 'relative',
      display: 'flex',
    }),
  detailContent: ({ palette, spacings }: Theme) =>
    css({
      position: 'absolute',
      top: '110%',
      right: '0',
      width: DIALOGUE_WIDTH,
      background: palette.WHITE,
      padding: `${spacings.FULL}rem`,
      zIndex: 3,
    }),
  detailSummary: ({ spacings, palette }: Theme) =>
    css({
      cursor: 'pointer',
      listStyle: 'none',
      color: palette.WHITE,
      border: `${BORDER_WIDTH}rem solid ${palette.WHITE}`,
      borderRight: 'none',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: `0 ${spacings.FULL}rem`,
      '&:focus-visible': {
        outline: `${focusIndicatorThickness} solid ${palette.BLACK}`,
        boxShadow: `0 0 0 ${focusIndicatorThickness} ${palette.WHITE}`,
        outlineOffset: `${focusIndicatorThickness}`,
      },
      'details[open] > &': {
        '&::after': {
          content: '""',
          position: 'absolute',
          borderLeft: `${DIALOGUE_POINTER_WIDTH}  solid transparent`,
          borderRight: `${DIALOGUE_POINTER_WIDTH}  solid transparent`,
          borderBottom: `${DIALOGUE_POINTER_WIDTH} solid ${palette.WHITE}`,
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
        },
      },
    }),
};
