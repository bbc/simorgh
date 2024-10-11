import pixelsToRem from '#app/utilities/pixelsToRem';
import { css, Theme } from '@emotion/react';

const GEL_SPACING_DEC = '5rem';
const BGC_TRANSITION_DURATION = '300ms';

const styles = {
  button: ({ palette, fontSizes, fontVariants, mq }: Theme) =>
    css({
      ...fontSizes.minion,
      ...fontVariants.sansBold,
      backgroundColor: palette.EBON,
      border: 'none',
      color: palette.WHITE,
      cursor: 'pointer',
      display: 'block',
      height: GEL_SPACING_DEC,
      width: GEL_SPACING_DEC,
      padding: 0,
      transition: `background-color ${BGC_TRANSITION_DURATION}`,
      '&:hover, &:focus': {
        backgroundColor: palette.POSTBOX,
        transition: `background-color ${BGC_TRANSITION_DURATION}`,
      },
      [mq.FORCED_COLOURS]: {
        backgroundColor: 'canvas',
        border: `${pixelsToRem(1)}rem solid canvasText`,
        transition: 'none',
        '&:hover, &:focus': {
          backgroundColor: 'canvas',
          transition: 'none',
        },
        '&:focus': { border: 'none' },
      },
    }),
  iconWrapper: ({ palette, spacings, mq }: Theme) =>
    css({
      '> svg': {
        color: palette.WHITE,
        fill: 'currentColor',
        height: `${spacings.TRIPLE}rem`,
        width: `${spacings.TRIPLE}rem`,
        [mq.FORCED_COLOURS]: {
          color: 'canvasText',
        },
      },
    }),
  iconWrapperWithDate: ({ spacings }: Theme) =>
    css({
      marginTop: `${spacings.FULL}rem`,
    }),
  timeDuration: ({ palette, spacings, mq }: Theme) =>
    css({
      display: 'block',
      marginTop: `${spacings.FULL}rem`,
      color: palette.WHITE,
      [mq.FORCED_COLOURS]: {
        color: 'canvasText',
      },
    }),
};
export default styles;
