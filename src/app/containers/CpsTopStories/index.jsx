import React, { useContext } from 'react';
import { arrayOf, shape } from 'prop-types';
import { StoryPromoLi, StoryPromoUl } from '@bbc/psammead-story-promo-list';

import topStories from '#pages/StoryPage/topStories.json';
import { storyItem } from '#models/propTypes/storyItem';
import { ServiceContext } from '#contexts/ServiceContext';
import StoryPromo from '../StoryPromo';
import CpsAsset from '../CpsAsset';

const TopStories = ({ content }) => {
  const { dir } = useContext(ServiceContext);

  const a11yAttributes = {
    as: 'section',
    role: 'region',
    'aria-labelledby': 'top-stories-heading',
  };

  if (!content || !content.length) return null;

  const singleTransform = (promo) => (
    <StoryPromo item={promo} dir={dir} displayImage={false} />
  );

  const listTransform = (items) => (
    <StoryPromoUl>
      {items.map((item) => (
        <StoryPromoLi key={item.id || item.uri}>
          {singleTransform(item)}
        </StoryPromoLi>
      ))}
    </StoryPromoUl>
  );

  return (
    <CpsAsset
      title="Top Stories"
      a11yAttributes={a11yAttributes}
      content={content}
      enableGridWrapper={false}
      singleTransform={singleTransform}
      listTransform={listTransform}
    />
  );
};

TopStories.propTypes = {
  content: arrayOf(shape(storyItem)),
};

TopStories.defaultProps = {
  content: topStories, // TODO: rm this https://github.com/bbc/simorgh/issues/5765
};

export default TopStories;
