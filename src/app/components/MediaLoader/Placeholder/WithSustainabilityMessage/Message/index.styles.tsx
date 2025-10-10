import { focusIndicatorThickness } from '#app/components/ThemeProvider/focusIndicator';
import pixelsToRem from '#app/utilities/pixelsToRem';
import { css, Theme } from '@emotion/react';
import NO_JS_CLASSNAME from '#app/lib/noJs.const';

const WIDTH = 250;
const BUTTON_COLLAPSE_WIDTH = pixelsToRem(300);

const styles = {
  container: ({ palette, spacings, mq }: Theme) =>
    css({
      position: 'absolute',
      color: palette.WHITE,
      padding: `${spacings.FULL}rem`,
      display: 'flex',
      flexWrap: 'nowrap',
      background: `rgba(14, 98, 0, 0.9)`,
      height: '100%',
      width: '100%',
      zIndex: '1',
      [`.${NO_JS_CLASSNAME} &`]: {
        display: 'none',
      },
      [mq.GROUP_2_MIN_WIDTH]: {
        insetInlineStart: `calc(100% - ${pixelsToRem(WIDTH)}rem)`,
        width: `${pixelsToRem(WIDTH)}rem`,
        height: 'unset',
      },
      [`@media (max-width: ${BUTTON_COLLAPSE_WIDTH}rem)`]: {
        padding: `${spacings.DOUBLE}rem`,
      },
    }),
  icon: ({ mq, palette }: Theme) =>
    css({
      fill: palette.WHITE,
      [mq.FORCED_COLOURS]: {
        path: {
          fill: 'currentColor',
        },
      },
    }),
  fanIcon: ({ spacings }: Theme) =>
    css({
      marginTop: `${pixelsToRem(2)}rem`,
      marginInlineEnd: `${spacings.FULL}rem`,
      marginInlineStart: `${spacings.HALF}rem`,
    }),
  plusIcon: () =>
    css({
      margin: `0 0.2rem 0 0`,
    }),
  collapsable: () =>
    css({
      [`@media (max-width: ${BUTTON_COLLAPSE_WIDTH}rem)`]: {
        display: 'none',
      },
    }),
  message: ({ palette }: Theme) =>
    css({
      margin: '0',
      color: palette.WHITE,
    }),
  underline: ({ palette }: Theme) =>
    css({
      borderBottom: `${pixelsToRem(1)}rem solid ${palette.WHITE}`,
      '.mediaLoaderPlaceholder:hover &, .mediaLoaderPlaceholder:focus &': {
        borderBottom: `${pixelsToRem(2)}rem solid ${palette.WHITE}`,
      },
    }),
  loadVideoContainer: ({ spacings }: Theme) =>
    css({
      margin: `${spacings.DOUBLE}rem 0 ${spacings.HALF}rem 0`,
    }),
  loadVideo: ({ palette }: Theme) =>
    css({
      all: 'unset',
      '&:focus': {
        outline: `${focusIndicatorThickness} solid ${palette.BLACK}`,
        boxShadow: `0 0 0 ${focusIndicatorThickness} ${palette.WHITE}`,
        outlineOffset: `${focusIndicatorThickness}`,
      },
    }),
};

export default styles;
