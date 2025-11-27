/** @jsx jsx */
/* @jsxFrag React.Fragment */
import React, { use, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import onClient from '#lib/utilities/onClient';
import { RequestContext } from '#contexts/RequestContext';
import { jsx } from '@emotion/react';
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
    const registerServiceWorker = async () => {
      const shouldInstallServiceWorker =
        swPath && onClient() && 'serviceWorker' in navigator;

      if (shouldInstallServiceWorker) {
        try {
          const registration = await navigator.serviceWorker.register(
            `/${service}${swPath}`,
          );

          // Type assertion to inform TypeScript about periodicSync
          const periodicSyncRegistration =
            registration as ServiceWorkerRegistration & {
              periodicSync?: {
                register: (
                  tag: string,
                  options: { minInterval: number },
                ) => Promise<void>;
                getTags: () => Promise<string[]>;
              };
            };

          if (periodicSyncRegistration.periodicSync) {
            try {
              // Check if the browser allows periodic background sync
              const status = await navigator.permissions.query({
                name: 'periodic-background-sync' as PermissionName,
              });

              if (status.state === 'granted') {
                // Check if the periodic sync tag is already registered
                const tags = await periodicSyncRegistration.periodicSync.getTags();
                if (tags.includes('get-latest-news')) {
                  console.warn(
                    'Periodic Sync for "get-latest-news" is already registered.',
                  );
                  return;
                }

                // Register the periodic sync task
                await periodicSyncRegistration.periodicSync.register(
                  'get-latest-news',
                  {
                    minInterval: 12 * 60 * 60 * 1000, // 12 hours
                  },
                );
                console.warn('Periodic Sync registered successfully.');
              } else {
                console.warn(
                  'Periodic Background Sync permission is not granted.',
                );
              }
            } catch (error) {
              console.error('Failed to register Periodic Sync:', error);
            }
          } else {
            console.warn('Periodic Sync is not supported in this browser.');
          }
        } catch (error) {
          console.error('Service Worker registration failed:', error);
        }
      }
    };

    registerServiceWorker();
  }, [swPath, service]);

  return isAmp && swPath ? (
    <>
      <AmpHead />
      <AmpServiceWorker canonicalLink={canonicalLink} swSrc={swSrc} />
    </>
  ) : null;
};
