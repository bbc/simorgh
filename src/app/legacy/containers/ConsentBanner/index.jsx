import React, { useContext } from 'react';
import { RequestContext } from '#contexts/RequestContext';
import Canonical from './index.canonical';

const ConsentBanner = ({ onDismissFocusRef = null }) => {
  const { isAmp, isLite } = useContext(RequestContext);
  if (isLite || isAmp) return null;

  return <Canonical onDismissFocusRef={onDismissFocusRef} />;
};

export default ConsentBanner;
