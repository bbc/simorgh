import styled from '@emotion/styled';
import React, { useContext } from 'react';
import { arrayOf, shape, number, oneOf, oneOfType, string } from 'prop-types';
import pathOr from 'ramda/src/pathOr';

import {
  StoryPromoLi,
  StoryPromoUl,
} from '#psammead/psammead-story-promo-list/src';

import {
  GEL_SPACING,
  GEL_SPACING_DBL,
} from '#psammead/gel-foundations/src/spacings';
import {
  GEL_GROUP_3_SCREEN_WIDTH_MAX,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '#psammead/gel-foundations/src/breakpoints';

import { storyItem, linkPromo } from '#models/propTypes/storyItem';
import useViewTracker from '#hooks/useViewTracker';
import { ServiceContext } from '../../../contexts/ServiceContext';
import CpsOnwardJourney from '../CpsOnwardJourney';
import StoryPromo from '../StoryPromo';

const eventTrackingData = {
  block: {
    componentName: 'top-stories',
  },
};

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

  // // StoryPromo
  // const TestStoryPromoLi = styled(StoryPromoLi)`
  //   border-bottom: 0.0625rem solid #f2f2f2;
  //   padding-bottom: ${GEL_SPACING_DBL};

  //   &:last-child {
  //     border: none;
  //     padding-bottom: 0;
  //   }

  //   h3 {
  //     @media (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
  //       padding-top: 0;
  //     }

  //     @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
  //       padding-top: ${GEL_SPACING};
  //     }
  //   }

  //   &:first-child {
  //     h3 {
  //       padding-top: 0;
  //     }
  //   }
  // `;

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
            eventTrackingData={eventTrackingData}
            sectionType="top-stories"
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
