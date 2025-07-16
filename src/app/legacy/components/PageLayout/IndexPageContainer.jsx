import React from 'react';
import IndexMarginStyles from './IndexMarginStyles';

const IndexPageContainer = ({ children, ...props }) => (
  <div 
    className={`
      ${IndexMarginStyles}
      pt-single pb-quadruple
      group-2:pt-double
      group-2-max:pb-triple
      group-3:pt-0
      group-4:pb-quintuple
    `}
    {...props}
  >
    {children}
  </div>
);

export default IndexPageContainer;
