import React, { useContext } from 'react';
import { node, string } from 'prop-types';
import { ServiceContext } from '#contexts/ServiceContext';
import Timestamp from '#components/Promo/timestamp';
import Content from '#app/containers/StoryPromo/LinkContents';
import LiveLabel from '#legacy/psammead-live-label/src';
import useViewTracker from '#hooks/useViewTracker';
import Heading from '../PromoAtoms/Heading';
import {
  ListItem,
  OrderedList,
  UnorderedList,
} from '../PromoAtoms/List.styles';
import Image from '../PromoAtoms/Image.styles';
import Link from '../PromoAtoms/Link';
import MediaIndicator from '../PromoAtoms/MediaIndicator';
import BoxWrapper from '../PromoAtoms/BoxWrapper.styles';

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
    <div ref={viewRef}>
      <PromoContext.Provider
        value={{ script, service, dir, to, id, eventTrackingData }}
      >
        {children}
      </PromoContext.Provider>
    </div>
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
Promo.Image = withPromoContext(Image);
Promo.MediaIndicator = withPromoContext(MediaIndicator);
Promo.Link = withPromoContext(Link);
Promo.ListItem = withPromoContext(ListItem);
Promo.OrderedList = withPromoContext(OrderedList);
Promo.UnorderedList = withPromoContext(UnorderedList);

// Curretly Outside NewStoryPromo as reusable
Promo.Timestamp = withPromoContext(Timestamp);
Promo.Content = withPromoContext(Content);
Promo.LiveLabel = withPromoContext(LiveLabel);

Promo.propTypes = {
  children: node.isRequired,
  to: string.isRequired,
  id: string.isRequired,
};

export default Promo;
