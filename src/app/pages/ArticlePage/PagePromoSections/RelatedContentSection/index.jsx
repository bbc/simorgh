import React, { useContext } from 'react';
import { useTheme } from '@emotion/react';
import SectionLabel from '#psammead/psammead-section-label/src';
import pathOr from 'ramda/src/pathOr';
import pathEq from 'ramda/src/pathEq';
import path from 'ramda/src/path';
import tail from 'ramda/src/tail';
import slice from 'ramda/src/slice';
import identity from 'ramda/src/identity';
import last from 'ramda/src/last';
import filter from 'ramda/src/filter';
import pipe from 'ramda/src/pipe';

import useViewTracker from '#hooks/useViewTracker';
import { ServiceContext } from '#contexts/ServiceContext';
import {
  RelatedContentGrid,
  StyledRelatedContentSection,
  StyledPromoItem,
  SingleItemWrapper,
} from './index.styles';
import generatePromoId from '../../../../lib/utilities/generatePromoId';
import RelatedContentItem from './RelatedContentItem';

const BLOCKS_TO_IGNORE = ['wsoj', 'mpu'];

const removeCustomBlocks = pipe(
  filter(block => !BLOCKS_TO_IGNORE.includes(block.type)),
  last,
);

const renderRelatedContentList = (item, index, eventTrackingData, viewRef) => {
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
      <RelatedContentItem
        item={item}
        ariaLabelledBy={ariaLabelledBy}
        ref={viewRef}
        eventTrackingData={eventTrackingData}
      />
    </StyledPromoItem>
  );
};

const RelatedContentSection = ({ content }) => {
  const { translations, script, service } = useContext(ServiceContext);

  const {
    palette: { GREY_2 },
  } = useTheme();

  const blocks = removeCustomBlocks(content);
  const eventTrackingData = {
    block: {
      componentName: 'related-content',
    },
  };
  const eventTrackingDataSend = path(['block'], eventTrackingData);
  const viewRef = useViewTracker(eventTrackingDataSend);

  if (!pathEq('relatedContent', ['type'], blocks)) return null;

  if (!blocks) return null;

  const items = pathOr([], ['model', 'blocks'], blocks);
  const LABEL_ID = 'related-content-heading';

  const customTitle =
    pathEq('title', [0, 'type'], items) &&
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
        backgroundColor={GREY_2}
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
            ref={viewRef}
            eventTrackingData={eventTrackingData}
          />
        </SingleItemWrapper>
      ) : (
        <RelatedContentGrid>
          {reducedStoryPromoItems.map((item, index) =>
            renderRelatedContentList(item, index, eventTrackingData, viewRef),
          )}
        </RelatedContentGrid>
      )}
    </StyledRelatedContentSection>
  );
};

export default RelatedContentSection;
