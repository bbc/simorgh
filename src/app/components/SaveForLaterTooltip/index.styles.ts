import { css, Theme } from '@emotion/react';
import pixelsToRem from '#app/utilities/pixelsToRem';

export const wrapperStyles = css`
  position: relative;
`;

export const containerStyles = ({ spacings, palette }: Theme) =>
  css({
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    maxWidth: `${pixelsToRem(336)}rem`,
    width: '100%',
    display: 'flex',
    gap: '0.5rem',
    padding: '0.75rem',
    border: '1px solid',
    margin: `0 ${spacings.HALF}rem`,
    background: palette.WHITE,

    '&::before': {
      content: '""',
      position: 'absolute',
      top: '-0.5625rem',
      left: `1rem`,
      width: 0,
      height: 0,
      borderLeft: '0.5rem solid transparent',
      borderRight: '0.5rem solid transparent',
      borderBottom: '0.5625rem solid',
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      top: '-0.4375rem',
      left: '1rem',
      width: 0,
      height: 0,
      borderLeft: '0.5rem solid transparent',
      borderRight: '0.5rem solid transparent',
      borderBottom: `0.5rem solid ${palette.WHITE}`,
    },
  });

export const iconStyles = css({
  flexShrink: 0,
  width: `${pixelsToRem(22)}rem`,
  height: `${pixelsToRem(22)}rem`,
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

export const titleStyles = css`
  margin: 0;
  font-weight: 700;
  ...fontSizes.brevier,
`;

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
    marginInlineStart: '1.5rem',
    marginBlockStart: '-0.75rem',
    marginInlineEnd: '-0.75rem',
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
