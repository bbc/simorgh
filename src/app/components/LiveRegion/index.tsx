import React from 'react';
import VisuallyHiddenText from '../VisuallyHiddenText';

const LiveRegion = ({ children }) => {
  return <VisuallyHiddenText aria-live="polite">{children}</VisuallyHiddenText>;
};

export default LiveRegion;
