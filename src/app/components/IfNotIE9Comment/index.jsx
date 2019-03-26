import React from 'react';

/*
 * These, when used together, stop anything within them from loading on IE9 and below.
 */

export const IfNotIE9Open = () => (
  <div dangerouslySetInnerHTML={{ __html: '<!--[if !IE]><!-->' }} /> // eslint-disable-line react/no-danger
);

export const IfNotIE9Close = () => (
  <div dangerouslySetInnerHTML={{ __html: '<!--<![endif]-->' }} /> // eslint-disable-line react/no-danger
);
