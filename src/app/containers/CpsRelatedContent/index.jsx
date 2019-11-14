import React, { useContext } from 'react';
import SectionLabel from '@bbc/psammead-section-label';
import styled from 'styled-components';
import { StoryPromoLi, StoryPromoUl } from '@bbc/psammead-story-promo-list';
import { GridItemConstrainedLarge } from '#lib/styledGrid';
import StoryPromo from '../StoryPromo';
import { ServiceContext } from '#contexts/ServiceContext';

// This is required as the psammead section label component uses negative z-indices
const Wrapper = styled(GridItemConstrainedLarge)`
  z-index: 1;
`;

const isValidItem = item => {
  return !!item.indexImage;
};

const CpsRelatedContent = ({ content }) => {
  if (!content.length) return null;

  const { script, service, dir, translations } = useContext(ServiceContext);

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
        {content.filter(isValidItem).map(item => (
          <StoryPromoLi>
            <StoryPromo key={item.id} item={item} />
          </StoryPromoLi>
        ))}
      </StoryPromoUl>
    </Wrapper>
  );
};

CpsRelatedContent.propTypes = {};

export default CpsRelatedContent;
