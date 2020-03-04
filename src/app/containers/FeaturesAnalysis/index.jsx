import React, { useContext } from 'react';
import { arrayOf, shape, bool, node } from 'prop-types';
import SectionLabel from '@bbc/psammead-section-label';
import styled from 'styled-components';
import { StoryPromoLi, StoryPromoUl } from '@bbc/psammead-story-promo-list';
import { GEL_GROUP_3_SCREEN_WIDTH_MIN } from '@bbc/gel-foundations/breakpoints';
import {
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
} from '@bbc/gel-foundations/spacings';

import featuresAnalysis from '#pages/StoryPage/featuresAnalysis.json';
import { RequestContext } from '#contexts/RequestContext';
import { storyItem } from '#models/propTypes/storyItem';
import { ServiceContext } from '#contexts/ServiceContext';
import { GhostGrid, GridItemConstrainedLarge } from '#lib/styledGrid';
import StoryPromo from '../StoryPromo';

const Wrapper = styled(GridItemConstrainedLarge)`
  margin-bottom: ${GEL_SPACING_DBL};
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    margin-bottom: ${GEL_SPACING_TRPL};
  }
  /* z-index needs explicitly set as the psammead section label component uses negative z-indices */
  z-index: 0;
`;

const StyledSectionLabel = styled(SectionLabel)`
  margin-top: 0;

  span {
    background-color: transparent;
  }
`;

const FeaturesAnalysis = ({ content, enableGridWrapper }) => {
  const { script, service, dir, translations } = useContext(ServiceContext);
  const { env } = useContext(RequestContext);
  const a11yAttributes = {
    as: 'section',
    role: 'region',
    'aria-labelledby': 'features-analysis-heading',
  };
  const FeaturesAnalysisWrapper = ({ children }) =>
    enableGridWrapper ? (
      <GhostGrid {...a11yAttributes}>
        <Wrapper>{children}</Wrapper>
      </GhostGrid>
    ) : (
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
          Featured &amp; Analysis {/** this should be translated */}
        </StyledSectionLabel>

        <StoryPromoUl>
          {featuresAnalysis.map(item => (
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
  // We Reuse the front page story item blocks
  // Both pages use CPS, so the data schema is the same
  // This can be found under CPS ARES payloads: relatedContent.groups[0].promos
  content: arrayOf(shape(storyItem)),
  enableGridWrapper: bool,
};

FeaturesAnalysis.defaultProps = {
  content: [],
  enableGridWrapper: false,
};

export default FeaturesAnalysis;
