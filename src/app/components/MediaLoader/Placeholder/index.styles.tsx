import { css, Theme } from '@emotion/react';
import NO_JS_CLASSNAME from '#app/lib/noJs.const';
import { focusIndicatorThickness } from '../../ThemeProvider/focusIndicator';

const styles = {
  placeholder: ({ palette }: Theme) =>
    css({
      position: 'relative',
      aspectRatio: '16 / 9',
      cursor: 'pointer',
      [`.${NO_JS_CLASSNAME} &`]: {
        cursor: 'default',
      },
      '&:hover, &:focus': {
        '.focusIndicatorRemove': {
          backgroundColor: palette.POSTBOX,
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
