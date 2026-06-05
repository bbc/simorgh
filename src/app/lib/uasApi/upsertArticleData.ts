import uasApiRequest from '#app/lib/uasApi';
import {
  FAVOURITES_CONFIG,
  createFavouritesPayload,
  extractPromoImageFromArticleData,
  buildPromoImageUrl,
  buildCurrentMetadata,
} from '#app/lib/uasApi/uasUtility';
import type { Article } from '#app/models/types/optimo';
import type { Services } from '#app/models/types/global';

interface SaveOrUpdateArticleMetadataParams {
  articlePageData: Article;
  articleId: string;
  service: Services;
  isRefreshAvailable: boolean;
}

const upsertArticleData = async ({
  articlePageData,
  articleId,
  service,
  isRefreshAvailable,
}: SaveOrUpdateArticleMetadataParams): Promise<Record<string, unknown>> => {
  const promoImageObj = extractPromoImageFromArticleData(articlePageData);
  const promoImageUrl = buildPromoImageUrl(promoImageObj);

  const body = createFavouritesPayload({
    articleId,
    service,
    articleTitle: articlePageData.promo.headlines.seoHeadline || '',
    promoImage: promoImageUrl,
    promoImageAltText: promoImageObj?.altText || '',
    locatorUrl: articlePageData.metadata.locators?.canonicalUrl || '',
  });
  // POST can do both create and update operations in UAS,
  // so we can use the same endpoint for both saving a new article and updating an existing one.
  // UAS will determine whether to create a new entry or update the existing one based on the unique resourceId provided in the payload.
  const response = await uasApiRequest('POST', FAVOURITES_CONFIG.activityType, {
    body,
    isRefreshAvailable,
  });

  // Only return metadata if POST was successful
  if (!response.ok) {
    throw new Error(`Failed to save article metadata: ${response.status}`);
  }

  return buildCurrentMetadata(articlePageData, { articleId, service });
};

export default upsertArticleData;
