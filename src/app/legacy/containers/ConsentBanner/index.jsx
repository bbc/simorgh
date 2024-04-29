import React, { useContext } from 'react';
import { oneOfType, func, shape, any } from 'prop-types';
import { RequestContext } from '#contexts/RequestContext';
import Canonical from './index.canonical';
import Amp from './index.amp';

const ConsentBanner = ({ onDismissFocusRef }) => {
  const { isAmp, isLite } = useContext(RequestContext);
  if (isLite) return null;

  return isAmp ? <Amp /> : <Canonical onDismissFocusRef={onDismissFocusRef} />;
};

ConsentBanner.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  onDismissFocusRef: oneOfType([func, shape({ current: any })]),
};

ConsentBanner.defaultProps = {
  onDismissFocusRef: null,
};

export default ConsentBanner;
