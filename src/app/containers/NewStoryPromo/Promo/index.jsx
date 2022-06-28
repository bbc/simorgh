import React from 'react';
import { node } from 'prop-types';
import Timestamp from '#components/Promo/timestamp';
import SectionLabel from '#legacy/psammead-section-label/src';
import Content from '#app/containers/StoryPromo/LinkContents';
import H3 from '../PromoAtoms/Headings.styles';
import {
  ListItem,
  OrderedList,
  UnorderedList,
} from '../PromoAtoms/List.styles';
import Image from '../PromoAtoms/Image.styles';
import Link from '../PromoAtoms/Link';
import MediaIndicator from '../PromoAtoms/MediaIndicator';
import BoxWrapper from '../PromoAtoms/BoxWrapper.styles';

const Promo = ({ children, Wrapper }) => {
  return <Wrapper role="region">{children}</Wrapper>;
};

Promo.BoxWrapper = BoxWrapper;
Promo.Heading = H3;
Promo.Image = Image;
Promo.MediaIndicator = MediaIndicator;
Promo.Link = Link;
Promo.ListItem = ListItem;
Promo.OrderedList = OrderedList;
Promo.UnorderedList = UnorderedList;

// Curretly Outside NewStoryPromo as reusable
Promo.Timestamp = Timestamp;
Promo.SectionLabel = SectionLabel;
Promo.Content = Content;

Promo.propTypes = { children: node.isRequired, Wrapper: node.isRequired };

export default Promo;
