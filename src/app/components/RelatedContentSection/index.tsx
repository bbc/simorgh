/** @jsx jsx */

import { useContext } from 'react';
import { jsx, useTheme } from '@emotion/react';
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
import { OptimizelyContext } from '@optimizely/react-sdk';
import useViewTracker from '#hooks/useViewTracker';
import { ServiceContext } from '../../contexts/ServiceContext';
import styles from './index.styles';
import generatePromoId from '../../lib/utilities/generatePromoId';
import RelatedContentItem from './RelatedContentItem';
import PromoList from '../../legacy/components/OptimoPromos/PromoList';
import PromoItem from '../../legacy/components/OptimoPromos/PromoItem/index.styles';
import { EventTrackingBlock } from '../../models/types/eventTracking';
import { OptimoBlock } from '../../models/types/optimo';

const BLOCKS_TO_IGNORE = ['wsoj', 'mpu'];

const removeCustomBlocks = pipe(
  filter((block: OptimoBlock) => !BLOCKS_TO_IGNORE.includes(block.type)),
  last,
);

const isHeadlineFirst = (item: object) => {
  return !!pathOr<string>(
    '',
    ['model', 'blocks', 0, 'model', 'blocks', 0, 'model', 'text'],
    item,
  );
};

type RelatedContentListProps = {
  item: object;
  index: number;
  eventTrackingData: EventTrackingBlock;
  viewRef: React.Ref<HTMLDivElement>;
};

const renderRelatedContentList = ({
  item,
  index,
  eventTrackingData,
  viewRef,
}: RelatedContentListProps) => {
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

  const headlineFirst = isHeadlineFirst(item);

  return (
    <PromoItem
      css={headlineFirst ? styles.promoItemFullWidth : styles.promoItem}
      key={ariaLabelledBy}
    >
      <RelatedContentItem
        item={item}
        ariaLabelledBy={ariaLabelledBy}
        ref={viewRef}
        eventTrackingData={eventTrackingData}
      />
    </PromoItem>
  );
};

type Props = {
  content: OptimoBlock[];
  sendOptimizelyEvents?: boolean;
};

const RelatedContentSection = ({ content, sendOptimizelyEvents }: Props) => {
  const { translations, script, service } = useContext(ServiceContext);
  const { optimizely } = useContext(OptimizelyContext);

  const {
    palette: { GREY_2 },
  } = useTheme();

  const blocks = removeCustomBlocks(content);
  const eventTrackingData = {
    block: {
      componentName: 'related-content',
      ...(sendOptimizelyEvents && {
        optimizely,
        optimizelyMetricNameOverride: 'related_content',
      }),
    },
  };
  const eventTrackingDataSend = path<object>(['block'], eventTrackingData);
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
  const headlineFirst = isHeadlineFirst(reducedStoryPromoItems[0]);

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
    <section
      css={styles.relatedContentSection}
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
        <div
          css={
            headlineFirst
              ? styles.singleItemWrapperFullWidth
              : styles.singleItemWrapper
          }
        >
          <RelatedContentItem
            item={reducedStoryPromoItems[0]}
            ariaLabelledBy={ariaLabelledBy}
            // @ts-expect-error TODO need help fixing this!
            ref={viewRef}
            eventTrackingData={eventTrackingData}
          />
        </div>
      ) : (
        <PromoList css={styles.relatedContentGrid}>
          {reducedStoryPromoItems.map((item, index) =>
            renderRelatedContentList({
              item,
              index,
              eventTrackingData,
              // @ts-expect-error TODO need help fixing this!
              viewRef,
            }),
          )}
        </PromoList>
      )}
    </section>
  );
};

export default RelatedContentSection;
