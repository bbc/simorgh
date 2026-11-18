import { use } from 'react';
import { useTheme } from '@emotion/react';
import SectionLabel from '#psammead/psammead-section-label/src';
import pathOr from 'ramda/src/pathOr';
import pathEq from 'ramda/src/pathEq';
import tail from 'ramda/src/tail';
import slice from 'ramda/src/slice';
import identity from 'ramda/src/identity';
import last from 'ramda/src/last';
import filter from 'ramda/src/filter';
import pipe from 'ramda/src/pipe';
import useViewTracker from '#hooks/useViewTracker';
import { ComponentExperimentProps } from '#app/models/types/global';
import { ServiceContext } from '../../contexts/ServiceContext';
import styles from './index.styles';
import generatePromoId from '../../lib/utilities/generatePromoId';
import RelatedContentItem from './RelatedContentItem';
import PromoList from '../../legacy/components/OptimoPromos/PromoList';
import PromoItem from '../../legacy/components/OptimoPromos/PromoItem/index.styles';
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

export const getRelatedContentData = (content: OptimoBlock[]) => {
  const block = removeCustomBlocks(content);
  if (!block || !pathEq('relatedContent', ['type'], block)) return null;

  const blocks = pathOr<OptimoBlock[]>([], ['model', 'blocks'], block);
  const customTitle =
    pathEq('title', [0, 'type'], blocks) &&
    pathOr(
      [],
      [0, 'model', 'blocks', 0, 'model', 'blocks', 0, 'model', 'text'],
      blocks,
    );
  const items = slice(0, 6, customTitle ? tail(blocks) : identity(blocks));

  // Match the two supported headline/link positions in RelatedContentItem.
  // Keep malformed items in the existing render, but do not offer an empty
  // destination from the article-end navigation.
  const hasMeaningfulItems = items.some(item => {
    const headlineModels = [0, 1].map(index =>
      pathOr<Record<string, unknown>>(
        {},
        ['model', 'blocks', index, 'model', 'blocks', 0, 'model'],
        item,
      ),
    );
    const headline = headlineModels[0].text || headlineModels[1].text;
    const destinations = headlineModels.map(model =>
      pathOr<string>('', ['blocks', 0, 'model', 'locator'], model),
    );
    const destination = destinations[0] || destinations[1];

    return (
      typeof headline === 'string' &&
      headline.trim().length > 0 &&
      typeof destination === 'string' &&
      destination.trim().length > 0
    );
  });

  return { customTitle, items, hasMeaningfulItems };
};

type Props = {
  content: OptimoBlock[];
  experimentProps?: ComponentExperimentProps;
};

const RelatedContentSection = ({ content, experimentProps }: Props) => {
  const { translations } = use(ServiceContext);
  const {
    palette: { GREY_2 },
  } = useTheme();

  const relatedContent = getRelatedContentData(content);
  const eventTrackingData = {
    block: {
      componentName: 'related-content',
      ...(experimentProps && experimentProps),
    },
  };
  const viewTracker = useViewTracker(eventTrackingData.block);

  if (!relatedContent) return null;

  const { customTitle, items: reducedStoryPromoItems } = relatedContent;
  const LABEL_ID = 'related-content-heading';

  const title =
    customTitle || pathOr('Related Content', ['relatedContent'], translations);

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

  let ariaLabelledBy = generatePromoId({
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
      <SectionLabel labelId={LABEL_ID} backgroundColor={GREY_2}>
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
          {reducedStoryPromoItems.map((item, index) => {
            const itemAssetUri = pathOr(
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

            ariaLabelledBy = generatePromoId({
              sectionType: 'promo-rel-content',
              assetUri: itemAssetUri,
              index,
            });

            return (
              <PromoItem
                css={
                  isHeadlineFirst(item)
                    ? styles.promoItemFullWidth
                    : styles.promoItem
                }
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
          })}
        </PromoList>
      )}
    </section>
  );
};

export default RelatedContentSection;
