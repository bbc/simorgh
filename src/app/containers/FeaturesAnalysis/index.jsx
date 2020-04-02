import React, { useContext } from 'react';
import { arrayOf, shape, node } from 'prop-types';
import SectionLabel from '@bbc/psammead-section-label';
import styled from 'styled-components';
import { StoryPromoLi, StoryPromoUl } from '@bbc/psammead-story-promo-list';
import { GEL_GROUP_3_SCREEN_WIDTH_MIN } from '@bbc/gel-foundations/breakpoints';
import {
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
} from '@bbc/gel-foundations/spacings';

import featuresAnalysis from '#pages/StoryPage/featuresAnalysis.json';
import { storyItem } from '#models/propTypes/storyItem';
import { ServiceContext } from '#contexts/ServiceContext';
import { GridItemConstrainedLarge } from '#lib/styledGrid';
import StoryPromo from '../StoryPromo';

const Wrapper = styled(GridItemConstrainedLarge)`
  margin-bottom: ${GEL_SPACING_DBL};
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    margin-bottom: ${GEL_SPACING_TRPL};
  }
`;

const StyledSectionLabel = styled(SectionLabel)`
  margin-top: 0;
`;

const FeaturesAnalysis = ({ content }) => {
  const { script, service, dir } = useContext(ServiceContext);
  const a11yAttributes = {
    as: 'section',
    role: 'region',
    'aria-labelledby': 'features-analysis-heading',
  };
  const FeaturesAnalysisWrapper = ({ children }) => (
    <Wrapper {...a11yAttributes}>{children}</Wrapper>
  );
  FeaturesAnalysisWrapper.propTypes = {
    children: node.isRequired,
  };
  if (!featuresAnalysis.length) return null;

  return (
    <FeaturesAnalysisWrapper>
      <Wrapper>
        <StyledSectionLabel
          script={script}
          service={service}
          dir={dir}
          labelId="features-analysis-heading"
        >
          Features &amp; Analysis
        </StyledSectionLabel>

        <StoryPromoUl>
          {content.map((item) => (
            <StoryPromoLi key={item.id || item.uri}>
              <StoryPromo item={item} displayImage />
            </StoryPromoLi>
          ))}
        </StoryPromoUl>
      </Wrapper>
    </FeaturesAnalysisWrapper>
  );
};

FeaturesAnalysis.propTypes = {
  content: arrayOf(shape(storyItem)),
};

FeaturesAnalysis.defaultProps = {
  content: featuresAnalysis, // @TODO: rm this
};

export default FeaturesAnalysis;
