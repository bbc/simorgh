/** @jsx jsx */
import { use } from 'react';
import { jsx, useTheme } from '@emotion/react';

import useToggle from '#hooks/useToggle';
import SectionLabel from '#psammead/psammead-section-label/src';
import SkipLinkWrapper from '#components/SkipLinkWrapper';

import { ServiceContext } from '#contexts/ServiceContext';
import useViewTracker from '#app/hooks/useViewTracker';
import { Recommendation } from '#app/models/types/onwardJourney';
import { OptimoBlock } from '#app/models/types/optimo';
import pathOr from 'ramda/src/pathOr';
import pathEq from 'ramda/src/pathEq';
import tail from 'ramda/src/tail';
import slice from 'ramda/src/slice';
import last from 'ramda/src/last';
import filter from 'ramda/src/filter';
import pipe from 'ramda/src/pipe';
import styles from './index.styles';
import RecommendationsItem from './RecommendationsItem';

const eventTrackingData = {
  componentName: 'midarticle-mostread',
};

interface RecommendationsProps {
  data: Recommendation[];
  blocks: OptimoBlock[];
  topStoriesContent?: unknown;
  featuresContent?: unknown;
  referrerExperimentVariant?: string;
}
// Extracts up to 6 related content items from Optimo blocks, skipping custom title if present
const getRelatedContentData = (blocks: OptimoBlock[]) => {
  const BLOCKS_TO_IGNORE = ['wsoj', 'mpu', 'continueReading'];
  const removeCustomBlocks = pipe(
    filter((block: OptimoBlock) => !BLOCKS_TO_IGNORE.includes(block.type)),
    last,
  );
  const relatedContentBlock = removeCustomBlocks(blocks);
  // relatedContentBlock is the last block that isn't ignored, should be of type 'relatedContent'
  if (
    !relatedContentBlock ||
    !pathEq('relatedContent', ['type'], relatedContentBlock)
  ) {
    return [];
  }

  const items = pathOr([], ['model', 'blocks'], relatedContentBlock);
  // If the first item is a custom title, skip it
  const hasCustomTitle =
    pathEq('title', [0, 'type'], items) &&
    pathOr(
      '',
      [0, 'model', 'blocks', 0, 'model', 'blocks', 0, 'model', 'text'],
      items,
    );

  const storyPromoItems = hasCustomTitle ? tail(items) : items;

  // Only return up to 6 items
  return slice(0, 6, storyPromoItems);
};

// Extracts the headline text from a related content Optimo link block
const getHeadlineFromOptimoBlock = (block: any) => {
  const headlineFirst = pathOr<string>(
    '',
    ['model', 'blocks', 0, 'model', 'blocks', 0, 'model', 'text'],
    block,
  );
  const headlineSecond = pathOr<string>(
    '',
    ['model', 'blocks', 1, 'model', 'blocks', 0, 'model', 'text'],
    block,
  );
  console.log('headlineFirst: ', headlineFirst);
  console.log('headlineSecond: ', headlineSecond);
  return headlineFirst || headlineSecond;
};

// Extracts the href/link from a related content Optimo link block
const getHrefFromOptimoBlock = (block: any) => {
  // Try both possible assetUri locations as in RelatedContentItem
  const assetUriFirst = pathOr<string>(
    '',
    [
      'model',
      'blocks',
      0,
      'model',
      'blocks',
      0,
      'model',
      'blocks',
      0,
      'model',
      'locator',
    ],
    block,
  );
  const assetUriSecond = pathOr<string>(
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
    block,
  );
  console.log('assetUriFirst: ', assetUriFirst);
  console.log('assetUriSecond: ', assetUriSecond);
  return assetUriFirst || assetUriSecond;
};
const getAltTextFromOptimoBlock = (block: any) =>
  pathOr<string>(
    '',
    [
      'model',
      'blocks',
      0,
      'model',
      'blocks',
      0,
      'model',
      'blocks',
      0,
      'model',
      'blocks',
      0,
      'model',
      'text',
    ],
    block,
  );
const getImageFromOptimoBlock = (block: any) => {
  // Try to find the image and rawImage blocks
  const imageBlock = block?.model?.blocks?.find((b: any) => b.type === 'image');
  const rawImageBlock = imageBlock?.model?.blocks?.find(
    (b: any) => b.type === 'rawImage',
  );
  return {
    locator: rawImageBlock?.model?.locator ?? '',
    altText: getAltTextFromOptimoBlock(block),
    width: rawImageBlock?.model?.width ?? 0,
    height: rawImageBlock?.model?.height ?? 0,
    copyrightHolder: rawImageBlock?.model?.copyrightHolder ?? '',
    originCode: rawImageBlock?.model?.originCode ?? '',
  };
};

// Maps an Optimo link block to the Recommendation shape expected by RecommendationsItem
const mapOptimoBlockToRecommendation = (block: any) => ({
  id: block.id,
  title: getHeadlineFromOptimoBlock(block),
  href: getHrefFromOptimoBlock(block),
  image: getImageFromOptimoBlock(block),
});

const Recommendations = ({
  data, // control
  blocks, // search
  topStoriesContent, // direct
  featuresContent, // social
  referrerExperimentVariant, // experiment variant for referrer
}: RecommendationsProps) => {
  const { recommendations, mostRead, script, service, dir } =
    use(ServiceContext);

  // eslint-disable-next-line no-console
  console.log('Recommendations data:', data);
  // eslint-disable-next-line no-console
  console.log('Recommendations blocks:', blocks);
  // eslint-disable-next-line no-console
  console.log('Recommendations topStoriesContent:', topStoriesContent);
  // eslint-disable-next-line no-console
  console.log('Recommendations featuresContent:', featuresContent);
  // eslint-disable-next-line no-console
  console.log(
    'Recommendations referrerExperimentVariant:',
    referrerExperimentVariant,
  );
  const viewTracker = useViewTracker(eventTrackingData);

  const {
    palette: { GREY_2 },
  } = useTheme();

  const { enabled } = useToggle('midArticleOnwardJourney');

  let displayData: Recommendation[] = [];

  if (
    !referrerExperimentVariant ||
    referrerExperimentVariant === 'off' ||
    referrerExperimentVariant.includes('control')
  ) {
    displayData = data ?? [];
  } else if (referrerExperimentVariant === 'search') {
    displayData = getRelatedContentData(blocks).map(
      mapOptimoBlockToRecommendation,
    );
    console.log('displayData from related content: ', displayData);
    // Log the nested blocks for inspection
  } else if (referrerExperimentVariant === 'direct') {
    displayData = Array.isArray(topStoriesContent) ? topStoriesContent : [];
  } else if (referrerExperimentVariant === 'social') {
    displayData = Array.isArray(featuresContent) ? featuresContent : [];
  }

  if (!enabled || !displayData.length) return null;

  const labelId = 'recommendations-heading';

  const a11yAttributes = {
    role: 'region',
    'aria-labelledby': labelId,
  };

  const { skipLink, header } = recommendations || {};

  const { text, endTextVisuallyHidden } = skipLink || {
    text: 'Skip %title% and continue reading',
    endTextVisuallyHidden: 'End of %title%',
  };

  const title = header ?? 'Most read';

  const terms = { '%title%': title };

  const isSinglePromo = displayData.length === 1;

  const endTextId = `end-of-recommendations`;

  const skipLinkProps = {
    endTextId,
    terms,
    text,
    endTextVisuallyHidden,
  };

  return (
    <section
      css={styles.recommendationsWrapper}
      data-e2e={labelId}
      {...a11yAttributes}
    >
      <SkipLinkWrapper service={service} {...skipLinkProps}>
        {title ? (
          <SectionLabel
            css={styles.labelComponent}
            script={script}
            service={service}
            dir={dir}
            labelId={labelId}
            columnType="main"
            mobileDivider={false}
            overrideHeadingAs="strong"
            bar={false}
            backgroundColor={GREY_2}
          >
            {title}
          </SectionLabel>
        ) : null}
        {isSinglePromo ? (
          <RecommendationsItem recommendation={displayData?.[0]} />
        ) : (
          <ul css={styles.recommendationsList} role="list" {...viewTracker}>
            {displayData?.map(recommendation => (
              <li key={recommendation.id} role="listitem">
                <RecommendationsItem recommendation={recommendation} />
              </li>
            ))}
          </ul>
        )}
      </SkipLinkWrapper>
    </section>
  );
};

export default Recommendations;
