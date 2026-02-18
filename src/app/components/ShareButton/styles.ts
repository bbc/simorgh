import { Theme, css } from '@emotion/react';
import pixelsToRem from '../../utilities/pixelsToRem';
import { focusIndicatorThickness } from '../ThemeProvider/focusIndicator';

const styles = {
  button: ({ palette, fontSizes, fontVariants, spacings, mq }: Theme) =>
    css({
      display: 'inline-flex',
      alignItems: 'center',
      ...fontSizes.pica,
      ...fontVariants.sansBold,
      padding: `${pixelsToRem(10)}rem`,
      marginBottom: `${spacings.TRIPLE}rem`,
      marginInlineStart: `${spacings.DOUBLE}rem`,
      border: `${pixelsToRem(2)}rem solid ${palette.BLACK}`,
      cursor: 'pointer',
      '&:hover, &:focus-visible': {
        color: palette.WHITE,
        border: `${pixelsToRem(2)}rem solid ${palette.BRAND_BACKGROUND}`,
        backgroundColor: palette.BRAND_BACKGROUND,
        path: {
          fill: palette.WHITE,
          [mq.FORCED_COLOURS]: {
            fill: 'canvasText',
          },
        },
        [mq.FORCED_COLOURS]: {
          backgroundColor: 'canvas',
          color: 'canvasText',
          border: `${pixelsToRem(2)}rem solid canvasText`,
          textDecoration: 'underline',
        },
      },
      [mq.FORCED_COLOURS]: {
        color: 'canvasText',
        border: `${pixelsToRem(2)}rem solid canvasText`,
      },
    }),
  postButton: ({ palette, spacings, mq }: Theme) =>
    css({
      color: palette.BLACK,
      backgroundColor: palette.WHITE,
      svg: {
        width: `${spacings.DOUBLE}rem`,
        height: `${spacings.DOUBLE}rem`,
        marginInlineEnd: `${spacings.FULL}rem`,
        path: {
          fill: palette.BLACK,
          [mq.FORCED_COLOURS]: {
            fill: 'canvasText',
          },
        },
      },
    }),
  portraitVideoButton: ({ palette, mq }: Theme) =>
    css({
      color: palette.WHITE,
      backgroundColor: palette.BLACK,
      minHeight: `${pixelsToRem(44)}rem`,
      minWidth: `${pixelsToRem(44)}rem`,
      // global styles not applied to shadow dom, so focus indicator styles added here
      '&:focus-visible': {
        outline: `${focusIndicatorThickness} solid ${palette.BLACK}`,
        boxShadow: `0 0 0 ${focusIndicatorThickness} ${palette.WHITE}`,
        outlineOffset: `${focusIndicatorThickness}`,
      },
      svg: {
        width: `${pixelsToRem(18)}rem`,
        height: `${pixelsToRem(18)}rem`,
        margin: 'auto',
        path: {
          fill: palette.WHITE,
          [mq.FORCED_COLOURS]: {
            fill: 'canvasText',
          },
        },
      },
      '&:hover, &:focus-visible': {
        [mq.FORCED_COLOURS]: {
          border: `${pixelsToRem(3)}rem solid canvasText`,
        },
      },
      [mq.FORCED_COLOURS]: {
        border: `${pixelsToRem(1)}rem solid canvasText`,
      },
    }),
};
export default styles;
