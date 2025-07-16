import React from 'react';

const InlineLink = ({ children, className = '', ...props }) => {
  return (
    <a
      className={`text-ebon-light dark:text-gray-100 border-b border-postbox no-underline visited:text-metal visited:border-metal hover:border-b-2 hover:border-postbox hover:text-postbox focus:border-b-2 focus:border-postbox focus:text-postbox ${className}`}
      {...props}
    >
      {children}
    </a>
  );
};

export default InlineLink;
