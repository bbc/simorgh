import React, { use } from 'react';
import pathOr from 'ramda/src/pathOr';
import {
  StoryPromoLi,
  StoryPromoUl,
} from '#psammead/psammead-story-promo-list/src';
import useViewTracker from '#hooks/useViewTracker';
import { OptimizelyContext } from '@optimizely/react-sdk';
import { ServiceContext } from '../../../contexts/ServiceContext';
import CpsOnwardJourney from '../CpsOnwardJourney';
import FrostedGlassPromo from '../../../components/FrostedGlassPromo/lazy';

const eventTrackingData = {
  block: {
    componentName: 'features',
  },
};

const PromoListComponent = ({
  promoItems,
  dir = 'ltr',
  sendOptimizelyEvents,
}) => {
  const { serviceDatetimeLocale } = use(ServiceContext);
  const { optimizely } = use(OptimizelyContext);

  const eventTrackingDataWithOptimizely = {
    block: {
      ...eventTrackingData.block,
      ...(sendOptimizelyEvents && {
        optimizely,
        optimizelyMetricNameOverride: 'features',
      }),
    },
  };

  const viewTracker = useViewTracker(eventTrackingDataWithOptimizely.block);

  return (
    <StoryPromoUl className="group-3:grid group-3:grid-cols-2 group-3:gap-x-double group-3:gap-y-triple">
      {promoItems.map((item, promoIndex) => {
        return (
          <StoryPromoLi
            key={item.id || item.uri}
            {...viewTracker}
            border={false}
            className="leading-none h-full first:pb-2 last:pt-2 not-first-not-last:py-2 group-3:p-0"
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
          </StoryPromoLi>
        );
      })}
    </StoryPromoUl>
  );
};

const PromoComponent = ({ promo, dir = 'ltr', sendOptimizelyEvents }) => {
  const { optimizely } = use(OptimizelyContext);
  const { serviceDatetimeLocale } = use(ServiceContext);

  const eventTrackingDataWithOptimizely = {
    block: {
      ...eventTrackingData.block,
      ...(sendOptimizelyEvents && {
        optimizely,
        optimizelyMetricNameOverride: 'features',
      }),
    },
  };

  const viewTracker = useViewTracker(eventTrackingDataWithOptimizely.block);

  return (
    <div {...viewTracker}>
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
  const { translations } = use(ServiceContext);

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
