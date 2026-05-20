import { use, useMemo } from 'react';

import LiveLabel from '#app/components/LiveLabel';
import Timestamp from '#components/Promo/timestamp';
import { ServiceContext } from '../../../contexts/ServiceContext';
import Content from './Content';
import Image from './Image';
import { ContentWrapper, PromoWrapper } from './index.styles';
import Link from './Link';
import MediaIndicator from './MediaIndicator';
import PromoContext from './PromoContext';
import Title from './Title';

const Promo = ({
  children,
  to = '',
  ariaLabelledBy,
  mediaType = '',
  eventTrackingData,
  className = '',
}) => {
  const { service } = use(ServiceContext);

  const promoContextValue = useMemo(
    () => ({
      service,
      to,
      ariaLabelledBy,
      eventTrackingData,
      mediaType,
    }),
    [service, to, ariaLabelledBy, eventTrackingData, mediaType],
  );

  return (
    <PromoWrapper {...(className ? { className } : undefined)}>
      <PromoContext.Provider value={promoContextValue}>
        {children}
      </PromoContext.Provider>
    </PromoWrapper>
  );
};

Promo.ContentWrapper = ContentWrapper;
Promo.Title = Title;
Promo.MediaIndicator = MediaIndicator;
Promo.Link = Link;
Promo.Content = Content;

// Outside OptimoPromos
Promo.Timestamp = Timestamp;
Promo.LiveLabel = LiveLabel;
Promo.Image = Image;

export default Promo;
