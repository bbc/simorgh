import React, { useContext } from 'react';
import { node, string, shape } from 'prop-types';
import path from 'ramda/src/path';

import Timestamp from '#components/Promo/timestamp';
import LiveLabel from '#psammead/psammead-live-label/src';
import useViewTracker from '#hooks/useViewTracker';
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
  to,
  ariaLabelledBy,
  mediaType,
  eventTrackingData,
}) => {
  const { service } = useContext(ServiceContext);

  const eventTrackingDataSend = path(['block'], eventTrackingData);

  const viewRef = useViewTracker(eventTrackingDataSend);

  return (
    <PromoWrapper ref={viewRef}>
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

Promo.propTypes = {
  children: node.isRequired,
  to: string,
  ariaLabelledBy: string.isRequired,
  mediaType: string,
  eventTrackingData: shape({ block: shape({ componentName: string }) }),
};

Promo.defaultProps = { to: '', mediaType: '', eventTrackingData: null };

export default Promo;
