import React, { useContext } from 'react';
import { node, string } from 'prop-types';
import { ServiceContext } from '#contexts/ServiceContext';

import Timestamp from '#components/Promo/timestamp';
import LiveLabel from '#legacy/psammead-live-label/src';
import useViewTracker from '#hooks/useViewTracker';
import ImageWithPlaceholder from '#app/containers/ImageWithPlaceholder';

import Heading from '#components/OptimoPromos/Heading';
import Link from '#components/OptimoPromos/Link';
import MediaIndicator from '#components/OptimoPromos/MediaIndicator';
import Content from '#components/OptimoPromos/Content';
import {
  PromoWrapper,
  ContentWrapper,
} from '#components/OptimoPromos/Wrappers.styles';

const PromoContext = React.createContext({});

const eventTrackingData = {
  block: {
    componentName: 'top-stories',
  },
};

const Promo = ({ children, to, id, mediaType }) => {
  const { script, service, dir } = useContext(ServiceContext);
  const viewRef = useViewTracker(eventTrackingData.block);

  return (
    <PromoWrapper ref={viewRef}>
      <PromoContext.Provider
        value={{ script, service, dir, to, id, eventTrackingData, mediaType }}
      >
        {children}
      </PromoContext.Provider>
    </PromoWrapper>
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
Promo.ImagePlaceholder = withPromoContext(ImageWithPlaceholder);

Promo.propTypes = {
  children: node.isRequired,
  to: string,
  id: string.isRequired,
  mediaType: string,
};

Promo.defaultProps = { to: '', mediaType: '' };

export default Promo;
