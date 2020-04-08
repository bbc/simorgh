import React, { useContext } from 'react';
import { arrayOf, shape, bool } from 'prop-types';
import { StoryPromoLi, StoryPromoUl } from '@bbc/psammead-story-promo-list';
import path from 'ramda/src/path';
import assocPath from 'ramda/src/assocPath';

import { RequestContext } from '#contexts/RequestContext';
import { storyItem } from '#models/propTypes/storyItem';
import { ServiceContext } from '#contexts/ServiceContext';
import StoryPromo from '../StoryPromo';
import Grid from '../../components/Grid';
import CpsOnwardJourney from '../CpsOnwardJourney';

const formatItem = (item, env) => {
  if (env === 'live') return item;

  // In non-live environments, we need to pass this querystring to ensure
  // the linked site retrieves its data from the TEST API location
  const uriSuffix = '?_x_candy_override=https%3A%2F%2Fapi.test.bbc.co.uk';
  const baseUri = path(['locators', 'assetUri'], item);

  return assocPath(['locators', 'assetUri'], `${baseUri}${uriSuffix}`, item);
};

const CpsRelatedContent = ({ content, enableGridWrapper }) => {
  const { dir, translations } = useContext(ServiceContext);
  const { env } = useContext(RequestContext);

  if (!content.length) return null;

  const singleTransform = (promo) => (
    <StoryPromo item={formatItem(promo, env)} dir={dir} />
  );

  const listTransform = (items) => (
    <Grid
      columns={{
        group0: 6,
        group1: 6,
        group2: 6,
        group3: 6,
        group4: 8,
        group5: 8,
      }}
      as={StoryPromoUl}
      enableGelGutters
      dir={dir}
    >
      {items.map((item) => (
        <Grid
          item
          columns={{
            group0: 6,
            group1: 6,
            group2: 6,
            group3: 6,
            group4: 4,
            group5: 4,
          }}
          as={StoryPromoLi}
          key={item.id || item.uri}
          dir={dir}
        >
          <StoryPromo item={formatItem(item, env)} dir={dir} />
        </Grid>
      ))}
    </Grid>
  );

  return (
    <CpsOnwardJourney
      labelId="related-content-heading"
      title={translations.relatedContent}
      content={content}
      enableGridWrapper={enableGridWrapper}
      singleTransform={singleTransform}
      listTransform={listTransform}
    />
  );
};

CpsRelatedContent.propTypes = {
  // We Reuse the front page story item blocks
  // Both pages use CPS, so the data schema is the same
  // This can be found under CPS ARES payloads: relatedContent.groups[0].promos
  content: arrayOf(shape(storyItem)),
  enableGridWrapper: bool,
};

CpsRelatedContent.defaultProps = {
  content: [],
  enableGridWrapper: false,
};

export default CpsRelatedContent;
