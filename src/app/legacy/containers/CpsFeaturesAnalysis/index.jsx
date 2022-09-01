import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { arrayOf, shape, number, oneOf, oneOfType, string } from 'prop-types';
import pathOr from 'ramda/src/pathOr';
import {
  StoryPromoLi,
  StoryPromoUl,
} from '#psammead/psammead-story-promo-list/src';
import { storyItem, linkPromo } from '#models/propTypes/storyItem';
import useViewTracker from '#hooks/useViewTracker';
import {
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MAX,
} from '#psammead/gel-foundations/src/breakpoints';
import {
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
} from '#psammead/gel-foundations/src/spacings';
import { ServiceContext } from '../../../contexts/ServiceContext';
import CpsOnwardJourney from '../CpsOnwardJourney';
import FrostedGlassPromo from '../../components/FrostedGlassPromo/lazy';

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

  &:not(:first-child):not(:last-child) {
    padding: 0.5rem 0 0.5rem 0;
  }

  &:last-child {
    padding: 0.5rem 0 0 0;
  }

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

  const viewRef = useViewTracker(eventTrackingData.block);

  return (
    <StoryPromoUlFeatures>
      {promoItems.map((item, promoIndex) => {
        return (
          <StoryPromoLiFeatures
            key={item.id || item.uri}
            ref={viewRef}
            border={false}
          >
            <FrostedGlassPromo
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
    </StoryPromoUlFeatures>
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

  return (
    <div ref={viewRef}>
      <FrostedGlassPromo
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
