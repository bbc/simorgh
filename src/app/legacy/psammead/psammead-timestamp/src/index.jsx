import React from 'react';
import { getBrevier } from '#psammead/gel-foundations/src/typography';

const Timestamp = ({
  children,
  datetime,
  typographyFunc = getBrevier,
  script,
  padding = true,
  service,
  className = '',
}) => {
  const baseClasses = 'text-gel-brevier text-grey-6 dark:text-grey-3 block font-sans-regular';
  const paddingClasses = padding ? 'pb-2 last:pb-4' : '';
  
  return (
    <time
      dateTime={datetime}
      suppressHydrationWarning
      className={`${baseClasses} ${paddingClasses} ${className}`.trim()}
    >
      {children}
    </time>
  );
};

export default Timestamp;
