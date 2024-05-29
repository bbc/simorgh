import React from 'react';

const TickSvg = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 239 239"
    xmlns="http://www.w3.org/2000/svg"
    focusable="false"
    aria-hidden="true"
    width="4rem"
    height="4rem"
  >
    <path d="M151.74 74.17l-43.93 52.36-24.76-20.77-15.33 18.27 24.75 20.76 18.27 15.33 15.33-18.27L170 89.5l-18.26-15.33z" />
    <path
      d="M120.5 30A90.5 90.5 0 1 1 30 120.5 90.6 90.6 0 0 1 120.5 30m0-29A119.5 119.5 0 1 0 240 120.5 119.5 119.5 0 0 0 120.5 1z"
      transform="translate(-1 -1)"
    />
  </svg>
);

export default TickSvg;
