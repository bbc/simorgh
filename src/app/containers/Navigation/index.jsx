import React, { useContext } from 'react';
import { RequestContext } from '#contexts/RequestContext';
import Canonical from './index.canonical';
import Amp from './index.amp';

const Navigation = () => {
  const { platform } = useContext(RequestContext);
  return platform === 'amp' ? <Amp /> : <Canonical />;
};

export default Navigation;
