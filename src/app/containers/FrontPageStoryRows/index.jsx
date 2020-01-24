import React from 'react';
import Grid from '@bbc/psammead-grid';
import { arrayOf, shape, bool, oneOf } from 'prop-types';
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

const renderPromo = (
  item,
  promoType,
  optional = { isFirstSection: false, displayImage: true },
) => {
  const lazyLoadImage = promoType === 'top' && optional.isFirstSection; // don't lazy load image if it is a top story
  const renderedPromo = isBulletin(item) ? (
    <BulletinContainer item={item} lazyLoadImage={lazyLoadImage} />
  ) : (
    <StoryPromoContainer
      item={item}
      promoType={promoType}
      lazyLoadImage={lazyLoadImage}
      displayImage={optional.displayImage}
    />
  );

  return renderedPromo;
};

export const TopRow = ({ stories, isFirstSection, isSingleStory, dir }) => (
  <Grid
    item
    columns={topStoryColumns}
    as={!isSingleStory && StoryPromoListItem}
    dir={dir}
  >
    {renderPromo(stories[0], 'top', { isFirstSection })}
  </Grid>
);

TopRow.propTypes = {
  stories: arrayOf(shape(storyItem)).isRequired,
  isFirstSection: bool,
  isSingleStory: bool,
  dir: oneOf(['ltr', 'rtl']),
};

TopRow.defaultProps = {
  isFirstSection: false,
  isSingleStory: false,
  dir: 'ltr',
};

export const LeadingRow = ({ stories, dir }) => (
  <>
    <Grid
      item
      columns={leadingStoryColumns}
      as={StoryPromoListItem}
      isBulletin={isBulletin(stories[0])}
      dir={dir}
    >
      {renderPromo(stories[0], 'leading')}
    </Grid>
    <Grid
      item
      columns={regularStoryColumns}
      as={StoryPromoListItem}
      isBulletin={isBulletin(stories[1])}
      dir={dir}
    >
      {renderPromo(stories[1], 'regular')}
    </Grid>
  </>
);

LeadingRow.propTypes = {
  stories: arrayOf(shape(storyItem)).isRequired,
  dir: oneOf(['ltr', 'rtl']),
};

LeadingRow.defaultProps = {
  dir: 'ltr',
};

export const RegularRow = ({ stories, displayImages, dir }) => (
  <>
    {stories.map(story => (
      <Grid
        item
        columns={regularStoryColumns}
        key={story.id}
        as={StoryPromoListItem}
        isBulletin={isBulletin(story)}
        dir={dir}
      >
        {renderPromo(story, 'regular', { displayImage: displayImages })}
      </Grid>
    ))}
  </>
);

RegularRow.propTypes = {
  stories: arrayOf(shape(storyItem)).isRequired,
  displayImages: bool,
  dir: oneOf(['ltr', 'rtl']),
};

RegularRow.defaultProps = {
  displayImages: false,
  dir: 'ltr',
};
