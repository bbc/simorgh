import React, { useContext } from 'react';
import { shape, arrayOf, string } from 'prop-types';
import SectionLabel from '#legacy/psammead-section-label/src';
import pathOr from 'ramda/src/pathOr';
import pathEq from 'ramda/src/pathEq';
import tail from 'ramda/src/tail';
import slice from 'ramda/src/slice';
import identity from 'ramda/src/identity';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { C_GREY_2 } from '#app/legacy/psammead-styles/src/colours';
import { StoryPromoUlBase } from '#components/OptimoPromos/Lists';
import {
  RelatedContentGrid,
  StyledWrapper,
  StyledStoryPromoLi,
  SingleItemWrapper,
} from './index.styles';
import RelatedContentItem from './RelatedContentItem';

const RelatedContentSection = ({ content }) => {
  const { translations, script, service } = useContext(ServiceContext);

  if (!pathEq(['type'], 'relatedContent', content)) return null;

  if (!content) return null;
  const items = pathOr([], ['model', 'blocks'], content);

  const LABEL_ID = 'related-content-heading';

  const customTitle =
    pathEq([0, 'type'], 'title', items) &&
    pathOr(
      [],
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
      <SectionLabel
        labelId={LABEL_ID}
        backgroundColor={C_GREY_2}
        script={script}
        service={service}
      >
        {title}
      </SectionLabel>
      {hasSingleContent ? (
        () => {
          const id = pathOr('noId', ['id'], content[0]);
          const itemId = `RelatedContent-${id}`;
          return (
            <SingleItemWrapper>
              <RelatedContentItem
                item={reducedStoryPromoItems[0]}
                itemId={itemId}
              />
            </SingleItemWrapper>
          );
        }
      ) : (
        <RelatedContentGrid as={StoryPromoUlBase}>
          {reducedStoryPromoItems.map(item => {
            const id = pathOr('noId', ['id'], item);
            const itemId = `RelatedContent-${id}`;

            return (
              <StyledStoryPromoLi key={itemId}>
                <RelatedContentItem item={item} itemId={itemId} />
              </StyledStoryPromoLi>
            );
          })}
        </RelatedContentGrid>
      )}
    </StyledWrapper>
  );
};

RelatedContentSection.propTypes = {
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

export default RelatedContentSection;
