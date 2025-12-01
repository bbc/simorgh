/* eslint-disable no-alert */
import React, { use, useState } from 'react';

import PromotionalBanner from '#app/components/PromotionalBanner';
import { ServiceContext } from '#app/contexts/ServiceContext';

const PWAPromotionalBanner = () => {
  const { service } = use(ServiceContext);
  const { promotionalBanner } = use(ServiceContext);
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed || !promotionalBanner || !(service === 'mundo')) {
    return null;
  }

  return (
    <PromotionalBanner
      {...promotionalBanner}
      onPrimaryClick={() => alert('Install PWA: TBD')}
      onSecondaryClick={() => setIsDismissed(true)}
      onClose={() => setIsDismissed(true)}
      isDismissible
    />
  );
};

export default PWAPromotionalBanner;
