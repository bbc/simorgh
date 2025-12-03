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

type Props = {
  content: OptimoBlock[];
  experimentProps?: ComponentExperimentProps;
};

const RelatedContentSection = ({ content, experimentProps }: Props) => {
  const { translations, script, service } = use(ServiceContext);

  const {
    palette: { GREY_2 },
  } = useTheme();

  const blocks = removeCustomBlocks(content);
  const eventTrackingData = {
    block: {
      componentName: 'related-content',
      ...(experimentProps && experimentProps),
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
