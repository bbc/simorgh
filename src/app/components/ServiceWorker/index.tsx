import { use, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import onClient from '#lib/utilities/onClient';
import { RequestContext } from '#contexts/RequestContext';
import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';
import { ServiceContext } from '../../contexts/ServiceContext';

interface AmpServiceWorkerProps {
  canonicalLink?: string;
  swSrc?: string;
}

const AmpHead = () => (
  <Helmet>
    <script
      async
      custom-element="amp-install-serviceworker"
      src="https://cdn.ampproject.org/v0/amp-install-serviceworker-0.1.js"
    />
  </Helmet>
);

const AmpServiceWorker = ({
  canonicalLink = '',
  swSrc = '',
}: AmpServiceWorkerProps) => (
  <amp-install-serviceworker
    src={swSrc}
    data-iframe-src={canonicalLink}
    layout="nodisplay"
  />
);

export default () => {
  const { swPath, service } = use(ServiceContext);
  const { isAmp, canonicalLink } = use(RequestContext);
  const swSrc = `${getEnvConfig().SIMORGH_BASE_URL}/${service}${swPath}`;

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
