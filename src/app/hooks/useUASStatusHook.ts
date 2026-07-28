import { use } from 'react';
import { useQuery } from '@tanstack/react-query';
import uasApiRequest from '#app/lib/uasApi';
import { buildGlobalId, type ActivityType } from '#app/lib/uasApi/uasUtility';
import { HTTP_NO_CONTENT } from '#app/lib/statusCodes.const';
import { AccountContext } from '#app/contexts/AccountContext';

/**
 * Generic factory for creating UAS "status" fetch hooks (e.g., isSaved, isFollowed).
 * Handles all boilerplate: GET request, response parsing, query setup, error handling.
 *
 * Usage:
 * const useMyStatus = useUASStatusHook({
 *   config: MY_CONFIG,
 *   queryKeyFn: (userId, id) => uasKeys.myStatus(userId, id),
 *   statusField: 'isSaved',
 * });
 */

interface UseUASStatusHookConfig {
  activityType: ActivityType;
  resourceDomain: string;
  resourceType: string;
}

interface UseUASStatusHookParams<StatusField extends string> {
  config: UseUASStatusHookConfig;
  queryKeyFn: (hashedUserId: string, resourceId: string) => unknown[];
  statusField: StatusField;
  enabledFn?: (resourceId: string, hashedUserId: string) => boolean;
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
 * Factory function that creates a UAS status fetch hook.
 * Returns a hook function that accepts a resourceId parameter.
 *
 * Example usage:
 * const useMyStatus = useUASStatusHook(params);
 * const status = useMyStatus(id);
 */
const useUASStatusHook = <StatusField extends string>(
  params: UseUASStatusHookParams<StatusField>,
): ((resourceId: string) => UseUASStatusHookReturn<StatusField>) => {
  const { config, queryKeyFn, statusField, enabledFn } = params;

  return (resourceId: string): UseUASStatusHookReturn<StatusField> => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { hashedUserId = '', isRefreshAvailable } = use(AccountContext);

    const isEnabled = enabledFn
      ? enabledFn(resourceId, hashedUserId)
      : !!resourceId && !!hashedUserId;

    const {
      data = {
        [statusField]: false,
        metadata: undefined,
      },
      isLoading,
      error,
      // eslint-disable-next-line react-hooks/rules-of-hooks
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
};
export { UASStatusField };
export default useUASStatusHook;
