import React, { useContext } from 'react';
import { node, string } from 'prop-types';
import { ServiceContext } from '#contexts/ServiceContext';

import Timestamp from '#components/Promo/timestamp';
import LiveLabel from '#legacy/psammead-live-label/src';
import useViewTracker from '#hooks/useViewTracker';
import ImageWithPlaceholder from '#app/containers/ImageWithPlaceholder';

import Heading from '../PromoAtoms/Heading';
import Link from '../PromoAtoms/Link';
import ClickableArea from '../PromoAtoms/ClickableArea';
import MediaIndicator from '../PromoAtoms/MediaIndicator';
import Content from '../PromoAtoms/Content';
import { PromoWrapper, BoxWrapper } from '../PromoAtoms/Wrappers.styles';

const PromoContext = React.createContext({});

const eventTrackingData = {
  block: {
    componentName: 'top-stories',
  },
};

const Promo = ({ children, to, id }) => {
  const { script, service, dir } = useContext(ServiceContext);
  const viewRef = useViewTracker(eventTrackingData.block);

  return (
    <PromoWrapper ref={viewRef}>
      <PromoContext.Provider
        value={{ script, service, dir, to, id, eventTrackingData }}
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

Promo.BoxWrapper = withPromoContext(BoxWrapper);
Promo.Heading = withPromoContext(Heading);
Promo.MediaIndicator = withPromoContext(MediaIndicator);
Promo.Link = withPromoContext(Link);
Promo.ClickableArea = withPromoContext(ClickableArea);

// Outside NewStoryPromo
Promo.Timestamp = withPromoContext(Timestamp);
Promo.Content = withPromoContext(Content);
Promo.LiveLabel = withPromoContext(LiveLabel);
Promo.ImagePlaceholder = withPromoContext(ImageWithPlaceholder);

Promo.propTypes = {
  children: node.isRequired,
  to: string,
  id: string.isRequired,
};

Promo.defaultProps = { to: '' };

export default Promo;
