import React, { useContext } from 'react';
import { node, string } from 'prop-types';
import { ServiceContext } from '#contexts/ServiceContext';

import Timestamp from '#components/Promo/timestamp';
import Content from '#app/containers/StoryPromo/LinkContents';
import LiveLabel from '#legacy/psammead-live-label/src';
import ImageWithPlaceholder from '#containers/ImageWithPlaceholder';
import useViewTracker from '#hooks/useViewTracker';

import Heading from '../PromoAtoms/Heading';
import Link from '../PromoAtoms/Link';
import MediaIndicator from '../PromoAtoms/MediaIndicator';
import { ViewWrapper, BoxWrapper } from '../PromoAtoms/Wrappers.styles';

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
    <ViewWrapper ref={viewRef}>
      <PromoContext.Provider
        value={{ script, service, dir, to, id, eventTrackingData }}
      >
        {children}
      </PromoContext.Provider>
    </ViewWrapper>
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

// Outside NewStoryPromo
Promo.Timestamp = withPromoContext(Timestamp);
Promo.Content = withPromoContext(Content);
Promo.LiveLabel = withPromoContext(LiveLabel);
Promo.Image = withPromoContext(ImageWithPlaceholder);

Promo.propTypes = {
  children: node.isRequired,
  to: string.isRequired,
  id: string.isRequired,
};

export default Promo;
