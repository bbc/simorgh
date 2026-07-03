import uasApiRequest from '#app/lib/uasApi';
import {
  FAVOURITES_CONFIG,
  createFavouritesPayload,
  buildCurrentMetadata,
} from '#app/lib/uasApi/uasUtility';
import type { ArticlePageData } from '#app/lib/utilities/extractSaveArticleProps';
import type { Services } from '#app/models/types/global';

interface SaveOrUpdateArticleMetadataParams {
  articlePageData: ArticlePageData;
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
  const body = createFavouritesPayload({
    articlePageData,
    articleId,
    service,
  });
  // POST can do both create and update operations in UAS,
  // so we can use the same endpoint for both saving a new article and updating an existing one.
  // UAS will determine whether to create a new entry or update the existing one based on the unique resourceId provided in the payload.
  await uasApiRequest('POST', FAVOURITES_CONFIG.activityType, {
    body,
    isRefreshAvailable,
  });

  return buildCurrentMetadata(articlePageData, { articleId, service });
};

export default upsertArticleData;
