import React from 'react';
import { getPica } from '#psammead/gel-foundations/src/typography';
import { getSansRegular } from '#psammead/psammead-styles/src/font-styles';

const SKIP_LINK_COLOR = '#333';
const SKIP_LINK_BORDER = '0.1875rem'; // 3px
const TOP_BOTTOM_SPACING = '0.75rem'; // 12px

const SkipLink = ({ script, service, dir = 'ltr', className = 'focusIndicatorRemove', children, ...props }) => {
  // Get dynamic styles for script and service
  const scriptStyles = script ? getPica(script) : {};
  const serviceStyles = service ? getSansRegular(service) : {};
  
  const directionClasses = dir === 'ltr' ? 'focus:left-0' : 'focus:right-0';
  
  return (
    <a
      className={`absolute sr-only bg-white border-black border-4 no-underline text-gray-800 focus:clip-auto focus:h-auto focus:w-auto focus:top-0 focus:group-2:top-double max-group-2:p-double ${directionClasses} ${className}`}
      style={{
        ...scriptStyles,
        ...serviceStyles,
        padding: `${TOP_BOTTOM_SPACING} 1rem`,
        borderWidth: SKIP_LINK_BORDER,
        color: SKIP_LINK_COLOR,
        ...(window.matchMedia('(max-width: 37.5rem)').matches && {
          padding: '1rem'
        })
      }}
      {...props}
    >
      {children}
    </a>
  );
};

SkipLink.defaultProps = { dir: 'ltr', className: 'focusIndicatorRemove' };

export default SkipLink;
