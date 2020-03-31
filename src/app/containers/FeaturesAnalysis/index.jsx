import React, { useContext } from 'react';
import { arrayOf, shape, node } from 'prop-types';
import SectionLabel from '@bbc/psammead-section-label';
import styled from 'styled-components';
import { StoryPromoLi, StoryPromoUl } from '@bbc/psammead-story-promo-list';
import {
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MAX,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
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

// Apply the right margin-top between the section label and the promos
const SpacingDiv = styled.div`
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    padding-top: ${GEL_SPACING_DBL};
  }
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    padding-bottom: ${GEL_SPACING_TRPL};
  }
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
  if (!content.length) return null;
  const hasSingleFeature = content.filter(Boolean).length === 1;
  const [singleFeature] = content.filter(Boolean);

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
        {hasSingleFeature ? (
          <SpacingDiv>
            <StoryPromo item={singleFeature} dir={dir} displayImage />
          </SpacingDiv>
        ) : (
          <StoryPromoUl>
            {content.map(item => (
              <StoryPromoLi key={item.id || item.uri}>
                <StoryPromo item={item} dir={dir} displayImage />
              </StoryPromoLi>
            ))}
          </StoryPromoUl>
        )}
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
