import { use, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import onClient from '#lib/utilities/onClient';
import { RequestContext } from '#contexts/RequestContext';
import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';
import { ServiceContext } from '../../contexts/ServiceContext';
import useIsPWA from '#app/hooks/useIsPWA';

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
  const isPWA = useIsPWA();
  useEffect(() => {
    const shouldInstallServiceWorker =
      swPath && onClient() && 'serviceWorker' in navigator;

    if (shouldInstallServiceWorker) {
      navigator.serviceWorker.register(`/${service}${swPath}`);
    }
  }, [swPath, service]);
  // Send PWA status to service worker
  useEffect(() => {
    const sendPWAStatus = () => {
      if (typeof window !== 'undefined' && navigator.serviceWorker.controller) {
        // eslint-disable-next-line no-console
        console.log('Sending PWA status to SW', isPWA);
        if (
          navigator.serviceWorker.controller &&
          navigator.serviceWorker.controller.state === 'activated'
        ) {
          navigator.serviceWorker.controller.postMessage({
            type: 'PWA_STATUS',
            isPWA,
          });
        }
      }
    };

    // Send initially in case SW already controls page
    navigator.serviceWorker.ready.then(sendPWAStatus);

    // Listen for SW taking control
    navigator.serviceWorker.addEventListener('controllerchange', sendPWAStatus);

    return () => {
      navigator.serviceWorker.removeEventListener(
        'controllerchange',
        sendPWAStatus,
      );
    };
  }, [isPWA]);

  return isAmp && swPath ? (
    <>
      <AmpHead />
      <AmpServiceWorker canonicalLink={canonicalLink} swSrc={swSrc} />
    </>
  ) : null;
};
