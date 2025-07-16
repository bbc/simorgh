import { use } from 'react';
import { jsx, useTheme } from '@emotion/react';
import SectionLabel from '#psammead/psammead-section-label/src';
import pathOr from 'ramda/src/pathOr';
import pathEq from 'ramda/src/pathEq';
import tail from 'ramda/src/tail';
import slice from 'ramda/src/slice';
import identity from 'ramda/src/identity';
import last from 'ramda/src/last';
import filter from 'ramda/src/filter';
import pipe from 'ramda/src/pipe';
import { OptimizelyContext } from '@optimizely/react-sdk';
import useViewTracker from '#hooks/useViewTracker';
import { ViewTracker } from '#app/lib/analyticsUtils/types';
import { ServiceContext } from '../../contexts/ServiceContext';
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
  viewTracker: ViewTracker;
};

const renderRelatedContentList = ({
  item,
  index,
  eventTrackingData,
  viewTracker,
}: RelatedContentListProps) => {
  const {
    model: { blocks },
  } = item as any;

  const relatedContentPromos = slice(1, Infinity, blocks);

  const promoItems = relatedContentPromos.map((promo: any, promoIndex: number) => {
    const eventTrackingDataWithPositions = {
      ...eventTrackingData,
      campaignID: `related-content-${index}`,
      componentName: 'related-content',
      itemCount: relatedContentPromos.length,
      position: promoIndex + 1,
    };

    const id = generatePromoId(promo, promoIndex);

    const singleItemFullWidth = relatedContentPromos.length === 1;

    const viewTrackerData = {
      ...viewTracker,
      promoId: id,
      positionInList: promoIndex + 1,
    };

    return (
      <li
        key={id}
        className={`flex m-0 w-full h-auto p-[calc(1rem-3px)] ${
          singleItemFullWidth
            ? 'group-3:w-3/4'
            : 'group-2:w-1/2 group-3:w-1/3'
        }`}
        data-testid="related-content-item"
      >
        <RelatedContentItem
          item={promo}
          dir={pathOr('ltr', ['dir'], item)}
          eventTrackingData={eventTrackingDataWithPositions}
          viewTracker={viewTrackerData}
        />
      </li>
    );
  });

  return (
    <ul
      className="flex flex-wrap m-[calc(-1rem+3px)]"
      role="list"
      data-testid="related-content-list"
    >
      {promoItems}
    </ul>
  );
};

const RelatedContentSection = ({
  content,
  sectionLabelTitle,
  sectionLabelLangCode,
  sectionLabelOverrideHeadingAs,
  sectionLabelBar,
  sectionLabelBackground,
  eventTrackingData,
  promoType,
  promoSectionOverride,
  ...props
}: any) => {
  const {
    script,
    service,
    lang,
    dir,
    translations = {},
    optimizely,
  } = use(ServiceContext);

  const { enabled } = use(OptimizelyContext);

  const viewTracker = useViewTracker(eventTrackingData);

  const { palette } = useTheme();

  if (!content || !content.length) return null;

  const hasSingleContent = content.length === 1;

  const contentWithoutCustomBlocks = content.map((item: any) => {
    const hasCustomBlocks = item.model.blocks.some((block: any) =>
      BLOCKS_TO_IGNORE.includes(block.type),
    );

    if (hasCustomBlocks) {
      const filteredBlocks = removeCustomBlocks(item.model.blocks);
      return {
        ...item,
        model: {
          ...item.model,
          blocks: filteredBlocks ? [filteredBlocks] : [],
        },
      };
    }

    return item;
  });

  const isFirstItemHeadlineFirst = isHeadlineFirst(contentWithoutCustomBlocks[0]);

  const contentToRender = isFirstItemHeadlineFirst
    ? contentWithoutCustomBlocks
    : tail(contentWithoutCustomBlocks);

  const relatedContentPromos = contentToRender.map((item: any, index: number) => {
    const eventTrackingDataWithPositions = {
      ...eventTrackingData,
      campaignID: `related-content-${index}`,
      componentName: 'related-content',
    };

    const id = generatePromoId(item, index);

    const singleItemFullWidth = contentToRender.length === 1;

    const viewTrackerData = {
      ...viewTracker,
      promoId: id,
      positionInList: index + 1,
    };

    return (
      <div
        key={id}
        className={`${
          singleItemFullWidth
            ? 'w-full group-3:w-3/4'
            : 'w-full -mx-4 group-2:w-1/2 group-3:w-1/3'
        }`}
        data-testid="related-content-item"
      >
        <RelatedContentItem
          item={item}
          dir={pathOr('ltr', ['dir'], item)}
          eventTrackingData={eventTrackingDataWithPositions}
          viewTracker={viewTrackerData}
        />
      </div>
    );
  });

  const hasMultipleContent = contentToRender.length > 1;

  const relatedContentGrid = (
    <div className="flex flex-wrap m-[calc(-1rem+3px)]">
      {relatedContentPromos}
    </div>
  );

  const relatedContentList = contentToRender.map((item: any, index: number) => (
    <div key={`related-content-${index}`}>
      {renderRelatedContentList({
        item,
        index,
        eventTrackingData,
        viewTracker,
      })}
    </div>
  ));

  const shouldUsePromoList = pathEq(['model', 'blocks', 0, 'type'], 'wsoj', contentToRender[0]);

  return (
    <section
      role="region"
      aria-labelledby="related-content-heading"
      data-e2e="related-content-section"
      className="px-4 group-2:px-8 group-4:px-0"
      {...props}
    >
      <SectionLabel
        script={script}
        service={service}
        dir={dir}
        labelId="related-content-heading"
        columnType="main"
        mobileDivider={false}
        overrideHeadingAs={sectionLabelOverrideHeadingAs}
        bar={sectionLabelBar}
        backgroundColor={sectionLabelBackground}
      >
        {sectionLabelTitle}
      </SectionLabel>

      {shouldUsePromoList ? (
        <PromoList
          promos={contentToRender}
          dir={dir}
          promoType={promoType}
          eventTrackingData={eventTrackingData}
          viewTracker={viewTracker}
        />
      ) : hasMultipleContent ? (
        relatedContentGrid
      ) : (
        relatedContentList
      )}
    </section>
  );
};

export default RelatedContentSection;

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
        viewTracker={viewTracker}
        eventTrackingData={eventTrackingData}
      />
    </PromoItem>
  );

type Props = {
  content: OptimoBlock[];
  sendOptimizelyEvents?: boolean;
};

const RelatedContentSection = ({ content, sendOptimizelyEvents }: Props) => {
  const { translations, script, service } = use(ServiceContext);
  const { optimizely } = use(OptimizelyContext);

  const {
    palette: { GREY_2 },
  } = useTheme();

  const blocks = removeCustomBlocks(content);
  const eventTrackingData = {
    block: {
      componentName: 'related-content',
      ...(sendOptimizelyEvents && {
        optimizely,
      }),
    },
  };
  const viewTracker = useViewTracker(eventTrackingData.block);

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
            viewTracker={viewTracker}
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
              viewTracker,
            }),
          )}
        </PromoList>
      )}
    </section>
  );
};

export default RelatedContentSection;
