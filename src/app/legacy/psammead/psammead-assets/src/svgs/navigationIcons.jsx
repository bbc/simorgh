import React from 'react';

const svgSize = '2.75rem'; // 44px

const MenuIcon = ({ children, ...props }) => (
  <svg
    className="text-black fill-current forced-colors:fill-[linkText]"
    focusable="false"
    width={svgSize}
    height={svgSize}
    viewBox="0 0 44 44"
    aria-hidden="true"
    {...props}
  >
    {children}
  </svg>
);

const navigationIcons = {
  hamburger: (
    <MenuIcon>
      <path d="M12 29h21v-2.333H12V29zm0-5.833h21v-2.334H12v2.334zM12 15v2.333h21V15H12z" />
    </MenuIcon>
  ),
  cross: (
    <MenuIcon>
      <path
        d="M26.741 15L21.6 20.142 16.458 15 15 16.458l5.142 5.142L15 26.742l1.458 1.458 5.142-5.141 5.141 5.141 1.459-1.458-5.142-5.142 5.142-5.142z"
        fillRule="evenodd"
      />
    </MenuIcon>
  ),
};

export default navigationIcons;
