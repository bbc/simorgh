// utilities/uasApi.ts
import Cookie from 'js-cookie';
import isLive from '#app/lib/utilities/isLive';

export type UasMethod = 'POST' | 'DELETE' | 'GET';

export interface UasApiRequestBody {
  activityType: string;
  resourceDomain?: string;
  resourceType?: string;
  resourceId?: string;
  action?: string;
  actionContext?: string;
  metaData?: Record<string, any>;
  activityTime?: string;
}

const getUasHost = () =>
  // URL can be varied based on domain , eg : .com uses bbc.com and .co.uk uses bbc.co.uk
  isLive() ? 'activity.api.bbc.co.uk' : 'activity.test.api.bbc.co.uk';

// POST /my/{activityType}
const getCreateUrl = (activityType: string) =>
  `https://${getUasHost()}/my/${activityType}`;

// DELETE /my/{activityType}/{globalId}
const getDeleteUrl = (activityType: string, globalId: string) =>
  `https://${getUasHost()}/my/${activityType}/${encodeURIComponent(globalId)}`;

// GET /my/{activityType}
const getListUrl = (activityType: string) =>
  `https://${getUasHost()}/my/${activityType}`;

const getAuthHeaders = (): Record<string, string> => {
  const cknsAtkn = Cookie.get('ckns_atkn');

  if (!cknsAtkn) return {};

  return {
    // cknsAtkn cookie value can be also passed via Cookie header as Cookie : ckns_atkn=tokenValue
    Authorization: `Bearer ${cknsAtkn}`,
    'X-Authentication-Provider': 'idv5',
    // TODO: move API key to server-side config for production .
    // This is a sandbox key and should not be used in production
    'X-API-Key': '2o7o8j33vm293',
  };
};

const uasApiRequest = async (
  method: UasMethod,
  activityType: string,
  {
    body,
    globalId,
  }: {
    body?: UasApiRequestBody;
    globalId?: string; // for DELETE
  } = {},
): Promise<Response> => {
  let url: string;

  if (method === 'POST') {
    url = getCreateUrl(activityType);
  } else if (method === 'DELETE' && globalId) {
    url = getDeleteUrl(activityType, globalId);
  } else if (method === 'GET') {
    url = getListUrl(activityType);
  } else {
    throw new Error('Invalid UAS request configuration');
  }

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...getAuthHeaders(),
  };

  const response = await fetch(url, {
    method,
    headers,
    body: method === 'POST' && body ? JSON.stringify(body) : undefined,
  });

  if (response.status !== 202 && response.status !== 200) {
    throw new Error(`UAS request failed with status ${response.status}`);
  }

  return response;
};
export default uasApiRequest;
