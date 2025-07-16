import React from 'react';

const CoreIcon = ({ children, ...props }) => (
  <svg
    className="align-middle mx-half text-ebon fill-current"
    focusable="false"
    aria-hidden="true"
    viewBox="0 0 32 32"
    width="1rem"
    height="1rem"
    {...props}
  >
    {children}
  </svg>
);

const ClockIcon = ({ children, ...props }) => (
  <svg
    className="align-middle mx-half text-ebon fill-current"
    focusable="false"
    aria-hidden="true"
    width="0.725rem"
    height="0.725rem"
    {...props}
  >
    {children}
  </svg>
);

const CoreIcons = {
  alert: (
    <CoreIcon>
      <path d="M16 2L0 30h32zm2 25h-4v-4h4zm-4-6V11h4v10z" />
    </CoreIcon>
  ),
  info: (
    <CoreIcon>
      <path d="M16 0a16 16 0 1 0 16 16A16 16 0 0 0 16 0zm2 25h-4V13h4zm0-14h-4V7h4z" />
    </CoreIcon>
  ),
  clock: (
    <ClockIcon viewBox="0 0 13 13" width="13" height="13">
      <path d="M6.5 0A6.5 6.5 0 1013 6.5 6.5 6.5 0 006.5 0zm0 11.5a5 5 0 115-5 5 5 0 01-5 5z" />
      <path d="M7.34 2.9h-1v3.8L9.4 8.57l.41-.56-2.47-1.89V2.9z" />
    </ClockIcon>
  ),
};

export default CoreIcons;
