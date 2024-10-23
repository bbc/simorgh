import React from 'react';

const FanSvg = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 32 32"
    focusable="false"
    aria-hidden="true"
    width="6rem"
    height="2rem"
  >
    <path d="M16 25.5c6.8 0 12.1-5.3 12.1-12.1s-5.3-12-12.1-12-12.1 5.2-12.1 12S9.2 25.5 16 25.5m0-2.6c-5.3 0-9.4-4.1-9.4-9.4S10.7 4 16 4s9.4 4.1 9.4 9.4-4.1 9.5-9.4 9.5m0-7.4c.2 0 .5 0 .6-.1l.8.6c.9.8.8 2.1 2.1 2.9 1 .6 2.5.2 3.5-1.5.8-1.5.7-3-.8-3.8-.7-.6-1.3-.6-1.8-.6H18c-.1-.4-.3-.8-.6-1.1l.2-1c.2-1 1.4-1.7 1.4-3.2 0-1.2-1.1-2.3-3.1-2.3-1.7 0-3 .9-3 2.6 0 .9.3 1.4.6 1.9l1.2 2c-.3.3-.6.7-.6 1.1l-.9.3c-1.1.4-2.2-.3-3.5.4-1 .6-1.5 2.1-.5 3.8.8 1.5 2.2 2.1 3.7 1.3.8-.5 1.1-1 1.4-1.4l1.2-2c.1.1.3.1.5.1m-1.3 9.7v2.9h-4.2c-1.5 0-2.1.6-2.1 2.1v.5h15.2v-.5c0-1.5-.6-2.1-2.1-2.1h-4.2v-2.9zM16 14.6c-.6 0-1.1-.5-1.1-1.1s.5-1.1 1.1-1.1 1.1.5 1.1 1.1-.5 1.1-1.1 1.1" />
  </svg>
);

const PlusSvg = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    focusable="false"
    aria-hidden="true"
    viewBox="0 0 32 32"
    width="0.8rem"
    height="0.8rem"
  >
    <path d="M29.6 13.4H18.7v-11h-5.4v11H2.4v5.3h10.9v11h5.4v-11h10.9z" />
  </svg>
);

export default { FanSvg, PlusSvg };
