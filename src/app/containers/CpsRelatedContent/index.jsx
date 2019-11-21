import React, { useContext } from 'react';
import { arrayOf, shape } from 'prop-types';
import SectionLabel from '@bbc/psammead-section-label';
import styled from 'styled-components';
import { StoryPromoLi, StoryPromoUl } from '@bbc/psammead-story-promo-list';

import { storyItem } from '#models/propTypes/storyItem';
import { ServiceContext } from '#contexts/ServiceContext';
import { GridItemConstrainedLarge } from '#lib/styledGrid';
import StoryPromo from '../StoryPromo';

// z-index needs explicitly set as the psammead section label component uses negative z-indices
const Wrapper = styled(GridItemConstrainedLarge)`
  z-index: 0;
`;

const CpsRelatedContent = ({ content }) => {
  const { script, service, dir, translations } = useContext(ServiceContext);
  if (!content.length) return null;

  return (
    <Wrapper aria-labelledby="related-content-heading">
      <SectionLabel
        script={script}
        service={service}
        dir={dir}
        labelId="related-content-heading"
      >
        {translations.relatedContent}
      </SectionLabel>

      <StoryPromoUl>
        {content.map(item => (
          <StoryPromoLi key={item.id}>
            <StoryPromo item={item} />
          </StoryPromoLi>
        ))}
      </StoryPromoUl>
    </Wrapper>
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
