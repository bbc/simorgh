import React from 'react';

export const Confirm = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    focusable="false"
    aria-hidden="true"
    className={className}
    css={{ display: 'block' }}
  >
    <path d="m32 7.2-2.5-2.4L11 23.3h2L2.4 12.6 0 15.1l12 12.1 20-20z"></path>
  </svg>
);

export const Close = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    focusable="false"
    aria-hidden="true"
    className={className}
    css={{ display: 'block' }}
  >
    <path d="m30 4.6-2.8-2.8L2 27.4l2.8 2.8L30 4.6zM4.8 1.8 1.9 4.7l25.2 25.5 2.9-2.9L4.8 1.8z"></path>
  </svg>
);

export const ExternalLink = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    focusable="false"
    aria-hidden="true"
    className={className}
    css={{ display: 'block' }}
  >
    <path d="M21.9 16.9v11.5H3.7V10.2h11.1V7.6H1V31h23.6V16.9h-2.7zM18 1v2.6h10.2l-.5-1.1L11 19l1.9 1.9L29.6 4.3l-1.2-.5V14H31V1H18z"></path>
  </svg>
);

export const Help = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    focusable="false"
    aria-hidden="true"
    className={className}
    css={{ display: 'block' }}
  >
    <path d="M15.8 26.7c-1.7 0-2.6-1-2.6-2.3s.9-2.3 2.6-2.3c1.7 0 2.6 1 2.6 2.3s-.9 2.3-2.6 2.3zm-1.9-6.9v-.3c0-1.8.6-3.1 2.4-4.3 1.8-1.2 2.3-1.7 2.3-2.9 0-1.4-1.2-2.1-3.3-2.1-1.7 0-3.2.4-4.8 1.4V8c1.7-.9 3.6-1.3 5.6-1.3 4.3 0 7 2 7 5.1 0 2.3-1 3.5-3 4.9-1.9 1.3-2.3 1.8-2.3 2.7v.3h-3.9zM16 31c8.5 0 15-6.5 15-15S24.5 1 16 1 1 7.5 1 16s6.5 15 15 15z"></path>
  </svg>
);
