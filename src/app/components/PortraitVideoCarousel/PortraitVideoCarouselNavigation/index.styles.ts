import { css, Theme } from '@emotion/react';
import pixelsToRem from '#app/utilities/pixelsToRem';
import NO_JS_CLASSNAME from '#app/lib/noJs.const';

const styles = {
  buttonGroupOverlay: ({ mq }: Theme) =>
    css({
      display: 'none',
      [`.${NO_JS_CLASSNAME} &`]: {
        display: 'none',
      },
      [mq.GROUP_3_MIN_WIDTH]: {
        display: 'flex',
        position: 'absolute',
        top: 0,
        insetInlineEnd: 0,
        width: '7rem',
        height: '100%',
        backgroundColor: 'rgba(253, 253, 253, 0.6)',
        zIndex: 1,
      },
    }),
  buttonGroup: ({ mq }: Theme) =>
    css({
      display: 'none',
      [`.${NO_JS_CLASSNAME} &`]: {
        display: 'none',
      },
      [mq.GROUP_3_MIN_WIDTH]: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.25rem',
      },
    }),
  navButton: ({ palette, spacings }: Theme) =>
    css({
      backgroundColor: palette.BLACK,
      border: 'none',
      width: `${pixelsToRem(44)}rem`,
      height: `${pixelsToRem(44)}rem`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      '&:disabled': {
        opacity: 0.2,
        cursor: 'not-allowed',
      },
      '& svg': {
        width: `${spacings.DOUBLE}rem`,
        height: `${spacings.DOUBLE}rem`,
        fill: palette.GREY_2,
      },
    }),
};

export default styles;
