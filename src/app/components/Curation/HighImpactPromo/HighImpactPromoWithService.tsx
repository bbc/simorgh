/** @jsx jsx */
import { jsx } from '@emotion/react';
import { use } from 'react';
import { Summary } from '#app/models/types/curationData';
import { ServiceContext } from '#app/contexts/ServiceContext';
import type { Services } from '#app/models/types/global';
import HighImpactPromo from './index';

interface HighImpactPromoWithServiceProps extends Summary {
  service: Services;
}

const HighImpactPromoWithService = ({
  service,
  ...summaryProps
}: HighImpactPromoWithServiceProps) => {
  const serviceConfig = use(ServiceContext);

  // Use the service configuration from context
  const subject = {
    href: `https://www.bbc.com/${service}`,
    text: serviceConfig.brandName,
  };

  return <HighImpactPromo {...summaryProps} subject={subject} />;
};

export default HighImpactPromoWithService;
