import { NextApiRequest, NextApiResponse } from 'next';
import { isRevalidationAuthorized } from '#nextjs/utilities/revalidation/auth';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cacheHandler = require('../../../../cache-handler');

const parseQueryParam = (value: string | string[] | undefined) => {
  if (Array.isArray(value)) {
    return value[0] || null;
  }

  return value || null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  if (!isRevalidationAuthorized(req)) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  const service = parseQueryParam(req.query.service);

  if (!service) {
    return res
      .status(400)
      .json({ message: 'Missing required query param: service' });
  }

  try {
    if (typeof cacheHandler.invalidateServiceArticleCache !== 'function') {
      return res.status(500).json({
        invalidated: false,
        service,
        message:
          'Service invalidation is not available on current cache handler',
      });
    }

    const invalidationResult =
      (await cacheHandler.invalidateServiceArticleCache(service)) as {
        invalidatedEntries: number;
        service: string;
      };

    return res.status(200).json({
      invalidated: true,
      service,
      invalidatedEntries: invalidationResult.invalidatedEntries,
    });
  } catch (error) {
    return res.status(500).json({
      invalidated: false,
      service,
      message: 'Error invalidating service article paths',
      error: error instanceof Error ? error.message : String(error),
    });
  }
}
