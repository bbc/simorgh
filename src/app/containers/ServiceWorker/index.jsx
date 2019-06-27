import { useContext, useEffect } from 'react';
import { ServiceContext } from '../../contexts/ServiceContext';
import onClient from '../../lib/utilities/onClient';

const ServiceWorkerContainer = () => {
  const { swPath, service } = useContext(ServiceContext);
  const envIsProduction = process.env.NODE_ENV === 'production';

  useEffect(() => {
    if (envIsProduction && onClient() && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register(`/${service}${swPath}`);
    }
  }, [envIsProduction, swPath, service]);

  return null;
};

export default ServiceWorkerContainer;
