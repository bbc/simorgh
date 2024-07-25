import React from 'react';

/*
 * This stops any children from loading on IE9 and below.
 */

const IfAboveIE9 = ({ children }) => (
  <>
    {/* eslint-disable-next-line react/no-danger */}
    <div dangerouslySetInnerHTML={{ __html: '<!--[if !IE]><!-->' }} />
    {children}
    {/* eslint-disable-next-line react/no-danger */}
    <div dangerouslySetInnerHTML={{ __html: '<!--<![endif]-->' }} />
  </>
);

export default IfAboveIE9;
