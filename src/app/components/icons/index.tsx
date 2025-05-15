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

export const Clock = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    aria-hidden="true"
    width="12"
    height="12"
    className={className}
  >
    <path d="M16 31c8.5 0 15-6.5 15-15S24.5 1 16 1 1 7.5 1 16s6.5 15 15 15zm0-2.7C9 28.3 3.7 23 3.7 16S9 3.7 16 3.7C23 3.7 28.3 9 28.3 16S23 28.3 16 28.3zm6.2-6.7 1-1.5-5.7-4.5-.6-8.6H15l-.7 10.5 7.9 4.1z" />
  </svg>
);

export const Book = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    aria-hidden="true"
    width="12"
    height="12"
    className={className}
  >
    <path d="M8.6 1.6c-3.1 0-5 1.8-5 5v18.9c0 3.1 1.8 5 5 5h19.7V6.1h-2.2v21.7H8.2c-1.2 0-2.3-1-2.3-2.3s1-2.3 2.3-2.3h15.3V1.6H8.6z" />
  </svg>
);

export const Words = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    aria-hidden="true"
    width="12"
    height="12"
    className={className}
  >
    <path d="M6 15.9h10v2H6zm4-4h12v2H10zm8 4h8v2h-8z" />
    <path d="M28 3.9H4c-1.1 0-2 .9-2 2v15c0 1.1.9 2 2 2h10.2v7l7.4-7H28c1.1 0 2-.9 2-2v-15c0-1.1-.9-2-2-2zm-6.4 17H20L16.2 25v-4.1H4v-15h24v15h-6.4z" />
  </svg>
);

export const Articles = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    aria-hidden="true"
    width="12"
    height="12"
    className={className}
  >
    <path d="M5 9v20h22V9Zm20 18h-3a5.89 5.89 0 0 0-6-5 5.89 5.89 0 0 0-6 5H7V11h18ZM7 6h18v2H7zm2-3h14v2H9z" />
    <circle cx="15.998" cy="17.5" r="3.5" />
  </svg>
);

export const Calendar = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    aria-hidden="true"
    width="12"
    height="12"
    className={className}
  >
    <path d="M6.2 30.5h19.5c5 0 5.3-2.5 5.3-5.3V9.3h-2.6v16c0 2-.6 2.6-2.6 2.6H6.3c-2 0-2.6-.6-2.6-2.6v-16H1v15.9c0 2.8.2 5.3 5.2 5.3zM10.8 15h2v-2h-2v2zM1 9.6h30V1.5h-5.3v3h-3v-3H9.2v3h-3v-3H1v8.1zM15 15h2v-2h-2v2zm4.1 0h2v-2h-2v2zm4.2 0h2v-2h-2v2zm-12.5 4.7h2v-2h-2v2zm4.2 0h2v-2h-2v2zm4.1 0h2v-2h-2v2zm4.2 0h2v-2h-2v2zm-16.6 0h2v-2h-2v2zm4.1 4.7h2v-2h-2v2zm4.2 0h2v-2h-2v2zm4.1 0h2v-2h-2v2zm-12.4 0h2v-2h-2v2z" />
  </svg>
);

export const Favourites = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    aria-hidden="true"
    width="12"
    height="12"
    className={className}
  >
    <path d="M9.1 7.5h21.8V1.9H9.1v5.6zm0 22.6h21.8v-5.6H9.1v5.6zm7.2-11.3h14.6v-5.6H16.3v5.6zm-2.8-4.6H9.1V9.8H5.5v4.4H1.1v3.5h4.4v4.4h3.6v-4.4h4.4v-3.5z" />
  </svg>
);

export const Calculator = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    aria-hidden="true"
    width="12"
    height="12"
    className={className}
  >
    <path d="M22.8 32H9.2c-1.2 0-2.1-.3-2.6-.8s-.8-1.4-.8-2.6V3.4c0-1.2.3-2.1.8-2.6S8 0 9.2 0h13.6c1.3 0 2.1.3 2.6.8s.8 1.4.8 2.6v25.2c0 1.2-.3 2.1-.8 2.6s-1.3.8-2.6.8zm.8-29.4H8.4V12h15.2V2.6zM12.1 14.2H8.4v3.7h3.7v-3.7zm0 5.7H8.4v3.7h3.7v-3.7zm0 5.8H8.4v3.7h3.7v-3.7zm5.7-11.5h-3.7v3.7h3.7v-3.7zm0 5.7h-3.7v3.7h3.7v-3.7zm0 5.8h-3.7v3.7h3.7v-3.7zm5.8-11.5h-3.7v3.7h3.7v-3.7zm0 5.7h-3.7v9.5h3.7v-9.5z" />
  </svg>
);

export const Close = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="12"
    height="12"
    className={className}
    focusable="false"
    aria-hidden="true"
  >
    <path d="m30 4.6-2.8-2.8L2 27.4l2.8 2.8zM4.8 1.8 1.9 4.7l25.2 25.5 2.9-2.9z" />
  </svg>
);

export const Play = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="12"
    height="12"
    className={className}
    focusable="false"
    aria-hidden="true"
  >
    <path d="M29 16 5.8 1v30z" />
  </svg>
);
