import nodeLogger from '#lib/logger.node';
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
}

const transformFollowToTopic = (item: UasFollowItem): FollowedTopic => ({
  id: item.resourceId,
  title: item.metaData?.title ?? '',
  service: item.metaData?.service,
});

// A topic with no title can't be rendered meaningfully, so treat it as malformed
const hasRenderableMetadata = (item: UasFollowItem): boolean =>
  Boolean(item.resourceId && item.metaData?.title);

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

    const data: Partial<UasFollowsResponse> = await response.json();
    const { items = [], total = 0, pagination } = data;

    const followedTopics = items
      .filter(hasRenderableMetadata)
      .map(transformFollowToTopic);

    return {
      followedTopics,
      total,
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
