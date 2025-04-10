import React, { useContext } from 'react';
import styled from '@emotion/styled';
import pathOr from 'ramda/src/pathOr';
import {
  StoryPromoLi,
  StoryPromoUl,
} from '#psammead/psammead-story-promo-list/src';
import useViewTracker from '#hooks/useViewTracker';
import {
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MAX,
} from '#psammead/gel-foundations/src/breakpoints';
import {
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
} from '#psammead/gel-foundations/src/spacings';
import { OptimizelyContext } from '@optimizely/react-sdk';
import { ServiceContext } from '../../../contexts/ServiceContext';
import CpsOnwardJourney from '../CpsOnwardJourney';
import FrostedGlassPromo from '../../../components/FrostedGlassPromo/lazy';

const eventTrackingData = {
  block: {
    componentName: 'features',
  },
};

const StoryPromoUlFeatures = styled(StoryPromoUl)`
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: ${GEL_SPACING_DBL};
    row-gap: ${GEL_SPACING_TRPL};
  }
`;

const StoryPromoLiFeatures = styled(StoryPromoLi)`
  line-height: 0;
  height: 100%;

  &:first-child {
    padding: 0 0 0.5rem 0;
  }

  &:last-child {
    padding: 0.5rem 0 0 0;
  }

  &:not(:first-child):not(:last-child) {
    padding: 0.5rem 0 0.5rem 0;
  }

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    padding: 0;

    &:first-child,
    &:last-child,
    &:not(:first-child):not(:last-child) {
      padding: 0;
    }
  }
`;

const PromoListComponent = ({
  promoItems,
  dir = 'ltr',
  sendOptimizelyEvents,
}) => {
  const { serviceDatetimeLocale } = useContext(ServiceContext);
  const { optimizely } = useContext(OptimizelyContext);

  const eventTrackingDataWithOptimizely = {
    block: {
      ...eventTrackingData.block,
      ...(sendOptimizelyEvents && {
        optimizely,
        optimizelyMetricNameOverride: 'features',
      }),
    },
  };

  const viewRef = useViewTracker(eventTrackingDataWithOptimizely.block);

  return (
    <StoryPromoUlFeatures>
      {promoItems.map((item, promoIndex) => {
        return (
          <StoryPromoLiFeatures
            key={item.id || item.uri}
            {...viewRef}
            border={false}
          >
            <FrostedGlassPromo
              item={item}
              index={promoIndex}
              dir={dir}
              displayImage
              displaySummary={false}
              serviceDatetimeLocale={serviceDatetimeLocale}
              eventTrackingData={eventTrackingDataWithOptimizely}
              sectionType="features-and-analysis"
            />
          </StoryPromoLiFeatures>
        );
      })}
    </StoryPromoUlFeatures>
  );
};

const PromoComponent = ({ promo, dir = 'ltr', sendOptimizelyEvents }) => {
  const { optimizely } = useContext(OptimizelyContext);
  const { serviceDatetimeLocale } = useContext(ServiceContext);

  const eventTrackingDataWithOptimizely = {
    block: {
      ...eventTrackingData.block,
      ...(sendOptimizelyEvents && {
        optimizely,
        optimizelyMetricNameOverride: 'features',
      }),
    },
  };

  const viewRef = useViewTracker(eventTrackingDataWithOptimizely.block);

  return (
    <div {...viewRef}>
      <FrostedGlassPromo
        item={promo}
        dir={dir}
        displayImage
        serviceDatetimeLocale={serviceDatetimeLocale}
        eventTrackingData={eventTrackingDataWithOptimizely}
        sectionType="features-and-analysis"
      />
    </div>
  );
};

const FeaturesAnalysis = ({
  content,
  parentColumns,
  sectionLabelBackground,
  sendOptimizelyEvents,
}) => {
  const { translations } = useContext(ServiceContext);

  const title = pathOr(
    'Features & Analysis',
    ['featuresAnalysisTitle'],
    translations,
  );

  return (
    <CpsOnwardJourney
      labelId="features-analysis-heading"
      title={title}
      content={content}
      parentColumns={parentColumns}
      promoComponent={PromoComponent}
      promoListComponent={PromoListComponent}
      columnType="secondary"
      sectionLabelBackground={sectionLabelBackground}
      sendOptimizelyEvents={sendOptimizelyEvents}
    />
  );
};

export default FeaturesAnalysis;
