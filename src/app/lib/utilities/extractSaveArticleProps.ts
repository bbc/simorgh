import type { Article } from '#app/models/types/optimo';
import { OptimoBlock } from '#app/models/types/optimo';

/**
 * Extracts metadata needed for SaveArticleButton from full article page data.
 *
 * This middleware function acts as a single point of configuration for what data
 * the SaveArticleButton component requires. When expanding SaveArticleButton's
 * metadata needs, only this function needs to be updated.
 *
 * @param articlePageData - Full article page data
 * @returns Minimal ArticlePageData object containing only required fields
 */

export interface ArticlePageData {
  contentBlocks?: OptimoBlock[];
  promoImageBlocks?: OptimoBlock[];
  canonicalUrl?: string;
}

const extractSaveArticleProps = (
  articlePageData: Article,
): ArticlePageData => ({
  contentBlocks: articlePageData?.content?.model?.blocks,
  promoImageBlocks:
    articlePageData?.promo?.images?.defaultPromoImage?.blocks ?? [],
  canonicalUrl: articlePageData?.metadata?.locators?.canonicalUrl,
});

export default extractSaveArticleProps;
