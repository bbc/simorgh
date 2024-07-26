import { Theme, css, keyframes } from '@emotion/react';

const forwardAnimation = ({ palette }: Theme) =>
  keyframes({
    '0%': {
      borderLeft: `solid red 0.2rem`,
    },
    '100%': {
      borderLeft: `solid ${palette.POSTBOX} 1rem`,
    },
  });

const reverseAnimation = ({ palette }: Theme) =>
  keyframes({
    '0%': {
      borderLeft: `solid ${palette.POSTBOX} 1rem`,
    },
    '100%': {
      borderLeft: `solid red 0.2rem`,
    },
  });

const initialStyle = css({
  borderLeft: 'solid red 0.2rem',
});

const transitionStyle = (forwardTrigger: boolean) => (theme: Theme) =>
  css({
    animation: `${forwardTrigger ? forwardAnimation(theme) : reverseAnimation(theme)} 0.2s ease-out`,
    animationFillMode: 'forwards',
  });

export default (trigger: boolean | null) => [
  initialStyle,
  trigger != null && transitionStyle(trigger),
];
