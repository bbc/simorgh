import { use } from 'react';
import { useQuery } from '@tanstack/react-query';
import uasApiRequest from '#app/lib/uasApi';
import { buildGlobalId, type ActivityType } from '#app/lib/uasApi/uasUtility';
import { HTTP_NO_CONTENT } from '#app/lib/statusCodes.const';
import { AccountContext } from '#app/contexts/AccountContext';

interface UseUASStatusHookConfig {
  activityType: ActivityType;
  resourceDomain: string;
  resourceType: string;
}

interface UseUASStatusHookParams<StatusField extends string> {
  resourceId: string;
  config: UseUASStatusHookConfig;
  queryKeyFn: (hashedUserId: string, resourceId: string) => unknown[];
  statusField: StatusField;
  enabledFn: (resourceId: string, hashedUserId: string) => boolean;
}

type UseUASStatusHookReturn<StatusField extends string> = Record<
  StatusField,
  boolean
> & {
  isLoading: boolean;
  error: Error | null;
  metadata?: Record<string, unknown>;
};

enum UASStatusField {
  SAVED = 'isSaved',
  FOLLOWED = 'isFollowed',
}

/**
 * Generic UAS status hook used by feature-specific hooks (e.g. useUASFetchSaveStatus, useTopicFollowStatus).
 *
 * It performs a UAS GET request for a resource and returns a standard status shape containing:
 * - a dynamic status field (`isSaved` / `isFollowed`)
 * - loading and error state from React Query
 * - optional metadata returned by UAS
 *
 * @param params.resourceId - Resource identifier (articleId, topicId, etc.)
 * @param params.config - UAS activity configuration (activity type, resource domain/type)
 * @param params.queryKeyFn - Function to build the React Query cache key
 * @param params.statusField - Name of the boolean status field to return
 * @param params.enabledFn - Predicate controlling whether the query should run
 * @returns Status object keyed by `statusField`, plus `isLoading`, `error`, and optional `metadata`
 */
const useUASStatusHook = <StatusField extends string>(
  params: UseUASStatusHookParams<StatusField>,
): UseUASStatusHookReturn<StatusField> => {
  const { resourceId, config, queryKeyFn, statusField, enabledFn } = params;
  const { hashedUserId = '', isRefreshAvailable } = use(AccountContext);

  const isEnabled = enabledFn(resourceId, hashedUserId);

  const {
    data = {
      [statusField]: false,
      metadata: undefined,
    },
    isLoading,
    error,
  } = useQuery({
    queryKey: queryKeyFn(hashedUserId, resourceId),
    queryFn: async () => {
      const globalId = buildGlobalId(
        resourceId,
        config.resourceDomain,
        config.resourceType,
      );

      const response = await uasApiRequest('GET', config.activityType, {
        globalId,
        isRefreshAvailable,
      });

      if (!response.ok || response.status === HTTP_NO_CONTENT) {
        return { [statusField]: false };
      }

      try {
        const responseData = (await response.json()) as {
          metaData?: Record<string, unknown>;
        };

        return {
          [statusField]: true,
          metadata: responseData.metaData,
        };
      } catch {
        return {
          [statusField]: true,
          metadata: undefined,
        };
      }
    },
    enabled: isEnabled,
  });

  return {
    [statusField]: data[statusField] as boolean,
    isLoading,
    error: error as Error | null,
    metadata: data.metadata,
  } as UseUASStatusHookReturn<StatusField>;
};

export { UASStatusField };
export default useUASStatusHook;
