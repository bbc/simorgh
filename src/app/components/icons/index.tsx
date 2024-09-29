import React from 'react';

export const Ellipsis = () => (
  <svg
    viewBox="0 0 32 32"
    focusable="false"
    aria-hidden="true"
    width="12"
    height="12"
  >
    <path d="M1.6 18.8h5.8v-5.6H1.6v5.6zm11.5 0h5.8v-5.6h-5.8v5.6zm11.5 0h5.8v-5.6h-5.8v5.6z" />
  </svg>
);
export const LeftChevron = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 32 32"
    focusable="false"
    aria-hidden="true"
    width="12"
    height="12"
    className={className}
  >
    <path d="M10.4 14.3L26.5 31h-6.4L5.5 16 20.1 1h6.4L10.4 17.7v-3.4z" />
  </svg>
);

export const RightChevron = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 32 32"
    focusable="false"
    aria-hidden="true"
    width="12"
    height="12"
    className={className}
  >
    <path d="M21.6 14.3L5.5 31h6.4l14.6-15L11.9 1H5.5l16.1 16.7v-3.4z" />
  </svg>
);

export const RightArrow = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 32 32"
    focusable="false"
    aria-hidden="true"
    width="12"
    height="12"
    className={className}
  >
    <g>
      <path d="M12.6,26.7L23.2,16L12.6,5.3H8.8v21.4H12.6z" />
    </g>
  </svg>
);
