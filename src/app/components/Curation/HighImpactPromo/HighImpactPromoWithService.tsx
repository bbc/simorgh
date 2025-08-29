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

  const attribution = {
    link: `/${service}`,
    text: serviceConfig.brandName,
  };

  return <HighImpactPromo {...summaryProps} attribution={attribution} />;
};

export default HighImpactPromoWithService;
