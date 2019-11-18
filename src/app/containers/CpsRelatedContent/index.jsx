import React, { useContext } from 'react';
import { arrayOf, shape } from 'prop-types';
import SectionLabel from '@bbc/psammead-section-label';
import styled from 'styled-components';
import { StoryPromoLi, StoryPromoUl } from '@bbc/psammead-story-promo-list';

import { storyItem } from '#models/propTypes/storyItem';
import { ServiceContext } from '#contexts/ServiceContext';
import Grid from '#app/components/Grid';
import StoryPromo from '../StoryPromo';

// z-index needs explicitly set as the psammead section label component uses negative z-indices
const StyledGrid = styled(Grid)`
  z-index: 0;
`;

const isValidItem = item => {
  return !!item.indexImage;
};

const CpsRelatedContent = ({ content }) => {
  const { script, service, dir, translations } = useContext(ServiceContext);
  if (!content.length) return null;

  return (
    <StyledGrid
      aria-labelledby="related-content-heading"
      item
      startOffset={{
        group0: 1,
        group1: 1,
        group2: 1,
        group3: 1,
        group4: 2,
        group5: 5,
      }}
      columns={{
        group0: 6,
        group1: 6,
        group2: 6,
        group3: 6,
        group4: 8,
        group5: 12,
      }}
    >
      <SectionLabel
        script={script}
        service={service}
        dir={dir}
        labelId="related-content-heading"
      >
        {translations.relatedContent}
      </SectionLabel>

      <StoryPromoUl>
        {content.filter(isValidItem).map(item => (
          <StoryPromoLi key={item.id}>
            <StoryPromo item={item} />
          </StoryPromoLi>
        ))}
      </StoryPromoUl>
    </StyledGrid>
  );
};

CpsRelatedContent.propTypes = {
  // We Reuse the front page story item blocks
  // Both pages use CPS, so the data schema is the same
  // This can be found under CPS ARES payloads: relatedContent.groups[0].promos
  content: arrayOf(shape(storyItem)),
};

CpsRelatedContent.defaultProps = {
  content: [],
};

export default CpsRelatedContent;
