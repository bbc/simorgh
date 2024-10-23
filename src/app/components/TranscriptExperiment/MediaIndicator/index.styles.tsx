import NO_JS_CLASSNAME from '#app/lib/noJs.const';
import pixelsToRem from '#app/utilities/pixelsToRem';
import { css, Theme } from '@emotion/react';

export const BUTTON_COLLAPSE_WIDTH = pixelsToRem(300);

const styles = {
  mediaIcon: ({ palette, fontVariants, fontSizes }: Theme) =>
    css({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: palette.GREY_2,
      border: 'none',
      color: palette.BLACK,
      cursor: 'pointer',
      ...fontVariants.sansBold,
      ...fontSizes.minion,
      width: '5.5rem',
      padding: '0',
      position: 'absolute',
      bottom: '0',
      left: '0',
      zIndex: '2',
      [`.${NO_JS_CLASSNAME} &`]: {
        display: 'none',
      },
    }),
  flexItem: () =>
    css({
      lineHeight: '2.5rem',
    }),
  iconWrapper: ({ palette, spacings }: Theme) =>
    css({
      '& > svg': {
        color: palette.BLACK,
        fill: 'currentcolor',
        height: `${spacings.DOUBLE}rem`,
        width: `${spacings.DOUBLE}rem`,
        margin: '0',
      },
    }),
  timeDuration: ({ spacings }: Theme) =>
    css({
      margin: `0  ${spacings.HALF}rem`,
      verticalAlign: 'middle',
    }),
};

export default styles;
