/* eslint-disable react/no-danger */
import React from 'react';
import { node } from 'prop-types';

/*
 * This stops any children from loading on IE9 and below.
 */

const IfAboveIE9 = ({ children }) => (
  <>
    <div dangerouslySetInnerHTML={{ __html: '<!--[if !IE]><!-->' }} />
    {children}
    <div dangerouslySetInnerHTML={{ __html: '<!--<![endif]-->' }} />
  </>
);

IfAboveIE9.propTypes = {
  children: node.isRequired,
};

export default IfAboveIE9;
