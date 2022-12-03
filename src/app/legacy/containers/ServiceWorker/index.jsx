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
      navigator.serviceWorker.register(`/${service}${swPath}`);
    }
  }, [envIsProduction, swPath, service]);

  return null;
};

export default ServiceWorkerContainer;
