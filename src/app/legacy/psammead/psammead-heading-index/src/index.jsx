import React from 'react';
import { getDoublePica } from '#psammead/gel-foundations/src/typography';
import { getSansRegular } from '#psammead/psammead-styles/src/font-styles';

const HeadingIndex = ({ script, service, children, className = '', ...props }) => {
  // Get dynamic styles for script and service
  const scriptStyles = script ? getDoublePica(script) : {};
  const serviceStyles = service ? getSansRegular(service) : {};
  
  return (
    <h1
      className={`text-metal m-0 ${className}`}
      style={{
        ...scriptStyles,
        ...serviceStyles
      }}
      tabIndex="-1"
      {...props}
    >
      {children}
    </h1>
  );
};

HeadingIndex.defaultProps = {
  tabIndex: '-1',
};

export default HeadingIndex;
