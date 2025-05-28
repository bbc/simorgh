import { css, Theme } from '@emotion/react';
import pixelsToRem from '#app/utilities/pixelsToRem';
import { calculateVariedNavContainerWidths } from '../utils/styleUtils';

const styles = {
  buttonGroupOverlay: ({ mq }: Theme) =>
    css({
      display: 'none',
      position: 'absolute',
      top: 0,
      insetInlineEnd: 0,
      height: '100%',
      backgroundColor: 'rgba(255, 255, 255, 0.75)',
      zIndex: 1,
      ...calculateVariedNavContainerWidths({ mq, display: 'flex' }),
    }),
  buttonGroup: ({ spacings }: Theme) =>
    css({
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: `${spacings.HALF}rem`,
      padding: `0 ${spacings.FULL}rem`,
    }),
  navButton: ({ palette, spacings }: Theme) =>
    css({
      backgroundColor: palette.BLACK,
      border: 'none',
      width: '100%',
      maxWidth: `${pixelsToRem(44)}rem`,
      aspectRatio: '1/1',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      color: palette.GREY_2,
      '&:disabled': {
        opacity: 0.2,
        cursor: 'not-allowed',
      },
      '& svg': {
        width: `${spacings.DOUBLE}rem`,
        height: `${spacings.DOUBLE}rem`,
        fill: 'currentcolor',
      },
    }),
};

export default styles;
