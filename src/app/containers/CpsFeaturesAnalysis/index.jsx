import React, { useContext, useState } from 'react';
import { arrayOf, shape, number, oneOf, oneOfType, string } from 'prop-types';
import pathOr from 'ramda/src/pathOr';
import { StoryPromoLi, StoryPromoUl } from '@bbc/psammead-story-promo-list';
import { GEL_GROUP_3_SCREEN_WIDTH_MAX } from '@bbc/gel-foundations/dist/breakpoints';

import { OptimizelyContext } from '@optimizely/react-sdk';
import isLive from '#lib/utilities/isLive';
import { storyItem, linkPromo } from '#models/propTypes/storyItem';
import { ServiceContext } from '#contexts/ServiceContext';
import { RequestContext } from '#contexts/RequestContext';
import useViewTracker from '#hooks/useViewTracker';
import useToggle from '#hooks/useToggle';
import useOptimizelyVariation from '#hooks/useOptimizelyVariation';
import useMediaQuery from '#hooks/useMediaQuery';
import CpsOnwardJourney from '../CpsOnwardJourney';
import StoryPromo from '../StoryPromo';
import FrostedGlassPromo from '../../components/FrostedGlassPromo/lazy';

const getEventTrackingData = optimizely => ({
  block: {
    componentName: 'features',
    optimizely,
  },
});

const HIGH_IMPACT_EXPERIMENT_ID = 'high_impact_feature_analysis_promo';
const HIGH_IMPACT_VARIATION = 'variation_1';

const PromoListComponent = ({ promoItems, dir }) => {
  const { serviceDatetimeLocale, service } = useContext(ServiceContext);
  const { optimizely } = useContext(OptimizelyContext);
  const viewRef = useViewTracker(getEventTrackingData(optimizely).block);
  const { isAmp } = useContext(RequestContext);

  const [mobile, setMobile] = useState(false);

  useMediaQuery(`(max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX})`, event =>
    setMobile(event.matches),
  );

  const promoVariation = useOptimizelyVariation(HIGH_IMPACT_EXPERIMENT_ID, {
    service,
    mobile,
  });

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
              eventTrackingData={getEventTrackingData(optimizely)}
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
  const { serviceDatetimeLocale, service } = useContext(ServiceContext);
  const { optimizely } = useContext(OptimizelyContext);
  const viewRef = useViewTracker(getEventTrackingData(optimizely));
  const { isAmp } = useContext(RequestContext);

  const [mobile, setMobile] = useState(false);

  useMediaQuery(`(max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX})`, event =>
    setMobile(event.matches),
  );

  const { enabled: frostedPromoEnabled, value: frostedPromoCount } =
    useToggle('frostedPromo');

  const promoVariation = useOptimizelyVariation(HIGH_IMPACT_EXPERIMENT_ID, {
    service,
    mobile,
  });

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
