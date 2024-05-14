import React, { useContext } from 'react';

import Timestamp from '#components/Promo/timestamp';
import LiveLabel from '#app/components/LiveLabel';
import { ServiceContext } from '../../../contexts/ServiceContext';

import Title from './Title';
import Link from './Link';
import MediaIndicator from './MediaIndicator';
import Content from './Content';
import { PromoWrapper, ContentWrapper } from './index.styles';
import Image from './Image';
import PromoContext from './PromoContext';

const Promo = ({
  children,
  to = '',
  ariaLabelledBy,
  mediaType = '',
  eventTrackingData,
  className = '',
}) => {
  const { service } = useContext(ServiceContext);

  return (
    <PromoWrapper {...(className && { className })}>
      <PromoContext.Provider
        value={{ service, to, ariaLabelledBy, eventTrackingData, mediaType }}
      >
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
