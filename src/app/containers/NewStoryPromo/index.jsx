// This is the controller; What promo should I use?
// Should the controller also take care of List or singleItem?
import React from 'react';
import { string, bool } from 'prop-types';
import TopPromo from './PromoTypes/TopPromo';
import RegularPromo from './PromoTypes/RegularPromo';
import LeadingPromo from './PromoTypes/LeadingPromo';
import TopStoriesPromo from './PromoTypes/TopStoriesPromo';
import RelatedContentPromo from './PromoTypes/RelatedContentPromo';

const promo = {
  top: TopPromo,
  regular: RegularPromo,
  leading: LeadingPromo,
  topStories: TopStoriesPromo,
  relatedContent: RelatedContentPromo,
};

// More props to come ofc :D
const StoryPromo = ({ promoType, hasImage, hasMediaIndicator }) => {
  const PromoToUse = promo[promoType];
  return (
    <PromoToUse hasImage={hasImage} hasMediaIndicator={hasMediaIndicator} />
  );
};

StoryPromo.propTypes = {
  promoType: string.isRequired,
  hasImage: bool,
  hasMediaIndicator: bool,
};

StoryPromo.defaultProps = {
  hasImage: false,
  hasMediaIndicator: false,
};

export default StoryPromo;
