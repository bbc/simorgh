import { useContext, useEffect } from 'react';
import onClient from '#lib/utilities/onClient';
import { ServiceContext } from '../../../contexts/ServiceContext';

const ServiceWorkerContainer = () => {
  const { swPath, service } = useContext(ServiceContext);
  const envIsProduction = process.env.NODE_ENV === 'production';

  useEffect(() => {
    const shouldInstallServiceWorker =
      swPath && onClient() && 'serviceWorker' in navigator;

    if (shouldInstallServiceWorker) {
      navigator.serviceWorker.register(`/${service}${swPath}`).then((registration) => {
            console.log('Service worker registration succeeded:', registration);
          }, (error) => {
            console.log('Service worker registration failed:', error);
          }
      );
    }
  }, [envIsProduction, swPath, service]);

  return null;
};

export default ServiceWorkerContainer;
