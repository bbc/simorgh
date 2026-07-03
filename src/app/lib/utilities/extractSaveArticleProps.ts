import type { Article } from '#app/models/types/optimo';
import extractPromoImage from '#app/lib/utilities/extractPromoImage';
import buildIChefURL from '#app/lib/utilities/ichefURL';
import filterForBlockType from '#app/lib/utilities/blockHandlers';

/**
 * Extracts metadata needed for SaveArticleButton from full article page data.
 *
 * This middleware function acts as a single point of configuration for what data
 * the SaveArticleButton component requires. When expanding SaveArticleButton's
 * metadata needs, only this function needs to be updated.
 *
 * @param saveArticlePageData - Full article page data
 * @returns Minimal ArticlePageData object containing only required fields
 */

export interface ArticlePageData {
  canonicalUrl?: string;
  promoImage?: string;
  promoImageAltText?: string;
  headline?: string | null;
}

const extractSaveArticleProps = (
  saveArticlePageData: Article,
): ArticlePageData => {
  const contentBlocks = saveArticlePageData?.content?.model?.blocks;
  const promoImageBlocks = filterForBlockType(contentBlocks, 'image');
  const { altText, rawBlock } = extractPromoImage(
    promoImageBlocks?.model?.blocks,
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
    headlineBlock?.model?.blocks?.[0]?.model?.blocks?.[0]?.model?.text || '';

  return {
    canonicalUrl: saveArticlePageData?.metadata?.locators?.canonicalUrl || '',
    promoImage: promoImageUrl,
    promoImageAltText: altText,
    headline,
  };
};

export default extractSaveArticleProps;
