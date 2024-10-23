import { focusIndicatorThickness } from '#app/components/ThemeProvider/focusIndicator';
import NO_JS_CLASSNAME from '#app/lib/noJs.const';
import pixelsToRem from '#app/utilities/pixelsToRem';
import { css, Theme } from '@emotion/react';

const TRANSITION_TIME = '300ms';
export const BUTTON_COLLAPSE_WIDTH = pixelsToRem(300);

const styles = {
  playButton: ({ palette, fontVariants, fontSizes }: Theme) =>
    css({
      backgroundColor: palette.GREY_2,
      border: 'none',
      color: palette.BLACK,
      cursor: 'pointer',
      display: 'block',
      ...fontVariants.sansBold,
      ...fontSizes.minion,
      height: '2.5rem',
      width: '5.5rem',
      padding: '0',
      position: 'absolute',
      bottom: '0',
      left: '0',
      zIndex: '1',
      transition: `background-color ${TRANSITION_TIME}, color ${TRANSITION_TIME}`,
      [`.${NO_JS_CLASSNAME} &`]: {
        display: 'none',
      },
      '&:focus-visible::before': {
        content: `''`,
        position: 'absolute',
        left: '0',
        right: '0',
        top: '0',
        bottom: '0',
        boxShadow: `0 0 0 ${focusIndicatorThickness} ${palette.WHITE} inset`,
        border: `${focusIndicatorThickness} solid ${palette.BLACK}`,
      },
    }),
  iconWrapper: ({ palette, spacings }: Theme) =>
    css({
      display: 'inline-block',
      '& > svg': {
        color: palette.BLACK,
        fill: 'currentcolor',
        height: `${spacings.DOUBLE}rem`,
        width: `${spacings.DOUBLE}rem`,
        transition: `color ${TRANSITION_TIME}`,
        margin: '0',
      },
    }),
  timeDuration: ({ spacings }: Theme) =>
    css({
      display: 'inline-block',
      margin: `0  ${spacings.HALF}rem`,
      verticalAlign: 'middle',
    }),
};

export default styles;
