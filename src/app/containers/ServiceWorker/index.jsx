import { useContext, useEffect } from 'react';
import { ServiceContext } from '../../contexts/ServiceContext';
import onClient from '../../lib/utilities/onClient';

const ServiceWorkerContainer = () => {
  const { swPath } = useContext(ServiceContext);
  const envIsProduction = process.env.NODE_ENV === 'production';

  useEffect(() => {
    if (envIsProduction && onClient() && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register(swPath);
    }
  }, [envIsProduction, swPath]);

  return null;
};

export default ServiceWorkerContainer;
