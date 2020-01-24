import React from 'react';
import Grid from '@bbc/psammead-grid';
import { arrayOf, shape, bool } from 'prop-types';
import styled, { css } from 'styled-components';

import {
  GEL_GROUP_1_SCREEN_WIDTH_MIN,
  GEL_GROUP_2_SCREEN_WIDTH_MAX,
} from '@bbc/gel-foundations/breakpoints';
import {
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
} from '@bbc/gel-foundations/spacings';
import { StoryPromoLi } from '@bbc/psammead-story-promo-list';
import {
  topStoryColumns,
  leadingStoryColumns,
  regularStoryColumns,
} from './storyColumns';
import { storyItem } from '#models/propTypes/storyItem';
import BulletinContainer from '../Bulletin';
import StoryPromoContainer from '../StoryPromo';

const StoryPromoListItem = styled(StoryPromoLi)`
  ${({ isBulletin, isFirstPromo }) =>
    isBulletin &&
    css`
      @media (min-width: ${GEL_GROUP_1_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MAX}) {
        ${isFirstPromo
          ? `padding-bottom: ${GEL_SPACING_TRPL};`
          : `padding: ${GEL_SPACING_DBL} 0 ${GEL_SPACING_TRPL};`}
      }
    `}
`;

const isBulletin = item =>
  item.contentType === 'TVBulletin' || item.contentType === 'RadioBulletin';

const renderPromo = (item, promoType, isFirstSection = false) => {
  const lazyLoadImage = promoType === 'top' && isFirstSection; // don't lazy load image if it is a top story

  const renderedPromo = isBulletin(item) ? (
    <BulletinContainer item={item} lazyLoadImage={lazyLoadImage} />
  ) : (
    <StoryPromoContainer
      item={item}
      promoType={promoType}
      lazyLoadImage={lazyLoadImage}
    />
  );

  return renderedPromo;
};

export const TopRow = ({ stories, isFirstSection, isSingleStory }) => (
  <Grid
    item
    columns={topStoryColumns}
    as={!isSingleStory && StoryPromoListItem}
  >
    {renderPromo(stories[0], 'top', isFirstSection)}
  </Grid>
);

TopRow.propTypes = {
  stories: arrayOf(shape(storyItem)).isRequired,
  isFirstSection: bool,
  isSingleStory: bool,
};

TopRow.defaultProps = {
  isFirstSection: false,
  isSingleStory: false,
};

export const LeadingRow = ({ stories }) => (
  <>
    <Grid
      item
      columns={leadingStoryColumns}
      as={StoryPromoListItem}
      isBulletin={isBulletin(stories[0])}
    >
      {renderPromo(stories[0], 'leading')}
    </Grid>
    <Grid
      item
      columns={regularStoryColumns}
      as={StoryPromoListItem}
      isBulletin={isBulletin(stories[1])}
    >
      {renderPromo(stories[1], 'regular')}
    </Grid>
  </>
);

LeadingRow.propTypes = {
  stories: arrayOf(shape(storyItem)).isRequired,
};

export const RegularRow = ({ stories }) => (
  <>
    {stories.map(story => (
      <Grid
        item
        columns={regularStoryColumns}
        key={story.id}
        as={StoryPromoListItem}
        isBulletin={isBulletin(story)}
      >
        {renderPromo(story, 'regular')}
      </Grid>
    ))}
  </>
);

RegularRow.propTypes = {
  stories: arrayOf(shape(storyItem)).isRequired,
};
