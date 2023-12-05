import React, { useContext, useEffect } from 'react';
import { string } from 'prop-types';
import { Helmet } from 'react-helmet';
import onClient from '#lib/utilities/onClient';
import { RequestContext } from '#contexts/RequestContext';
import { ServiceContext } from '../../../contexts/ServiceContext';

const AmpHead = () => (
  <Helmet>
    <script
      async
      custom-element="amp-install-serviceworker"
      src="https://cdn.ampproject.org/v0/amp-install-serviceworker-0.1.js"
    />
  </Helmet>
);

const AmpServiceWorker = ({ canonicalLink, swSrc }) => (
  <amp-install-serviceworker
    src={swSrc}
    data-iframe-src={canonicalLink}
    layout="nodisplay"
  />
);

const ServiceWorkerContainer = () => {
  const { swPath, service } = useContext(ServiceContext);
  const { isAmp, canonicalLink } = useContext(RequestContext);
  const swSrc = `${process.env.SIMORGH_BASE_URL}/${service}${swPath}`;

  useEffect(() => {
    const shouldInstallServiceWorker =
      swPath && onClient() && 'serviceWorker' in navigator;

    if (shouldInstallServiceWorker) {
      navigator.serviceWorker.register(`/${service}${swPath}`);
    }
  }, [swPath, service]);

  return isAmp && swPath ? (
    <>
      <AmpHead />
      <AmpServiceWorker canonicalLink={canonicalLink} swSrc={swSrc} />
    </>
  ) : null;
};

AmpServiceWorker.propTypes = {
  canonicalLink: string,
  swSrc: string,
};

AmpServiceWorker.defaultProps = {
  canonicalLink: '',
  swSrc: '',
};

export default ServiceWorkerContainer;
