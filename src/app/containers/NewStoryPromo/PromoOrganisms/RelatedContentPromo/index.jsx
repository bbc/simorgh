import React, { useContext } from 'react';
import { shape, arrayOf, string } from 'prop-types';
import SectionLabel from '#legacy/psammead-section-label/src';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import pathEq from 'ramda/src/pathEq';
import tail from 'ramda/src/tail';
import slice from 'ramda/src/slice';
import identity from 'ramda/src/identity';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { StoryPromoUlGrid, StyledWrapper } from './index.styles';
import RelatedContentItem from './RelatedContentItem';

const RelatedContentPromo = ({ content }) => {
  const { translations } = useContext(ServiceContext);

  if (!content) return null;
  const items = path(['model', 'blocks'], content);

  const LABEL_ID = 'related-content-heading';

  const customTitle =
    pathEq([0, 'type'], 'title', items) &&
    path(
      [0, 'model', 'blocks', 0, 'model', 'blocks', 0, 'model', 'text'],
      items,
    );

  const title =
    customTitle || pathOr('Related Content', ['relatedContent'], translations);

  if (customTitle) tail(items);

  const storyPromoItems = customTitle ? tail(items) : identity(items);

  const reducedStoryPromoItems = slice(0, 6, storyPromoItems);

  const hasSingleContent = reducedStoryPromoItems.length === 1;

  return (
    <StyledWrapper aria-labelledby={LABEL_ID} role="region" data-e2e={LABEL_ID}>
      <SectionLabel>{title}</SectionLabel>
      {hasSingleContent ? (
        <RelatedContentItem
          item={reducedStoryPromoItems[0]}
          index={0}
          labelId={LABEL_ID}
        />
      ) : (
        <StoryPromoUlGrid>
          {reducedStoryPromoItems.map((item, index) => (
            <li>
              <RelatedContentItem
                item={item}
                index={index}
                labelId="RelatedContent"
              />
            </li>
          ))}
        </StoryPromoUlGrid>
      )}
    </StyledWrapper>
  );
};

RelatedContentPromo.propTypes = {
  content: shape({
    type: string,
    model: shape({
      blocks: arrayOf(
        shape({
          type: string,
        }),
      ),
    }),
  }).isRequired,
};

export default RelatedContentPromo;
