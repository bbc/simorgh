import React, { useContext } from 'react';
import { RequestContext } from '#contexts/RequestContext';
import Canonical from './index.canonical';
import Amp from './index.amp';
import useToggle from '#hooks/useToggle';

const IncludeContainer = props => {
  const { isAmp } = useContext(RequestContext);
  const { enabled } = useToggle('include');

  if (!enabled) return null;

  const Container = isAmp ? Amp : Canonical;

  return <Container {...props} />;
};

export default IncludeContainer;
