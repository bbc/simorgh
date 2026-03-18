import isLive from '#app/lib/utilities/isLive';
import getAuthHeaders from './getAuthHeader';
import activityTypes from './activityTypes';

export type UasMethod = 'POST' | 'DELETE' | 'GET';

export interface UasApiRequestBody {
  activityType: string;
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
}

const getUasHost = () =>
  isLive() ? 'activity.api.bbc.co.uk' : 'activity.test.api.bbc.co.uk';

const buildUrl = (activityType: string, globalId?: string) => {
  const base = `https://${getUasHost()}/my/${activityType}`;
  return globalId ? `${base}/${encodeURIComponent(globalId)}` : base;
};

const validateRequest = (
  method: UasMethod,
  options: UasRequestOptions,
  activityType: string,
) => {
  const { body, globalId } = options;

  if (method === 'DELETE' && !globalId) {
    throw new Error('globalId required for DELETE');
  }

  if (method === 'POST' && !body) {
    throw new Error('POST requests require a body');
  }

  if (!activityType || !activityTypes.includes(activityType)) {
    throw new Error('Invalid activity type');
  }
  // TODO : Add more validation , if needed
};

const uasApiRequest = async (
  method: UasMethod,
  activityType: string,
  { body, globalId }: UasRequestOptions = {},
): Promise<Response> => {
  validateRequest(method, { body, globalId }, activityType);

  const url = buildUrl(activityType, method !== 'POST' ? globalId : undefined);

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
  });

  if (!response.ok) {
    throw new Error(`UAS request failed with status ${response.status}`);
  }

  return response;
};

export default uasApiRequest;
