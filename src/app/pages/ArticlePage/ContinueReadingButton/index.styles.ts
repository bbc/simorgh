import { OPERA_MINI_CLASSNAME } from '#app/lib/utilities/addOperaMiniClassScript';
import { visuallyHiddenStyle } from '#app/lib/styles.const';
import pixelsToRem from '#app/utilities/pixelsToRem';
import { css, Theme } from '@emotion/react';

export default {
  continueReadingToggle: () => css`
    ${visuallyHiddenStyle}
  `,
  continueReadingButton: ({ spacings, palette, mq }: Theme) =>
    css({
      cursor: 'pointer',
      fontWeight: 'bold',
      display: 'block',
      width: `calc(100% - ${spacings.QUADRUPLE}rem)`,
      padding: `${spacings.DOUBLE}rem 0`,
      margin: `0 ${spacings.DOUBLE}rem -${spacings.FULL}rem ${spacings.DOUBLE}rem`,
      backgroundColor: palette.GREY_2,
      color: palette.GREY_10,
      textAlign: 'start',
      border: 'none',
      borderBottom: `${pixelsToRem(1)}rem solid ${palette.GREY_4}`,
      paddingBottom: `calc(${spacings.DOUBLE}rem + ${spacings.FULL}rem)`,

      svg: {
        fill: 'currentColor',
        width: `${spacings.DOUBLE}rem`,
        height: `${spacings.DOUBLE}rem`,
        marginInlineStart: `${pixelsToRem(10)}rem`,
        verticalAlign: 'middle',
      },
      '@media (forced-colors: active)': {
        backgroundColor: 'Canvas', // System-defined background color
        color: 'CanvasText', // System-defined text color
        border: `${pixelsToRem(1)}rem solid CanvasText`, // Ensure visibility in high contrast
      },

      [mq.GROUP_1_MAX_WIDTH]: {
        margin: `0 ${spacings.FULL}rem -${spacings.TRIPLE}rem ${spacings.FULL}rem`,
        width: `calc(100% - ${spacings.DOUBLE}rem)`,
      },

      '&:hover, &:focus': {
        textDecoration: 'underline',
      },

      [`.${OPERA_MINI_CLASSNAME} &`]: {
        display: 'none',
      },

      '[id="continue-reading-toggle"]:checked + &': {
        display: 'none',
      },

      '[id="continue-reading-toggle"]:focus-visible + &': {
        outline: `${pixelsToRem(3)}rem solid ${palette.BLACK}`,
        boxShadow: `0 0 0 ${pixelsToRem(3)}rem ${palette.WHITE}`,
        outlineOffset: `${pixelsToRem(3)}rem`,
      },

      [mq.GROUP_4_MIN_WIDTH]: {
        display: 'none',
      },
    }),
};
