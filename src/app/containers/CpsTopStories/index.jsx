import React, { useContext } from 'react';
import { arrayOf, shape, number } from 'prop-types';
import { pathOr } from 'ramda';

import { StoryPromoLi, StoryPromoUl } from '@bbc/psammead-story-promo-list';
import { storyItem } from '#models/propTypes/storyItem';
import { ServiceContext } from '#contexts/ServiceContext';
import useViewTracker from '#hooks/useViewTracker';
import CpsOnwardJourney from '../CpsOnwardJourney';
import StoryPromo from '../StoryPromo';

const EVENT_TRACKING_DATA = {
  campaignName: 'article-sty', // TODO make this dynamic
  componentName: 'top-stories',
};

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
