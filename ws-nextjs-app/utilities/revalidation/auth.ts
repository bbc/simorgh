import { NextApiRequest } from 'next';

const parseHeaderToken = (authorizationHeader?: string) => {
  if (!authorizationHeader) {
    return null;
  }

  const [scheme, token] = authorizationHeader.split(' ');

  if (scheme?.toLowerCase() !== 'bearer' || !token) {
    return null;
  }

  return token;
};

const parseQueryToken = (querySecret: string | string[] | undefined) => {
  if (Array.isArray(querySecret)) {
    return querySecret[0] || null;
  }

  return querySecret || null;
};

export const getRevalidationToken = (req: NextApiRequest) => {
  const headerToken = parseHeaderToken(req.headers.authorization);

  if (headerToken) {
    return headerToken;
  }

  return parseQueryToken(req.query.secret);
};

export const isRevalidationAuthorized = (req: NextApiRequest) => {
  const configuredToken = process.env.SIMORGH_ISR_REVALIDATE_SECRET;

  if (!configuredToken) {
    return false;
  }

  return getRevalidationToken(req) === configuredToken;
};
