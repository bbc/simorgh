import React from 'react';
import { StoryPromoLi } from '#psammead/psammead-story-promo-list/src';
import Grid from '#components/Grid';
import {
  topStoryColumns,
  leadingStoryColumns,
  regularStoryColumns,
  noImageStoryColumns,
} from './storyColumns';
import BulletinContainer from '../Bulletin';
import StoryPromoContainer from '../StoryPromo';

const isBulletin = item =>
  item?.contentType === 'TVBulletin' || item?.contentType === 'RadioBulletin';

const renderPromo = ({
  item,
  index,
  promoType = 'regular',
  isFirstSection = false,
  dir,
  displayImage = true,
  labelId,
}) => {
  const lazyLoadImage = !(promoType === 'top' && isFirstSection); // don't lazy load image if it is a top story
  const renderedPromo = isBulletin(item) ? (
    <BulletinContainer item={item} lazyLoadImage={lazyLoadImage} dir={dir} />
  ) : (
    <StoryPromoContainer
      labelId={labelId}
      item={item}
      index={index}
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

export const TopRow = ({
  stories,
  isFirstSection = false,
  sectionHasSingleStory = false,
  dir = 'ltr',
  parentColumns,
  parentEnableGelGutters,
  labelId,
}) => {
  if (sectionHasSingleStory) {
    return (
      <>
        {renderPromo({
          item: stories[0],
          promoType: 'top',
          isFirstSection,
          dir,
          labelId,
        })}
      </>
    );
  }
  return (
    <Grid
      item
      columns={topStoryColumns}
      as={StoryPromoLi}
      parentColumns={parentColumns}
      parentEnableGelGutters={parentEnableGelGutters}
    >
      {renderPromo({ item: stories[0], promoType: 'top', isFirstSection, dir })}
    </Grid>
  );
};

export const LeadingRow = ({
  stories,
  dir = 'ltr',
  parentColumns,
  parentEnableGelGutters,
  labelId,
}) => (
  <>
    <Grid
      item
      columns={leadingStoryColumns}
      as={StoryPromoLi}
      parentColumns={parentColumns}
      parentEnableGelGutters={parentEnableGelGutters}
    >
      {renderPromo({ item: stories[0], promoType: 'leading', dir, labelId })}
    </Grid>
    <Grid
      item
      columns={regularStoryColumns}
      as={StoryPromoLi}
      parentColumns={parentColumns}
      parentEnableGelGutters={parentEnableGelGutters}
    >
      {renderPromo({ item: stories[1], dir })}
    </Grid>
  </>
);

export const RegularRow = ({
  stories,
  displayImages = false,
  dir = 'ltr',
  parentColumns,
  parentEnableGelGutters,
  labelId,
}) => (
  <>
    {stories.map((story, i) => {
      const penultimateItem = stories.length - 2 === i;
      const border = displayImages ? true : !penultimateItem;

      return (
        <Grid
          item
          columns={displayImages ? regularStoryColumns : noImageStoryColumns}
          key={story.id}
          as={StoryPromoLi}
          parentColumns={parentColumns}
          parentEnableGelGutters={parentEnableGelGutters}
          border={border}
        >
          {renderPromo({
            index: i,
            item: story,
            dir,
            displayImage: displayImages,
            labelId,
          })}
        </Grid>
      );
    })}
  </>
);
