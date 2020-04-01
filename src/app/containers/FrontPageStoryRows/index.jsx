import React from 'react';
import Grid from '@bbc/psammead-grid';
import { arrayOf, shape, bool, oneOf } from 'prop-types';
import { StoryPromoLi } from '@bbc/psammead-story-promo-list';
import {
  topStoryColumns,
  leadingStoryColumns,
  regularStoryColumns,
  noImageStoryColumns,
} from './storyColumns';
import { storyItem } from '#models/propTypes/storyItem';
import BulletinContainer from '../Bulletin';
import StoryPromoContainer from '../StoryPromo';

const isBulletin = (item) =>
  item.contentType === 'TVBulletin' || item.contentType === 'RadioBulletin';

const renderPromo = ({
  item,
  promoType = 'regular',
  isFirstSection = false,
  dir,
  displayImage = true,
}) => {
  const lazyLoadImage = !(promoType === 'top' && isFirstSection); // don't lazy load image if it is a top story
  const renderedPromo = isBulletin(item) ? (
    <BulletinContainer item={item} lazyLoadImage={lazyLoadImage} dir={dir} />
  ) : (
    <StoryPromoContainer
      item={item}
      promoType={promoType}
      lazyLoadImage={lazyLoadImage}
      dir={dir}
      displayImage={displayImage}
      displaySummary={displayImage}
    />
  );

  return renderedPromo;
};

/*
 * Below are all the different row types that can be used for frontpages.
 * They all take in an array of story items and a dir.
 */

// These propTypes are common to the three Row Types
const rowPropTypes = {
  stories: arrayOf(shape(storyItem)).isRequired,
  dir: oneOf(['ltr', 'rtl']),
};

const rowDefaultProps = {
  dir: 'ltr',
};

export const TopRow = ({
  stories,
  isFirstSection,
  sectionHasSingleStory,
  dir,
  parentColumns,
  parentEnableGelGutters,
}) => {
  if (sectionHasSingleStory) {
    return (
      <>
        {renderPromo({
          item: stories[0],
          promoType: 'top',
          isFirstSection,
          dir,
        })}
      </>
    );
  }
  return (
    <Grid
      item
      columns={topStoryColumns}
      as={StoryPromoLi}
      dir={dir}
      parentColumns={parentColumns}
      parentEnableGelGutters={parentEnableGelGutters}
    >
      {renderPromo({ item: stories[0], promoType: 'top', isFirstSection, dir })}
    </Grid>
  );
};

TopRow.propTypes = {
  ...rowPropTypes,
  isFirstSection: bool,
  sectionHasSingleStory: bool,
};

TopRow.defaultProps = {
  ...rowDefaultProps,
  isFirstSection: false,
  sectionHasSingleStory: false,
};

export const LeadingRow = ({
  stories,
  dir,
  parentColumns,
  parentEnableGelGutters,
}) => (
  <>
    <Grid
      item
      columns={leadingStoryColumns}
      as={StoryPromoLi}
      dir={dir}
      parentColumns={parentColumns}
      parentEnableGelGutters={parentEnableGelGutters}
    >
      {renderPromo({ item: stories[0], promoType: 'leading', dir })}
    </Grid>
    <Grid
      item
      columns={regularStoryColumns}
      as={StoryPromoLi}
      dir={dir}
      parentColumns={parentColumns}
      parentEnableGelGutters={parentEnableGelGutters}
    >
      {renderPromo({ item: stories[1], dir })}
    </Grid>
  </>
);

LeadingRow.propTypes = {
  ...rowPropTypes,
};

LeadingRow.defaultProps = {
  ...rowDefaultProps,
};

export const RegularRow = ({
  stories,
  displayImages,
  dir,
  parentColumns,
  parentEnableGelGutters,
}) => (
  <>
    {stories.map((story) => (
      <Grid
        item
        columns={displayImages ? regularStoryColumns : noImageStoryColumns}
        key={story.id}
        as={StoryPromoLi}
        dir={dir}
        parentColumns={parentColumns}
        parentEnableGelGutters={parentEnableGelGutters}
      >
        {renderPromo({
          item: story,
          dir,
          displayImage: displayImages,
        })}
      </Grid>
    ))}
  </>
);

RegularRow.propTypes = {
  ...rowPropTypes,
  displayImages: bool,
};

RegularRow.defaultProps = {
  ...rowDefaultProps,
  displayImages: false,
};
