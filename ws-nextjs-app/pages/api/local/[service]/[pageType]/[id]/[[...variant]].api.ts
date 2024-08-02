import fs from 'node:fs/promises';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';

type RequestPathParts = {
  service: string;
  pageType: string;
  id: string;
  variant?: string[];
};

const getFixtureLocation = (pageType: string) =>
  ({
    live: 'livePage',
    send: 'send',
  })[pageType];

const constructDataFilePath = ({
  service,
  pageType,
  id,
  variant = [],
}: RequestPathParts) => {
  if (variant && variant.length > 1) {
    throw new Error('Invalid file path.');
  }

  const [variantName] = variant;
  return variantName
    ? path.join(
        process.cwd(),
        '..',
        'data',
        service,
        getFixtureLocation(pageType) as string,
        id,
        `${variantName}.json`,
      )
    : path.join(
        process.cwd(),
        '..',
        'data',
        service,
        getFixtureLocation(pageType as string) as string,
        `${id}.json`,
      );
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const dataFilePath = constructDataFilePath(req.query as RequestPathParts);
    const pageData = await fs.readFile(dataFilePath, {
      encoding: 'utf8',
    });
    res.status(200).send(pageData);
  } catch (error) {
    res.status(500).send({ error: `Failed to load data. ${error}` });
  }
}
