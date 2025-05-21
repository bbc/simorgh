import { css, Theme } from '@emotion/react';
import pixelsToRem from '#app/utilities/pixelsToRem';
import NO_JS_CLASSNAME from '#app/lib/noJs.const';
import {
  calculateWidth,
  NAVIGATION_BUFFER,
  NAVIGATION_BUTTON_RATIO,
} from '../utils';

const calculateNavContainerWidth = (itemCount: number) =>
  `calc((${calculateWidth({ itemCount, navButtonAffordance: true })} * ${NAVIGATION_BUTTON_RATIO}) + ${NAVIGATION_BUFFER})`;

const styles = {
  buttonGroupOverlay: ({ mq }: Theme) =>
    css({
      display: 'none',
      position: 'absolute',
      top: 0,
      insetInlineEnd: 0,
      height: '100%',
      backgroundColor: 'rgba(253, 253, 253, 0.6)',
      zIndex: 1,
      [mq.GROUP_3_MIN_WIDTH]: {
        [mq.POINTER]: {
          display: 'flex',
          width: calculateNavContainerWidth(3),
        },
      },
      [mq.GROUP_4_MIN_WIDTH]: {
        display: 'flex',
        width: calculateNavContainerWidth(4),
      },
      [mq.GROUP_5_MIN_WIDTH]: {
        display: 'flex',
        width: calculateNavContainerWidth(6),
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
