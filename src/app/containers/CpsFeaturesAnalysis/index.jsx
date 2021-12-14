import React, { useContext, useState } from 'react';
import { arrayOf, shape, number, oneOf, oneOfType, string } from 'prop-types';
import pathOr from 'ramda/src/pathOr';
import { StoryPromoLi, StoryPromoUl } from '@bbc/psammead-story-promo-list';
import { GEL_GROUP_3_SCREEN_WIDTH_MAX } from '@bbc/gel-foundations/dist/breakpoints';

import isLive from '#lib/utilities/isLive';
import { storyItem, linkPromo } from '#models/propTypes/storyItem';
import { ServiceContext } from '#contexts/ServiceContext';
import { RequestContext } from '#contexts/RequestContext';
import CpsOnwardJourney from '../CpsOnwardJourney';
import StoryPromo from '../StoryPromo';
import FrostedGlassPromo from '../../components/FrostedGlassPromo/lazy';
import useViewTracker from '#hooks/useViewTracker';
import useOptimizelyVariation from '#hooks/useOptimizelyVariation';
import useMediaQuery from '#hooks/useMediaQuery';

const eventTrackingData = {
  block: {
    componentName: 'features',
  },
};

const HIGH_IMPACT_VARIATION = 'variation_1';

const PromoListComponent = ({ promoItems, dir }) => {
  const { serviceDatetimeLocale, service } = useContext(ServiceContext);
  const viewRef = useViewTracker(eventTrackingData.block);
  const { isAmp } = useContext(RequestContext);

  const [mobile, setMobile] = useState(false);

  useMediaQuery(`(max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX})`, event =>
    setMobile(event.matches),
  );

  const promoVariation = useOptimizelyVariation(
    'high_impact_feature_analysis_promo',
    { service, mobile },
  );

  const isHighImpactVariation =
    promoVariation === HIGH_IMPACT_VARIATION && !isLive() && !isAmp;

  return (
    <StoryPromoUl>
      {promoItems.map((item, promoIndex) => {
        const isFirstPromo = promoIndex === 0;
        const StoryPromoComponent =
          isFirstPromo && isHighImpactVariation
            ? FrostedGlassPromo
            : StoryPromo;

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
  const { serviceDatetimeLocale, service } = useContext(ServiceContext);
  const viewRef = useViewTracker(eventTrackingData);
  const { isAmp } = useContext(RequestContext);

  const [mobile, setMobile] = useState(false);

  useMediaQuery(`(max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX})`, event =>
    setMobile(event.matches),
  );

  const promoVariation = useOptimizelyVariation(
    'high_impact_feature_analysis_promo',
    { service, mobile },
  );

  const StoryPromoComponent =
    promoVariation === HIGH_IMPACT_VARIATION && !isLive() && !isAmp
      ? FrostedGlassPromo
      : StoryPromo;

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
