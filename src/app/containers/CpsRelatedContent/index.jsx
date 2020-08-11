import React, { useContext } from 'react';
import { arrayOf, shape, number } from 'prop-types';
import { pathOr } from 'ramda';

import { storyItem } from '#models/propTypes/storyItem';
import { ServiceContext } from '#contexts/ServiceContext';
import CpsOnwardJourney from '../CpsOnwardJourney';
import {
  SinglePromoItemGrid,
  MultiplePromoItemsGrid,
} from '#app/components/StoryPromoItems';

const CpsRelatedContent = ({ content, parentColumns }) => {
  const { translations } = useContext(ServiceContext);

  const title = pathOr('Related Content', ['relatedContent'], translations);

  const storyPromoUlGridColumns = {
    group0: 6,
    group1: 6,
    group2: 6,
    group3: 6,
    group4: 8,
    group5: 8,
  };

  const storyPromoLiGridColumns = {
    group0: 6,
    group1: 6,
    group2: 6,
    group3: 6,
    group4: 4,
    group5: 4,
  };

  const singlePromoItemGridColumns = {
    group0: 1,
    group1: 1,
    group2: 1,
    group3: 1,
    group4: 2,
    group5: 2,
  };

  return (
    <CpsOnwardJourney
      labelId="related-content-heading"
      title={title}
      content={content}
      parentColumns={parentColumns}
      singleTransform={SinglePromoItemGrid}
      listTransform={MultiplePromoItemsGrid}
      columnType="secondary"
      singlePromoItemGridColumns={singlePromoItemGridColumns}
      storyPromoUlGridColumns={storyPromoUlGridColumns}
      storyPromoLiGridColumns={storyPromoLiGridColumns}
    />
  );
};

CpsRelatedContent.propTypes = {
  // We Reuse the front page story item blocks
  // Both pages use CPS, so the data schema is the same
  // This can be found under CPS ARES payloads: relatedContent.groups[0].promos
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

CpsRelatedContent.defaultProps = {
  content: [],
  parentColumns: null,
};

export default CpsRelatedContent;
