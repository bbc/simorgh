import NO_JS_CLASSNAME from '#app/lib/noJs.const';
import pixelsToRem from '#app/utilities/pixelsToRem';
import { css, Theme } from '@emotion/react';

export const customFocusStyle = ({ palette }: Theme) => css`
  outline: ${pixelsToRem(3)}rem solid ${palette.BLACK};
  box-shadow: 0 0 0 ${pixelsToRem(3)}rem ${palette.WHITE};
  outline-offset: ${pixelsToRem(3)}rem;
`;

export default {
  continueReadingButtonA: ({ spacings, palette, mq }: Theme) =>
    css({
      cursor: 'pointer',
      fontWeight: 'bold',
      display: 'block',
      width: `calc(100% - ${spacings.QUADRUPLE}rem)`,
      padding: `${spacings.DOUBLE}rem 0`,
      margin: `0 ${spacings.DOUBLE}rem -${spacings.TRIPLE}rem  ${spacings.DOUBLE}rem`,
      backgroundColor: palette.GREY_10,
      border: 'none',

      span: {
        color: palette.WHITE,
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
        '> span': {
          textDecoration: 'inherit',
        },
      },

      [`.${NO_JS_CLASSNAME} &`]: {
        display: 'none',
      },
    }),
  continueReadingButtonB: ({ spacings, palette, mq }: Theme) =>
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
      borderBottom: `${pixelsToRem(1)}rem solid #B0B2B4`,
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

      [`.${NO_JS_CLASSNAME} &`]: {
        display: 'none',
      },
    }),
  hideButtonOnDesktop: ({ mq }: Theme) =>
    css({
      [mq.GROUP_4_MIN_WIDTH]: {
        display: 'none',
      },
    }),
};
