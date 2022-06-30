import React, { useContext } from 'react';
import { node } from 'prop-types';
import { ServiceContext } from '#contexts/ServiceContext';
import Timestamp from '#components/Promo/timestamp';
import SectionLabel from '#legacy/psammead-section-label/src';
import Content from '#app/containers/StoryPromo/LinkContents';
import LiveLabel from '#legacy/psammead-live-label/src';
import Heading from '../PromoAtoms/Heading';
import {
  ListItem,
  OrderedList,
  UnorderedList,
} from '../PromoAtoms/List.styles';
import Image from '../PromoAtoms/Image.styles';
import Link from '../PromoAtoms/Link.styles';
import MediaIndicator from '../PromoAtoms/MediaIndicator';
import BoxWrapper from '../PromoAtoms/BoxWrapper.styles';

const PromoContext = React.createContext({});

const Promo = ({ children }) => {
  const { script, service, dir } = useContext(ServiceContext);
  return (
    <PromoContext.Provider value={{ script, service, dir }}>
      {children}
    </PromoContext.Provider>
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
Promo.SectionLabel = withPromoContext(SectionLabel);
Promo.Content = withPromoContext(Content);
Promo.LiveLabel = withPromoContext(LiveLabel);

Promo.propTypes = {
  children: node.isRequired,
};

export default Promo;
