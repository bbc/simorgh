import React from 'react';

// Because IE11 can't handle 8-digit hex, need to convert to rgba
const hexToRGB = (hex, alpha = 1) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const ScrollableNavigation = ({ children, dir = 'ltr', ...props }) => {
  const gradientStyle = {
    background: `linear-gradient(
      ${dir === 'ltr' ? 'to right' : 'to left'},
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 1) 100%
    )`,
  };

  return (
    <div
      className={`
        group-2-max:whitespace-nowrap group-2-max:overflow-x-scroll
        group-2-max:scrollbar-none group-2-max:[-webkit-overflow-scrolling:touch]
        group-2-max:[-ms-overflow-style:none]
        group-2-max:[scrollbar-width:none]
        group-2-max:[&::-webkit-scrollbar]:hidden
        group-2-max:focus-visible:outline-none
        group-2-max:relative
      `}
      data-e2e="scrollable-nav"
      dir={dir}
      {...props}
    >
      {children}
      <div
        className={`
          group-2-max:absolute group-2-max:bottom-0 group-2-max:h-full
          group-2-max:w-quin group-2:w-24 group-2-max:z-10
          group-2-max:overflow-hidden group-2-max:pointer-events-none
          ${dir === 'ltr' ? 'group-2-max:right-0' : 'group-2-max:left-0'}
        `}
        style={gradientStyle}
      />
    </div>
  );
};

export default ScrollableNavigation;
