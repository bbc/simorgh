import { css, Theme } from '@emotion/react';

const quickExitButton = ({ palette, fontVariants }: Theme) =>
  css({
    position: 'fixed',
    left: 0,
    top: '90%',
    transform: 'translateY(-90%)',
    backgroundColor: palette.LIVE_DARK,
    color: 'white',
    minHeight: 64,
    minWidth: 36,
    padding: '12px 0',
    border: 'none',
    borderRadius: '0 0.5rem 0.5rem 0',
    zIndex: 1000,
    cursor: 'pointer',
    ...fontVariants.sansBold,
    letterSpacing: '0.1em',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    transition: 'background 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    writingMode: 'vertical-rl',
    textOrientation: 'mixed',
    whiteSpace: 'nowrap',
    '&:hover, &:focus': {
      backgroundColor: palette.LIVE_DARK,
      outline: 'none',
      textDecoration: 'underline',
    },
  });

export default { quickExitButton };
