import nodeLogger from '#lib/logger.node';
import { UAS_API_ERROR } from '../logger.const';
import uasApiRequest from './index';
import { FOLLOWS_CONFIG } from './uasUtility';

const logger = nodeLogger(__filename);

export interface FollowedTopic {
  id: string;
  title: string;
  link: string;
  description?: string;
  service?: string;
  type: string;
}

export interface UasFollowItem {
  activityType: string;
  resourceId: string;
  resourceType: string;
  resourceDomain: string;
  created: string;
  action: string;
  metaData?: {
    service?: string;
    topicId?: string;
    title?: string;
    description?: string;
    locatorUrl?: string;
  };
  '@id': string;
}

export interface UasFollowsResponse {
  total: number;
  pagination: {
    startIndex: number;
    itemsPerPage: number;
  };
  items: UasFollowItem[];
}

interface GetFollowedTopicsParams {
  itemsPerPage?: number;
  startIndex?: number;
  signal?: AbortSignal;
  isRefreshAvailable: boolean;
}

const transformFollowToTopic = (item: UasFollowItem): FollowedTopic => ({
  id: item.resourceId,
  title: item?.metaData?.title || '',
  link: item?.metaData?.locatorUrl || '',
  description: item?.metaData?.description,
  service: item?.metaData?.service,
  type: item.resourceType,
});

export type FollowedTopicsData = {
  followedTopics: FollowedTopic[];
  total: number;
  itemsPerPage: number;
  startIndex: number;
};

const getFollowedTopics = async ({
  itemsPerPage = 10,
  startIndex = 0,
  signal,
  isRefreshAvailable,
}: GetFollowedTopicsParams): Promise<FollowedTopicsData> => {
  try {
    const response = await uasApiRequest('GET', FOLLOWS_CONFIG.activityType, {
      queryParams: {
        startIndex,
        items: itemsPerPage,
        resourceDomain: FOLLOWS_CONFIG.resourceDomain,
        resourceType: FOLLOWS_CONFIG.resourceType,
        action: FOLLOWS_CONFIG.action,
      },
      signal,
      isRefreshAvailable,
    });

    const data: UasFollowsResponse = await response.json();

    const { items: allItems } = data;

    const followedTopics = allItems
      .filter(item => item.metaData != null)
      .map(transformFollowToTopic);

    return {
      followedTopics,
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

export default getFollowedTopics;
