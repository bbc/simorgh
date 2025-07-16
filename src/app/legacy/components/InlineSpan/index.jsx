import React from 'react';

const InlineSpan = ({ children, ...props }) => (
  <span className="pb-triple m-0" {...props}>
    {children}
  </span>
);

export default InlineSpan;
