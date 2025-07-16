import React from 'react';
import {
  getCanon,
  getTrafalgar,
} from '#psammead/gel-foundations/src/typography';
import {
  getSansBold,
  getSerifMedium,
} from '#psammead/psammead-styles/src/font-styles';

export const Headline = ({ script, service, children, className = '', ...props }) => {
  // Get dynamic styles for script and service
  const scriptStyles = script ? getCanon(script) : {};
  const serviceStyles = service ? getSerifMedium(service) : {};
  
  return (
    <h1
      className={`text-gray-900 dark:text-gray-100 block m-0 py-quad group-3:py-quin ${className}`}
      style={{
        ...scriptStyles,
        ...serviceStyles
      }}
      {...props}
    >
      {children}
    </h1>
  );
};

export const SubHeading = ({ script, service, children, className = '', ...props }) => {
  // Get dynamic styles for script and service
  const scriptStyles = script ? getTrafalgar(script) : {};
  const serviceStyles = service ? getSansBold(service) : {};
  
  return (
    <h2
      className={`text-gray-900 dark:text-gray-100 py-2 my-triple group-3:mt-quad scroll-mt-double focus-visible:outline-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:shadow-focus-ring ${className}`}
      style={{
        ...scriptStyles,
        ...serviceStyles
      }}
      tabIndex="-1"
      {...props}
    >
      {children}
    </h2>
  );
};

SubHeading.defaultProps = {
  tabIndex: '-1',
};
