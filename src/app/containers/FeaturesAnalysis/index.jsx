import React, { useContext } from 'react';
import { arrayOf, shape, node } from 'prop-types';
import SectionLabel from '@bbc/psammead-section-label';
import { C_GHOST } from '@bbc/psammead-styles/colours';
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
  /* z-index needs explicitly set as the psammead section label component uses negative z-indices */
  z-index: 0;
`;

const StyledSectionLabel = styled(SectionLabel)`
  margin-top: 0;

  span {
    background-color: transparent;
  }

  span[dir] {
    background-color: ${C_GHOST};
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
          {content.map(item => (
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
  // This can be found under Frontpage data payloads: content.groups.find(group => group.type === 'feature-main').items
  content: arrayOf(shape(storyItem)),
};

FeaturesAnalysis.defaultProps = {
  content: featuresAnalysis, // @TODO: rm this
};

export default FeaturesAnalysis;
