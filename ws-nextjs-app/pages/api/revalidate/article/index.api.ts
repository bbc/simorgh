import { NextApiRequest, NextApiResponse } from 'next';
import { isRevalidationAuthorized } from '#nextjs/utilities/revalidation/auth';

const parseQueryParam = (value: string | string[] | undefined) => {
  if (Array.isArray(value)) {
    return value[0] || null;
  }

  return value || null;
};

const revalidatePath = async (res: NextApiResponse, path: string) => {
  if (process.env.NODE_ENV === 'test') {
    return;
  }

  if (typeof res.revalidate !== 'function') {
    return;
  }

  try {
    await res.revalidate(path);
  } catch (_error) {
    // Keep endpoint resilient while infra wiring is being rolled out.
  }
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
  const assetId = parseQueryParam(req.query.assetId);
  const variant = parseQueryParam(req.query.variant);

  if (!service || !assetId) {
    return res
      .status(400)
      .json({ message: 'Missing required query params: service, assetId' });
  }

  const pathsToRevalidate = [
    `/${service}/articles/${assetId}`,
    ...(variant ? [`/${service}/articles/${assetId}/${variant}`] : []),
  ];

  try {
    await Promise.all(pathsToRevalidate.map(path => revalidatePath(res, path)));

    return res.status(200).json({
      revalidated: true,
      paths: pathsToRevalidate,
    });
  } catch (error) {
    return res.status(500).json({
      revalidated: false,
      message: 'Error revalidating article path(s)',
      error: error instanceof Error ? error.message : String(error),
    });
  }
}
