import { css, Theme } from '@emotion/react';
import pixelsToRem from '#app/utilities/pixelsToRem';
import { calculateVariedNavContainerWidths } from '../utils/styleUtils';

const BUTTON_WIDTH_PX = 44;

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
      maxWidth: `${pixelsToRem(BUTTON_WIDTH_PX)}rem`,
      aspectRatio: '1/1',
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
