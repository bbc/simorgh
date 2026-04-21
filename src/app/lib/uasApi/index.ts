import isLive from '#app/lib/utilities/isLive';
import getAuthHeaders from './getAuthHeaders';
import type { ActivityType } from './uasUtility';
import { refreshTokensIfExpired } from './tokenRefresh/tokenManager';

export type UasMethod = 'POST' | 'DELETE' | 'GET';

export interface UasApiRequestBody {
  activityType: ActivityType;
  resourceDomain?: string;
  resourceType?: string;
  resourceId?: string;
  action?: string;
  actionContext?: string;
  metaData?: Record<string, unknown>;
  activityTime?: string;
}

interface UasRequestOptions {
  body?: UasApiRequestBody;
  globalId?: string;
  signal?: AbortSignal;
}

const getUasHost = () =>
  isLive() ? 'activity.api.bbc.com' : 'activity.test.api.bbc.com';

const buildUrl = (activityType: string, globalId?: string) => {
  const base = `https://${getUasHost()}/my/${activityType}`;
  return globalId ? `${base}/${encodeURIComponent(globalId)}` : base;
};

const validateRequest = (method: UasMethod, options: UasRequestOptions) => {
  const { body, globalId } = options;

  if (method === 'DELETE' && !globalId) {
    throw new Error('globalId required for DELETE');
  }

  if (method === 'POST' && !body) {
    throw new Error('POST requests require a body');
  }
  // TODO : Add more validation , if needed
};

const uasApiRequest = async (
  method: UasMethod,
  activityType: ActivityType,
  { body, globalId, signal }: UasRequestOptions = {},
): Promise<Response> => {
  validateRequest(method, { body, globalId });

  const url = buildUrl(activityType, method !== 'POST' ? globalId : undefined);

  await refreshTokensIfExpired();

  const headers: HeadersInit = {
    ...getAuthHeaders(),
  };

  if (method === 'POST') {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(url, {
    method,
    headers,
    credentials: 'include',
    body: method === 'POST' ? JSON.stringify(body) : undefined,
    // Allow callers to abort the request
    ...(signal ? { signal } : {}),
  });

  if (!response.ok) {
    throw new Error(`UAS request failed with status ${response.status}`);
  }

  return response;
};

export default uasApiRequest;
