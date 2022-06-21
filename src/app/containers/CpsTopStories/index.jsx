import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { arrayOf, shape, number, oneOf, oneOfType, string } from 'prop-types';
import pathOr from 'ramda/src/pathOr';

import {
  StoryPromoLiBase,
  StoryPromoUl,
} from '#legacy/psammead-story-promo-list/src';

import {
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
} from '#legacy/gel-foundations/src/spacings';
import {
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MAX,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '#legacy/gel-foundations/src/breakpoints';
import { storyItem, linkPromo } from '#models/propTypes/storyItem';
import { ServiceContext } from '#contexts/ServiceContext';
import useViewTracker from '#hooks/useViewTracker';
import CpsOnwardJourney from '../CpsOnwardJourney';
import StoryPromo from '../StoryPromo';

const eventTrackingData = {
  block: {
    componentName: 'top-stories',
  },
};

const GridStoryPromoUl = styled(StoryPromoUl)`
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin-top: ${GEL_SPACING_TRPL};
    gap: ${GEL_SPACING_DBL};
  }
`;

const LayouStoryPromoLi = styled(StoryPromoLiBase)`
  padding: 0 0 ${GEL_SPACING_DBL};

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    padding: 0;
    background-color: white;
  }

  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    padding: 0 0 ${GEL_SPACING_DBL};
  }
  &:first-child {
    padding-top: 0;

    @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
      padding: 0;
    }
  }

  &:last-child {
    padding-bottom: 0;
    @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
      padding: 0;
    }
  }
`;

const PromoComponent = ({ promo, dir }) => {
  const { serviceDatetimeLocale } = useContext(ServiceContext);
  const viewRef = useViewTracker(eventTrackingData.block);

  return (
    <div ref={viewRef}>
      <StoryPromo
        item={promo}
        dir={dir}
        displayImage={false}
        displaySummary={false}
        serviceDatetimeLocale={serviceDatetimeLocale}
        eventTrackingData={eventTrackingData}
        sectionType="top-stories"
        promoType="onwardJourneys"
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
  const viewRef = useViewTracker(eventTrackingData.block);

  return (
    <GridStoryPromoUl>
      {promoItems.map(item => (
        <LayouStoryPromoLi
          key={item.id || item.uri}
          ref={viewRef}
          promoType="topStories"
        >
          <StoryPromo
            item={item}
            dir={dir}
            displayImage={false}
            displaySummary={false}
            serviceDatetimeLocale={serviceDatetimeLocale}
            eventTrackingData={eventTrackingData}
            sectionType="top-stories"
            promoType="topStories"
          />
        </LayouStoryPromoLi>
      ))}
    </GridStoryPromoUl>
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

const TopStories = ({ content, parentColumns, sectionLabelBackground }) => {
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
      sectionLabelBackground={sectionLabelBackground}
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
  sectionLabelBackground: string,
};

TopStories.defaultProps = {
  content: [],
  parentColumns: null,
  sectionLabelBackground: undefined,
};

export default TopStories;
