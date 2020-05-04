import React, { useContext } from 'react';
import { arrayOf, shape, any } from 'prop-types';
import { StoryPromoLi, StoryPromoUl } from '@bbc/psammead-story-promo-list';

import topStories from '#pages/StoryPage/topStories.json';
import { storyItem } from '#models/propTypes/storyItem';
import { ServiceContext } from '#contexts/ServiceContext';
import StoryPromo from '../StoryPromo';
import CpsOnwardJourney from '../CpsOnwardJourney';

const TopStories = ({ content, parentColumns }) => {
  const { dir } = useContext(ServiceContext);

  const singleTransform = promo => (
    <StoryPromo item={promo} dir={dir} displayImage={false} />
  );

  const listTransform = items => (
    <StoryPromoUl>
      {items.map(item => (
        <StoryPromoLi key={item.id || item.uri}>
          {singleTransform(item)}
        </StoryPromoLi>
      ))}
    </StoryPromoUl>
  );

  return (
    <CpsOnwardJourney
      labelId="top-stories-heading"
      title="Top Stories"
      content={content}
      parentColumns={parentColumns}
      singleTransform={singleTransform}
      listTransform={listTransform}
    />
  );
};

TopStories.propTypes = {
  content: arrayOf(shape(storyItem)),
  parentColumns: shape(any),
};

TopStories.defaultProps = {
  content: topStories, // TODO: rm this https://github.com/bbc/simorgh/issues/5765
  parentColumns: null,
};

export default TopStories;
