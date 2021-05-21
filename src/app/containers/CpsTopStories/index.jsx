import React, { useContext } from 'react';
import { arrayOf, shape, number, oneOf, oneOfType } from 'prop-types';
import { pathOr } from 'ramda';

import { StoryPromoLi, StoryPromoUl } from '@bbc/psammead-story-promo-list';
import { storyItem, linkPromo } from '#models/propTypes/storyItem';
import { ServiceContext } from '#contexts/ServiceContext';
import useViewTracker from '#hooks/useViewTracker';
import CpsOnwardJourney from '../CpsOnwardJourney';
import StoryPromo from '../StoryPromo';

const EVENT_TRACKING_DATA = {
  componentName: 'top-stories',
};

const PromoComponent = ({ promo, dir }) => {
  const { serviceDatetimeLocale } = useContext(ServiceContext);
  const viewRef = useViewTracker(EVENT_TRACKING_DATA);

  return (
    <div ref={viewRef}>
      <StoryPromo
        item={promo}
        dir={dir}
        displayImage={false}
        displaySummary={false}
        serviceDatetimeLocale={serviceDatetimeLocale}
        eventTrackingData={EVENT_TRACKING_DATA}
      />
    </div>
  );
};

PromoComponent.propTypes = {
  promo: oneOfType([shape(storyItem), shape(linkPromo)]).isRequired,
  dir: oneOf(['ltr', 'rtl']),
};

PromoComponent.defaultProps = {
  dir: 'ltr',
};

const PromoListComponent = ({ promoItems, dir }) => {
  const { serviceDatetimeLocale } = useContext(ServiceContext);
  const viewRef = useViewTracker(EVENT_TRACKING_DATA);

  return (
    <StoryPromoUl>
      {promoItems.map(item => (
        <StoryPromoLi key={item.id || item.uri} ref={viewRef}>
          <StoryPromo
            item={item}
            dir={dir}
            displayImage={false}
            displaySummary={false}
            serviceDatetimeLocale={serviceDatetimeLocale}
            eventTrackingData={EVENT_TRACKING_DATA}
          />
        </StoryPromoLi>
      ))}
    </StoryPromoUl>
  );
};

PromoListComponent.propTypes = {
  promoItems: arrayOf(oneOfType([shape(storyItem), shape(linkPromo)]))
    .isRequired,
  dir: oneOf(['ltr', 'rtl']),
};

PromoListComponent.defaultProps = {
  dir: 'ltr',
};

const TopStories = ({ content, parentColumns }) => {
  const { translations } = useContext(ServiceContext);
  const title = pathOr('Top Stories', ['topStoriesTitle'], translations);

  return (
    <CpsOnwardJourney
      labelId="top-stories-heading"
      title={title}
      content={content}
      parentColumns={parentColumns}
      promoComponent={PromoComponent}
      promoListComponent={PromoListComponent}
      columnType="secondary"
    />
  );
};

TopStories.propTypes = {
  content: arrayOf(shape(storyItem)),
  parentColumns: shape({
    group0: number,
    group1: number,
    group2: number,
    group3: number,
    group4: number,
    group5: number,
  }),
};

TopStories.defaultProps = {
  content: [],
  parentColumns: null,
};

export default TopStories;
