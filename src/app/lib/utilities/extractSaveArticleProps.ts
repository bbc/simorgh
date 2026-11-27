import type { Article, OptimoBlock } from '#app/models/types/optimo';
import extractPromoImage from '#app/lib/utilities/extractPromoImage';
import buildIChefURL from '#app/lib/utilities/ichefURL';
import filterForBlockType from '#app/lib/utilities/blockHandlers';
import type { PageTypes } from '#app/models/types/global';
import { ARTICLE_PAGE, MEDIA_ARTICLE_PAGE } from '#app/routes/utils/pageTypes';

/**
 * Extracts metadata needed for SaveArticleButton from full article page data.
 *
 * This middleware function acts as a single point of configuration for what data
 * the SaveArticleButton component requires. When expanding SaveArticleButton's
 * metadata needs, only this function needs to be updated.
 *
 * @param articlePageData - Full article page data
 * @param pageType - Rendered page type, used to identify media articles
 * @returns Minimal SaveArticlePageData object containing only required fields
 */

export interface SaveArticlePageData {
  canonicalUrl?: string;
  promoImage?: string;
  promoImageAltText?: string;
  headline?: string | null;
}

// MediaArticle pages nest their promo image inside an audio/video block's
// aresMedia block, rather than as a top-level content block.
const MEDIA_BLOCK_TYPES = ['audio', 'video'];

type OptimoContainerBlock = OptimoBlock & {
  model: { blocks?: OptimoBlock[] };
};

const isMediaBlock = (block: OptimoBlock): block is OptimoContainerBlock =>
  MEDIA_BLOCK_TYPES.includes(block.type);

const findPromoImageBlocks = (
  contentBlocks: OptimoBlock[] | undefined,
  pageType: PageTypes,
) => {
  if (pageType !== MEDIA_ARTICLE_PAGE) {
    return filterForBlockType(contentBlocks, 'image');
  }

  const mediaBlock = contentBlocks?.find(isMediaBlock);
  const aresMediaBlock = filterForBlockType(
    mediaBlock?.model?.blocks,
    'aresMedia',
  ) as OptimoContainerBlock | undefined;

  const mediaImageBlock = filterForBlockType(
    aresMediaBlock?.model?.blocks,
    'image',
  );
  if (mediaImageBlock) return mediaImageBlock;

  return filterForBlockType(contentBlocks, 'image');
};

const extractSaveArticleProps = (
  articlePageData: Article,
  pageType: PageTypes = ARTICLE_PAGE,
): SaveArticlePageData => {
  const contentBlocks = articlePageData?.content?.model?.blocks;
  const promoImageBlocks = findPromoImageBlocks(contentBlocks, pageType);
  const { altText, rawBlock } = extractPromoImage(
    promoImageBlocks?.model?.blocks ?? [],
  );
  const promoImageUrl =
    rawBlock?.model?.locator && rawBlock?.model?.originCode
      ? buildIChefURL({
          originCode: rawBlock.model.originCode,
          locator: rawBlock.model.locator,
          resolution: 320,
        })
      : '';

  const headlineBlock = filterForBlockType(contentBlocks, 'headline');
  const headline =
    headlineBlock?.model?.blocks?.[0]?.model?.blocks?.[0]?.model?.text ||
    articlePageData?.promo?.headlines?.seoHeadline ||
    '';

  return {
    canonicalUrl: articlePageData?.metadata?.locators?.canonicalUrl || '',
    promoImage: promoImageUrl,
    promoImageAltText: altText,
    headline,
  };
};

export default extractSaveArticleProps;
