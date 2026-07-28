import { css, Theme } from '@emotion/react';
import pixelsToRem from '#app/utilities/pixelsToRem';

export const wrapperStyles = css`
  position: relative;
`;

export const containerStyles = ({ spacings }: Theme) =>
  css({
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    maxWidth: pixelsToRem(336),
    width: '100%',
    display: 'flex',
    gap: `${spacings.HALF}rem`,
    padding: `${spacings.FULL}rem`,
    border: '1px solid',
    margin: `0 ${spacings.HALF}rem`,
    '&::before': {
      content: '""',
      position: 'absolute',
      top: `-${pixelsToRem(9)}`,
      left: `${spacings.FULL}rem`,
      width: 0,
      height: 0,
      borderLeft: `${pixelsToRem(8)} solid transparent`,
      borderRight: `${pixelsToRem(8)} solid transparent`,
      borderBottom: `${pixelsToRem(9)} solid`,
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      top: `-${pixelsToRem(7)}`,
      left: `${spacings.FULL}rem`,
      width: 0,
      height: 0,
      borderLeft: `${pixelsToRem(8)} solid transparent`,
      borderRight: `${pixelsToRem(8)} solid transparent`,
      borderBottom: `${spacings.HALF}rem solid white`,
    },
  });

export const iconStyles = css({
  flexShrink: 0,
  width: pixelsToRem(22),
  height: pixelsToRem(22),
});

export const contentStyles = ({ spacings }: Theme) =>
  css({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: `${spacings.DOUBLE}rem`,
    a: {
      color: 'inherit',
    },
  });

export const titleStyles = ({ fontSizes }: Theme) =>
  css({
    margin: 0,
    fontWeight: 700,
    ...fontSizes.brevier,
  });

export const bodyStyles = ({ fontSizes, mq }: Theme) =>
  css({
    margin: 0,
    ...fontSizes.brevier,
    [mq.GROUP_0_MAX_WIDTH]: {
      display: 'none',
    },
  });

export const closeButtonStyles = ({ palette, spacings }: Theme) =>
  css({
    flexShrink: 0,
    alignSelf: 'flex-start',
    marginInlineStart: `${spacings.TRIPLE}rem`,
    marginBlockStart: `-${spacings.FULL}rem`,
    marginInlineEnd: `-${spacings.FULL}rem`,
    padding: 0,
    width: `${spacings.QUADRUPLE}rem`,
    height: `${spacings.QUADRUPLE}rem`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: palette.WHITE,
    border: 'none',
    cursor: 'pointer',
    svg: {
      display: 'block',
      fill: palette.GREY_10,
    },
    '&:hover': {
      background: palette.POSTBOX,
      svg: { fill: palette.WHITE },
    },
    '&:focus-visible': {
      background: palette.POSTBOX,
      outline: `2px solid ${palette.WHITE}`,
      boxShadow: `0 0 0 ${pixelsToRem(4)} ${palette.GREY_10}`,
      svg: { fill: palette.WHITE },
    },
  });
