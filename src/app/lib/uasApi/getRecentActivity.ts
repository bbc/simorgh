import nodeLogger from '#lib/logger.node';
import { UAS_API_ERROR } from '../logger.const';
import uasApiRequest from './index';
import type { SavedArticle } from './uasUtility';
import { FAVOURITES_CONFIG } from './uasUtility';

const logger = nodeLogger(__filename);

export interface UasActivityItem {
  activityType: string;
  resourceId: string;
  resourceType: string;
  resourceDomain: string;
  created: string;
  action: string;
  metaData: {
    service?: string;
    articleId?: string;
    title?: string;
    promoImage?: string;
    promoImageAltText?: string;
    locatorUrl?: string;
  };
  '@id': string;
}

export interface UasActivityResponse {
  total: number;
  pagination: {
    startIndex: number;
    itemsPerPage: number;
  };
  items: UasActivityItem[];
}

interface GetRecentActivityParams {
  itemsPerPage?: number;
  startIndex?: number;
  signal?: AbortSignal;
}

const transformActivityToSavedArticle = (
  item: UasActivityItem,
): SavedArticle => ({
  id: item.resourceId,
  title: item?.metaData?.title || 'Untitled',
  link:
    item?.metaData?.locatorUrl ||
    `/${item?.metaData?.service}/articles/${item.resourceId}`,
  promoImage: item?.metaData?.promoImage,
  imageAlt: item?.metaData?.promoImageAltText || '',
  imageUrl: item?.metaData?.promoImage || '',
  type: item.resourceType,
  description: `${item?.metaData?.service || 'BBC'}`,
});

export type RecentActivityData = {
  savedArticles: SavedArticle[];
  total: number;
  itemsPerPage: number;
  startIndex: number;
};

const getRecentActivity = async ({
  itemsPerPage = 10,
  startIndex = 0,
  signal,
}: GetRecentActivityParams): Promise<RecentActivityData> => {
  try {
    const response = await uasApiRequest(
      'GET',
      FAVOURITES_CONFIG.activityType,
      {
        queryParams: {
          startIndex,
          items: itemsPerPage,
          resourceDomain: FAVOURITES_CONFIG.resourceDomain,
          resourceType: FAVOURITES_CONFIG.resourceType,
          action: FAVOURITES_CONFIG.action,
        },
        signal,
      },
    );

    const data: UasActivityResponse = await response.json();

    const { items: allItems } = data;

    const savedArticles = allItems.map(transformActivityToSavedArticle);

    return {
      savedArticles,
      total: data.total,
      itemsPerPage: data.pagination.itemsPerPage,
      startIndex: data.pagination.startIndex,
    };
  } catch (error) {
    logger.error(UAS_API_ERROR, {
      error: error instanceof Error ? error.message : 'Unknown error',
    });

    throw error;
  }
};

export default getRecentActivity;
