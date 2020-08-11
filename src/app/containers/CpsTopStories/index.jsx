import React, { useContext } from 'react';
import { arrayOf, shape, number } from 'prop-types';
import { pathOr } from 'ramda';

import { storyItem } from '#models/propTypes/storyItem';
import { ServiceContext } from '#contexts/ServiceContext';
import CpsOnwardJourney from '../CpsOnwardJourney';
import {
  SinglePromoItem,
  MultiplePromoItems,
} from '#app/components/StoryPromoItems';

const TopStories = ({ content, parentColumns }) => {
  const { translations } = useContext(ServiceContext);

  const title = pathOr('Top Stories', ['topStoriesTitle'], translations);

  return (
    <CpsOnwardJourney
      labelId="top-stories-heading"
      title={title}
      content={content}
      displayImage={false}
      displaySummary={false}
      parentColumns={parentColumns}
      singleTransform={SinglePromoItem}
      listTransform={MultiplePromoItems}
      columnType="secondary"
    />
  );
};

TopStories.propTypes = {
  content: arrayOf(shape(storyItem)),
  parentColumns: shape({
    group0: number,
    group1: number,
    group2: number,
    group3: number,
    group4: number,
    group5: number,
  }),
};

TopStories.defaultProps = {
  content: [],
  parentColumns: null,
};

export default TopStories;
