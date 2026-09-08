import isLive from '#app/lib/utilities/isLive';
import type { Services } from '#app/models/types/global';
import getAuthHeaders from './getAuthHeaders';
import type { ActivityType } from './uasUtility';
import { refreshTokensIfExpired } from './tokenRefresh/tokenManager';
import UasError, { type UasErrorBody } from './errors';

export { default as UasError } from './errors';

export type UasMethod = 'POST' | 'DELETE' | 'GET';

export interface UasApiRequestBody {
  activityType: ActivityType;
  resourceDomain?: string;
  resourceType?: string;
  resourceId?: string;
  action?: string;
  actionContext?: string;
  resourceTitle?: Services;
  metaData?: Record<string, unknown>;
  activityTime?: string;
}

interface UasRequestOptions {
  body?: UasApiRequestBody;
  globalId?: string;
  signal?: AbortSignal;
  queryParams?: Record<string, string | number>;
  isRefreshAvailable: boolean;
}

export const UAS_CLIENT_TIMEOUT_MS = 10000;

const getUasHost = () =>
  isLive() ? 'activity.api.bbc.com' : 'activity.test.api.bbc.com';

const buildUrl = (
  activityType: string,
  globalId?: string,
  queryParams?: Record<string, string | number>,
) => {
  const base = `https://${getUasHost()}/my/${activityType}`;
  const urlPath = globalId ? `${base}/${encodeURIComponent(globalId)}` : base;

  if (!queryParams || Object.keys(queryParams).length === 0) {
    return urlPath;
  }

  const url = new URL(urlPath);
  Object.entries(queryParams).forEach(([key, value]) => {
    url.searchParams.append(key, String(value));
  });

  return url.toString();
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

// UAS returns JSON ({ key, message }) for some errors and a plain-text string
// for others, so we read the raw text and only parse JSON when possible.
const parseUasErrorBody = async (
  response: Response,
): Promise<UasErrorBody | undefined> => {
  const text = await Promise.resolve()
    .then(() => response.clone().text())
    .catch(() => undefined);

  const trimmedText = text?.trim();

  if (!trimmedText) return undefined;

  try {
    return JSON.parse(trimmedText) as UasErrorBody;
  } catch {
    return { message: trimmedText };
  }
};

const uasApiRequest = async (
  method: UasMethod,
  activityType: ActivityType,
  {
    body,
    globalId,
    signal,
    queryParams,
    isRefreshAvailable,
  }: UasRequestOptions,
): Promise<Response> => {
  // Basic validation to ensure required parameters are present based on method
  validateRequest(method, { body, globalId, isRefreshAvailable });

  const url = buildUrl(
    activityType,
    method !== 'POST' ? globalId : undefined,
    queryParams,
  );

  await refreshTokensIfExpired(isRefreshAvailable);

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
    // signal: signal ?? AbortSignal.timeout(UAS_CLIENT_TIMEOUT_MS),
  });

  if (!response.ok) {
    const errorBody = await parseUasErrorBody(response);
    throw new UasError(response.status, errorBody);
  }

  return response;
};

export default uasApiRequest;

const error1 = {
  activityType: 'favourites1',
  resourceDomain: 'world-service-news1',
  resourceType: 'article',
  resourceId: 'cj94erzl8e8o',
  action: 'favourited',
  resourceTitle: 'hindi',
};
