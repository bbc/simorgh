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

import topStories from '#pages/StoryPage/topStories.json';
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

const TopStories = ({ content }) => {
  const { script, service, dir } = useContext(ServiceContext);

  const a11yAttributes = {
    as: 'section',
    role: 'region',
    'aria-labelledby': 'top-storie-heading',
  };

  const TopStoriesWrapper = ({ children }) => (
    <Wrapper {...a11yAttributes}>{children}</Wrapper>
  );
  TopStoriesWrapper.propTypes = {
    children: node.isRequired,
  };

  if (!content || !content.length) return null;

  const hasSingleStory = content.filter(Boolean).length === 1;
  const [singleStory] = content.filter(Boolean);

  return (
    <TopStoriesWrapper>
      <Wrapper>
        <StyledSectionLabel
          script={script}
          service={service}
          dir={dir}
          labelId="top-stories-heading"
        >
          Top Stories
        </StyledSectionLabel>

        {hasSingleStory ? (
          <StoryPromo item={singleStory} dir={dir} displayImage={false} />
        ) : (
          <StoryPromoUl>
            {content.map(item => (
              <StoryPromoLi key={item.id || item.uri}>
                <StoryPromo item={item} dir={dir} displayImage={false} />
              </StoryPromoLi>
            ))}
          </StoryPromoUl>
        )}
      </Wrapper>
    </TopStoriesWrapper>
  );
};

TopStories.propTypes = {
  content: arrayOf(shape(storyItem)),
};

TopStories.defaultProps = {
  content: topStories, // TODO: rm this https://github.com/bbc/simorgh/issues/5765
};

export default TopStories;
