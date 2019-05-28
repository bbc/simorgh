import React from 'react';
import { string } from 'prop-types';

const AmpInstallServiceWorker = ({ service }) => {
  const src = `${process.env.SIMORGH_BASE_URL}/${service}/articles/sw.js`;
  return <amp-install-serviceworker src={src} layout="nodisplay" />;
};

AmpInstallServiceWorker.propTypes = {
  service: string.isRequired,
};

export default AmpInstallServiceWorker;
