import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { arrayOf, shape, number, oneOf, oneOfType, string } from 'prop-types';
import pathOr from 'ramda/src/pathOr';
import { StoryPromoLi, StoryPromoUl } from '@bbc/psammead-story-promo-list';
// import { OptimizelyContext } from '@optimizely/react-sdk';
import { storyItem, linkPromo } from '#models/propTypes/storyItem';
import { ServiceContext } from '#contexts/ServiceContext';
import useViewTracker from '#hooks/useViewTracker';
// import useOptimizelyVariation from '#hooks/useOptimizelyVariation';
import isLive from '#lib/utilities/isLive';
import {
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MAX,
} from '@bbc/gel-foundations/breakpoints';
import {
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
} from '@bbc/gel-foundations/spacings';
import CpsOnwardJourney from '../CpsOnwardJourney';
import StoryPromo from '../StoryPromo';
import FrostedGlassPromo from '../../components/FrostedGlassPromo/lazy';

const eventTrackingData = {
  block: {
    componentName: 'features',
  },
};

// const IMPROVED_PROMO_EXPERIMENT_ID = 'improved_promos';
const IMPROVED_PROMO_VARIATIONS = {
  variation_1: props => (
    <FrostedGlassPromo {...props} minimumContrast={10} paletteSize={10} />
  ),
  variation_2: props => (
    <FrostedGlassPromo {...props} minimumContrast={10} paletteSize={10} />
  ),
  variation_3: props => (
    <FrostedGlassPromo {...props} minimumContrast={7} paletteSize={20} />
  ),
  variation_4: props => (
    <FrostedGlassPromo {...props} minimumContrast={7} paletteSize={20} />
  ),
  Control: StoryPromo,
};

const StyledPromoUl = styled(StoryPromoUl)`
  // Apply 2 column grid layout on tablet widths
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

  &:not(:first-child):not(:last-child) {
    padding: 0.5rem 0 0.5rem 0;
  }

  &:last-child {
    padding: 0.5rem 0 0 0;
  }

  // Remove padding overrides on tablet widths
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    padding: 0;

    &:first-child,
    &:not(:first-child):not(:last-child),
    &:last-child {
      padding: 0;
    }
  }
`;

const PromoListComponent = ({ promoItems, dir }) => {
  const { serviceDatetimeLocale } = useContext(ServiceContext);
  // const { optimizely } = useContext(OptimizelyContext);
  const promoVariation = isLive() ? 'Control' : 'variation_2';

  // const promoVariation = useOptimizelyVariation(IMPROVED_PROMO_EXPERIMENT_ID);
  // const hasVariationKey = promoVariation !== null;
  // const eventTrackingData = getEventTrackingData(hasVariationKey && optimizely);

  const viewRef = useViewTracker(eventTrackingData.block);

  const selectComponent = index => {
    switch (true) {
      case promoVariation === 'variation_1' && index === 0:
        return IMPROVED_PROMO_VARIATIONS.variation_1;
      case promoVariation === 'variation_2':
        return IMPROVED_PROMO_VARIATIONS.variation_2;
      case promoVariation === 'variation_3' && index === 0:
        return IMPROVED_PROMO_VARIATIONS.variation_3;
      case promoVariation === 'variation_4':
        return IMPROVED_PROMO_VARIATIONS.variation_4;
      case promoVariation === 'Control':
        return IMPROVED_PROMO_VARIATIONS.Control;
      default:
        return IMPROVED_PROMO_VARIATIONS.Control;
    }
  };

  return (
    <StyledPromoUl>
      {promoItems.map((item, promoIndex) => {
        const StoryPromoComponent = selectComponent(promoIndex);

        return (
          <StoryPromoLiFeatures
            key={item.id || item.uri}
            ref={viewRef}
            border={false}
          >
            <StoryPromoComponent
              item={item}
              index={promoIndex}
              dir={dir}
              displayImage
              displaySummary={false}
              serviceDatetimeLocale={serviceDatetimeLocale}
              eventTrackingData={eventTrackingData}
              sectionType="features-and-analysis"
            />
          </StoryPromoLiFeatures>
        );
      })}
    </StyledPromoUl>
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
  // const { optimizely } = useContext(OptimizelyContext);
  const promoVariation = isLive() ? 'Control' : 'variation_2';

  // const promoVariation = useOptimizelyVariation(IMPROVED_PROMO_EXPERIMENT_ID);
  // const hasVariationKey = promoVariation !== null;
  // const eventTrackingData = getEventTrackingData(hasVariationKey && optimizely);

  const viewRef = useViewTracker(eventTrackingData);

  const selectComponent = () => {
    switch (true) {
      case [
        'variation_1',
        'variation_2',
        'variation_3',
        'variation_4',
      ].includes(promoVariation):
        return IMPROVED_PROMO_VARIATIONS[promoVariation];
      case promoVariation === 'Control':
        return IMPROVED_PROMO_VARIATIONS.Control;
      default:
        return IMPROVED_PROMO_VARIATIONS.Control;
    }
  };

  const StoryPromoComponent = selectComponent();

  return (
    <div ref={viewRef}>
      <StoryPromoComponent
        item={promo}
        dir={dir}
        displayImage
        serviceDatetimeLocale={serviceDatetimeLocale}
        eventTrackingData={eventTrackingData}
        sectionType="features-and-analysis"
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
