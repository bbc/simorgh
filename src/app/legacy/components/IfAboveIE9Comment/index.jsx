import React from 'react';

/*
 * This stops any children from loading on IE9 and below.
 */

const IfAboveIE9 = ({ children }) => (
  <>
    {/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
    <div dangerouslySetInnerHTML={{ __html: '<!--[if !IE]><!-->' }} />
    {children}
    {/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
    <div dangerouslySetInnerHTML={{ __html: '<!--<![endif]-->' }} />
  </>
);

export default IfAboveIE9;
