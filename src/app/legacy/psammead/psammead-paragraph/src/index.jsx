import React from 'react';
import { getBodyCopy } from '#psammead/gel-foundations/src/typography';
import { getSansRegular } from '#psammead/psammead-styles/src/font-styles';

const Paragraph = ({ script, service, children, className = '', ...props }) => {
  // Get dynamic styles for script and service
  const scriptStyles = script ? getBodyCopy(script) : {};
  const serviceStyles = service ? getSansRegular(service) : {};
  
  return (
    <p
      className={`pb-triple m-0 text-gray-900 dark:text-gray-100 ${className}`}
      style={{
        ...scriptStyles,
        ...serviceStyles
      }}
      {...props}
    >
      {children}
    </p>
  );
};

export default Paragraph;
