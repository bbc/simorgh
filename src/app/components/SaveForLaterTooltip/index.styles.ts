import { css, Theme } from '@emotion/react';

export const wrapperStyles = css`
  position: relative;
`;

export const containerStyles = css`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  max-width: 21rem;
  width: 100%;
  display: flex;
  gap: 0.5rem;
  padding: 0.75rem;
  border: 1px solid;
  margin: 0 0.5rem;

  &::before {
    content: '';
    position: absolute;
    top: -0.5625rem;
    left: 1rem;
    width: 0;
    height: 0;
    border-left: 0.5rem solid transparent;
    border-right: 0.5rem solid transparent;
    border-bottom: 0.5625rem solid;
  }

  &::after {
    content: '';
    position: absolute;
    top: -0.4375rem;
    left: 1rem;
    width: 0;
    height: 0;
    border-left: 0.5rem solid transparent;
    border-right: 0.5rem solid transparent;
    border-bottom: 0.5rem solid white;
  }
`;

export const iconStyles = css`
  flex-shrink: 0;
  width: 1.375rem;
  height: 1.375rem;
`;

export const contentStyles = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  a {
    color: inherit;
  }
`;

export const titleStyles = css`
  margin: 0;
  font-weight: 700;
`;

export const bodyStyles = ({ mq }: Theme) =>
  css({
    margin: 0,
    [mq.GROUP_0_MAX_WIDTH]: {
      display: 'none',
    },
  });

export const closeButtonStyles = ({ palette }: Theme) =>
  css({
    flexShrink: 0,
    alignSelf: 'flex-start',
    marginInlineStart: '1.5rem',
    marginBlockStart: '-0.75rem',
    marginInlineEnd: '-0.75rem',
    padding: 0,
    width: '2.75rem',
    height: '2.75rem',
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
      boxShadow: `0 0 0 4px ${palette.GREY_10}`,
      svg: { fill: palette.WHITE },
    },
  });
