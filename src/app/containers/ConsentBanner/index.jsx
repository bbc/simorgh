import React, { useContext } from 'react';
import { oneOfType, func, shape, any } from 'prop-types';
import { RequestContext } from '#contexts/RequestContext';
import Canonical from './index.canonical';
import Amp from './index.amp';

const ConsentBanner = ({ brandRef }) => {
  const { isAmp } = useContext(RequestContext);
  return isAmp ? <Amp /> : <Canonical brandRef={brandRef} />;
};

ConsentBanner.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  brandRef: oneOfType([func, shape({ current: any })]),
};

ConsentBanner.defaultProps = {
  brandRef: null,
};

export default ConsentBanner;
