import React, { useContext } from 'react';
import { arrayOf, shape, number } from 'prop-types';
import { pathOr } from 'ramda';

import { StoryPromoLi, StoryPromoUl } from '@bbc/psammead-story-promo-list';
import { storyItem } from '#models/propTypes/storyItem';
import { ServiceContext } from '#contexts/ServiceContext';
import useViewTracker from '#hooks/useViewTracker';
import CpsOnwardJourney from '../CpsOnwardJourney';
import StoryPromo from '../StoryPromo';
import EventTrackingContext from './EventTrackingContext';

const PromoComponent = ({ promo, dir }) => {
  const { serviceDatetimeLocale } = useContext(ServiceContext);

  return (
    <StoryPromo
      item={promo}
      dir={dir}
      displayImage={false}
      displaySummary={false}
      serviceDatetimeLocale={serviceDatetimeLocale}
    />
  );
};

const PromoListComponent = ({ promoItems, dir }) => {
  const { serviceDatetimeLocale } = useContext(ServiceContext);
  const trackingData = useContext(EventTrackingContext);
  const viewRef = useViewTracker(trackingData);

  return (
    <StoryPromoUl>
      {promoItems.map((item, index) => (
        <StoryPromoLi
          key={item.id || item.uri}
          ref={index === 0 ? viewRef : null}
        >
          <StoryPromo
            item={item}
            dir={dir}
            displayImage={false}
            displaySummary={false}
            serviceDatetimeLocale={serviceDatetimeLocale}
            trackingData={trackingData}
          />
        </StoryPromoLi>
      ))}
    </StoryPromoUl>
  );
};

const TopStories = ({ content, parentColumns }) => {
  const { translations } = useContext(ServiceContext);
  const title = pathOr('Top Stories', ['topStoriesTitle'], translations);

  return (
    <div>
      <CpsOnwardJourney
        labelId="top-stories-heading"
        title={title}
        content={content}
        parentColumns={parentColumns}
        promoComponent={PromoComponent}
        promoListComponent={PromoListComponent}
        columnType="secondary"
      />
    </div>
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
