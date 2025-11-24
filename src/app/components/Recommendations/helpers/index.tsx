import pathOr from 'ramda/src/pathOr';
import pathEq from 'ramda/src/pathEq';
import tail from 'ramda/src/tail';
import slice from 'ramda/src/slice';
import last from 'ramda/src/last';
import filter from 'ramda/src/filter';
import pipe from 'ramda/src/pipe';
import { OptimoBlock } from '#app/models/types/optimo';
import { Recommendation } from '#app/models/types/onwardJourney';

type Features = {
  id: string;
  locators: {
    canonicalUrl?: string;
  };
  headlines: {
    promoHeadline?: { blocks: { model: { text: string } }[] };
    seoHeadline?: string;
  };
  images?: {
    defaultPromoImage?: {
      blocks?: any[];
    };
  };
};

// Extracts up to 6 related content items from Optimo blocks, skipping custom title if present
export const getRelatedContentData = (blocks: OptimoBlock[]) => {
  const BLOCKS_TO_IGNORE = ['wsoj', 'mpu', 'continueReading'];
  const removeCustomBlocks = pipe(
    filter((block: OptimoBlock) => !BLOCKS_TO_IGNORE.includes(block.type)),
    last,
  );
  const relatedContentBlock = removeCustomBlocks(blocks);
  if (
    !relatedContentBlock ||
    !pathEq('relatedContent', ['type'], relatedContentBlock)
  ) {
    return [];
  }
  const items = pathOr([], ['model', 'blocks'], relatedContentBlock);
  const hasCustomTitle =
    pathEq('title', [0, 'type'], items) &&
    pathOr(
      '',
      [0, 'model', 'blocks', 0, 'model', 'blocks', 0, 'model', 'text'],
      items,
    );
  const storyPromoItems = hasCustomTitle ? tail(items) : items;
  return slice(0, 6, storyPromoItems);
};

export const getHeadlineFromOptimoBlock = (block: any) => {
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
  return headlineFirst || headlineSecond;
};

export const getHrefFromOptimoBlock = (block: any) => {
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
  return assetUriFirst || assetUriSecond;
};

export const getAltTextFromOptimoBlock = (block: any) =>
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

export const getImageFromOptimoBlock = (block: any) => {
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

export const mapOptimoBlockToRecommendation = (block: any): Recommendation => ({
  id: block.id,
  title: getHeadlineFromOptimoBlock(block),
  href: getHrefFromOptimoBlock(block),
  image: getImageFromOptimoBlock(block),
});

const getAltTextFromDefaultPromoImage = (defaultPromoImage?: {
  blocks?: any[];
}) => {
  const altTextBlock = defaultPromoImage?.blocks?.find(
    block => block.type === 'altText',
  );
  return (
    altTextBlock?.model?.blocks?.[0]?.model?.blocks?.[0]?.model?.blocks?.[0]
      ?.model?.text || ''
  );
};

const getRawImageBlock = (defaultPromoImage?: { blocks?: any[] }) =>
  defaultPromoImage?.blocks?.find(block => block.type === 'rawImage')?.model ??
  {};

export const mapFeaturesToRecommendation = (featuresContent: Features) => {
  const promoHeadlineBlocks = featuresContent.headlines?.promoHeadline;
  const promoHeadlineText =
    Array.isArray(promoHeadlineBlocks) &&
    promoHeadlineBlocks[0]?.blocks &&
    Array.isArray(promoHeadlineBlocks[0].blocks)
      ? promoHeadlineBlocks[0].blocks[0]?.model?.text
      : '';
  const title =
    promoHeadlineText || featuresContent.headlines?.seoHeadline || '';

  const defaultPromoImage = featuresContent.images?.defaultPromoImage;
  const rawImage = getRawImageBlock(defaultPromoImage);

  const image = {
    locator: rawImage.locator ?? '',
    altText: getAltTextFromDefaultPromoImage(defaultPromoImage) || title,
    width: rawImage.width ?? 0,
    height: rawImage.height ?? 0,
    copyrightHolder: rawImage.copyrightHolder ?? '',
    originCode: rawImage.originCode ?? '',
  };

  return {
    id: featuresContent.id,
    title,
    href: featuresContent.locators?.canonicalUrl ?? '',
    image,
  };
};
