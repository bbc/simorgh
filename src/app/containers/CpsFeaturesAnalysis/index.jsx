import React, { useContext } from 'react';
import { arrayOf, shape, number, oneOf, oneOfType, string } from 'prop-types';
import pathOr from 'ramda/src/pathOr';
import { StoryPromoLi, StoryPromoUl } from '@bbc/psammead-story-promo-list';

import isLive from '#lib/utilities/isLive';
import { storyItem, linkPromo } from '#models/propTypes/storyItem';
import { ServiceContext } from '#contexts/ServiceContext';
import { RequestContext } from '#contexts/RequestContext';
import useViewTracker from '#hooks/useViewTracker';
import useToggle from '#hooks/useToggle';
import useOptimizelyVariation from '#hooks/useOptimizelyVariation';
import CpsOnwardJourney from '../CpsOnwardJourney';
import StoryPromo from '../StoryPromo';
import FrostedGlassPromo from '../../components/FrostedGlassPromo/lazy';

const eventTrackingData = {
  block: {
    componentName: 'features',
  },
};

const HIGH_IMPACT_EXPERIMENT_ID = 'high_impact_feature_analysis_promo';
const HIGH_IMPACT_VARIATION = 'variation_1';

const PromoListComponent = ({ promoItems, dir }) => {
  const { serviceDatetimeLocale } = useContext(ServiceContext);
  const viewRef = useViewTracker(eventTrackingData.block);
  const { isAmp } = useContext(RequestContext);

  const promoVariation = useOptimizelyVariation(HIGH_IMPACT_EXPERIMENT_ID);

  const { enabled: frostedPromoEnabled, value: frostedPromoCount } =
    useToggle('frostedPromo');

  const selectComponent = index => {
    if (isAmp) return StoryPromo;
    if (isLive()) {
      if (!frostedPromoEnabled) return StoryPromo;
      return index + 1 <= frostedPromoCount ? FrostedGlassPromo : StoryPromo;
    }
    if (index === 0 && promoVariation === HIGH_IMPACT_VARIATION) {
      return FrostedGlassPromo;
    }
    return StoryPromo;
  };

  return (
    <StoryPromoUl>
      {promoItems.map((item, promoIndex) => {
        const StoryPromoComponent = selectComponent(promoIndex);

        return (
          <StoryPromoLi key={item.id || item.uri} ref={viewRef}>
            <StoryPromoComponent
              item={item}
              index={promoIndex}
              dir={dir}
              displayImage
              displaySummary={false}
              serviceDatetimeLocale={serviceDatetimeLocale}
              eventTrackingData={eventTrackingData}
            />
          </StoryPromoLi>
        );
      })}
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

const PromoComponent = ({ promo, dir }) => {
  const { serviceDatetimeLocale } = useContext(ServiceContext);
  const viewRef = useViewTracker(eventTrackingData);
  const { isAmp } = useContext(RequestContext);
  const { enabled: frostedPromoEnabled, value: frostedPromoCount } =
    useToggle('frostedPromo');

  const promoVariation = useOptimizelyVariation(HIGH_IMPACT_EXPERIMENT_ID);

  const selectComponent = () => {
    if (isAmp) return StoryPromo;
    if (isLive()) {
      if (!frostedPromoEnabled) return StoryPromo;
      return frostedPromoCount > 0 ? FrostedGlassPromo : StoryPromo;
    }
    if (promoVariation === HIGH_IMPACT_VARIATION) return FrostedGlassPromo;
    return StoryPromo;
  };

  const StoryPromoComponent = selectComponent();

  return (
    <div ref={viewRef}>
      <StoryPromoComponent
        item={promo}
        dir={dir}
        displayImage
        serviceDatetimeLocale={serviceDatetimeLocale}
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

const FeaturesAnalysis = ({
  content,
  parentColumns,
  sectionLabelBackground,
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
    />
  );
};

FeaturesAnalysis.propTypes = {
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

FeaturesAnalysis.defaultProps = {
  content: [],
  parentColumns: null,
  sectionLabelBackground: undefined,
};

export default FeaturesAnalysis;
