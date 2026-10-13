import nodeLogger from '#lib/logger.node';
import type { Services } from '#app/models/types/global';
import { UAS_API_ERROR } from '../logger.const';
import uasApiRequest from './index';
import { FOLLOWS_CONFIG } from './uasUtility';

const logger = nodeLogger(__filename);

export interface FollowedTopic {
  id: string;
  title: string;
  service?: string;
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
  service?: Services;
}

const transformFollowToTopic = (item: UasFollowItem): FollowedTopic => ({
  id: item.resourceId,
  title: item.metaData?.title ?? '',
  service: item.metaData?.service,
});

const hasRenderableMetadata = (item: UasFollowItem): boolean =>
  Boolean(item.resourceId && item.metaData?.title);

const belongsToService = (item: UasFollowItem, service?: Services): boolean => {
  if (!service) return true;

  return item.metaData?.service?.toLowerCase() === service.toLowerCase();
};

interface SafeFollowsResponse {
  items: UasFollowItem[];
  pagination?: UasFollowsResponse['pagination'];
}

const isUasFollowItem = (item: unknown): item is UasFollowItem =>
  typeof item === 'object' && item !== null;

const toSafeFollowsResponse = (data: unknown): SafeFollowsResponse => {
  const body =
    typeof data === 'object' && data !== null
      ? (data as Partial<UasFollowsResponse>)
      : {};

  return {
    items: Array.isArray(body.items) ? body.items.filter(isUasFollowItem) : [],
    pagination: body.pagination,
  };
};

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
  service,
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

    const data: unknown = await response.json();
    const { items, pagination } = toSafeFollowsResponse(data);

    const followedTopics = items
      .filter(hasRenderableMetadata)
      .filter(item => belongsToService(item, service))
      .map(transformFollowToTopic);

    return {
      followedTopics,
      total: followedTopics.length,
      itemsPerPage: pagination?.itemsPerPage ?? itemsPerPage,
      startIndex: pagination?.startIndex ?? startIndex,
    };
  } catch (error) {
    logger.error(UAS_API_ERROR, {
      error: error instanceof Error ? error.message : 'Unknown error',
    });

    throw error;
  }
};

export default getFollowedTopics;
