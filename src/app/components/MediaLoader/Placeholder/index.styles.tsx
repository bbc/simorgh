import { css, Theme } from '@emotion/react';
import NO_JS_CLASSNAME from '#app/lib/noJs.const';
import pixelsToRem from '#app/utilities/pixelsToRem';
import { focusIndicatorThickness } from '../../ThemeProvider/focusIndicator';

const styles = {
  placeholder: ({ palette, mq }: Theme) =>
    css({
      position: 'relative',
      cursor: 'pointer',
      height: '100%',

      [`.${NO_JS_CLASSNAME} &`]: {
        cursor: 'default',
      },
      '&:hover, &:focus': {
        '> button': {
          backgroundColor: palette.POSTBOX,
        },
      },
      [mq.FORCED_COLOURS]: {
        '&:hover, &:focus': {
          '> button': {
            backgroundColor: 'canvas',
            border: `${pixelsToRem(3)}rem solid canvasText`,
            '> time': { textDecoration: 'underline' },
          },
        },
      },
    }),

  playButton: ({ palette }: Theme) =>
    css({
      position: 'absolute',
      bottom: '0',
      left: '0',
      zIndex: '1',
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

  guidance: () =>
    css({
      zIndex: '1',
    }),
};
export default styles;
