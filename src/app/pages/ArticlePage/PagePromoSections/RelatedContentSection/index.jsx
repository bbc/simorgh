import React, { useContext } from 'react';
import { shape, arrayOf, string } from 'prop-types';
import SectionLabel from '#psammead/psammead-section-label/src';
import pathOr from 'ramda/src/pathOr';
import pathEq from 'ramda/src/pathEq';
import tail from 'ramda/src/tail';
import slice from 'ramda/src/slice';
import identity from 'ramda/src/identity';
import { C_GREY_2 } from '#psammead/psammead-styles/src/colours';
import { ServiceContext } from '../../../../contexts/ServiceContext';
import {
  RelatedContentGrid,
  StyledRelatedContentSection,
  StyledPromoItem,
  SingleItemWrapper,
} from './index.styles';
import generatePromoId from '../generatePromoId';
import RelatedContentItem from './RelatedContentItem';

const renderRelatedContentList = (item, index) => {
  const assetUri = pathOr(
    '',
    [
      'model',
      'blocks',
      1,
      'model',
      'blocks',
      0,
      'model',
      'blocks',
      0,
      'model',
      'locator',
    ],
    item,
  );

  const ariaLabelledBy = generatePromoId({
    sectionType: 'promo-rel-content',
    assetUri,
    index,
  });

  return (
    <StyledPromoItem key={ariaLabelledBy}>
      <RelatedContentItem item={item} ariaLabelledBy={ariaLabelledBy} />
    </StyledPromoItem>
  );
};

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

  const assetUri = pathOr(
    '',
    [
      'model',
      'blocks',
      1,
      'model',
      'blocks',
      0,
      'model',
      'blocks',
      0,
      'model',
      'locator',
    ],
    reducedStoryPromoItems[0],
  );

  const ariaLabelledBy = generatePromoId({
    sectionType: 'promo-rel-content',
    assetUri,
  });

  return (
    <StyledRelatedContentSection
      aria-labelledby={LABEL_ID}
      role="region"
      data-e2e={LABEL_ID}
    >
      <SectionLabel
        labelId={LABEL_ID}
        backgroundColor={C_GREY_2}
        script={script}
        service={service}
      >
        {title}
      </SectionLabel>
      {hasSingleContent ? (
        <SingleItemWrapper>
          <RelatedContentItem
            item={reducedStoryPromoItems[0]}
            ariaLabelledBy={ariaLabelledBy}
          />
        </SingleItemWrapper>
      ) : (
        <RelatedContentGrid>
          {reducedStoryPromoItems.map(renderRelatedContentList)}
        </RelatedContentGrid>
      )}
    </StyledRelatedContentSection>
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
