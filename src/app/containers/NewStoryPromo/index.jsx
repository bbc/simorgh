import React, { useContext } from 'react';
import { node, string, shape } from 'prop-types';
import { ServiceContext } from '#contexts/ServiceContext';

import Timestamp from '#components/Promo/timestamp';
import LiveLabel from '#legacy/psammead-live-label/src';
import useViewTracker from '#hooks/useViewTracker';

import Heading from '#components/OptimoPromos/Heading';
import Link from '#components/OptimoPromos/Link';
import MediaIndicator from '#components/OptimoPromos/MediaIndicator';
import Content from '#components/OptimoPromos/Content';
import {
  PromoWrapper,
  ContentWrapper,
  BorderWrapper,
} from '#components/OptimoPromos/Wrappers.styles';
import Image from '#components/OptimoPromos/Image';

const PromoContext = React.createContext({});

const Promo = ({ children, to, id, mediaType, eventTrackingData }) => {
  const { script, service } = useContext(ServiceContext);

  const viewRef = useViewTracker(eventTrackingData.block);

  return (
    <BorderWrapper>
      <PromoWrapper ref={viewRef}>
        <PromoContext.Provider
          value={{ script, service, to, id, eventTrackingData, mediaType }}
        >
          {children}
        </PromoContext.Provider>
      </PromoWrapper>
    </BorderWrapper>
  );
};

const withPromoContext = Component => props =>
  (
    <PromoContext.Consumer>
      {context => <Component {...context} {...props} />}
    </PromoContext.Consumer>
  );

Promo.ContentWrapper = withPromoContext(ContentWrapper);
Promo.Heading = withPromoContext(Heading);
Promo.MediaIndicator = withPromoContext(MediaIndicator);
Promo.Link = withPromoContext(Link);

// Outside NewStoryPromo
Promo.Timestamp = withPromoContext(Timestamp);
Promo.Content = withPromoContext(Content);
Promo.LiveLabel = withPromoContext(LiveLabel);
Promo.Image = withPromoContext(Image);

Promo.propTypes = {
  children: node.isRequired,
  to: string,
  id: string.isRequired,
  mediaType: string,
  eventTrackingData: shape({ block: { componentName: string } }),
};

Promo.defaultProps = { to: '', mediaType: '', eventTrackingData: null };

export default Promo;
