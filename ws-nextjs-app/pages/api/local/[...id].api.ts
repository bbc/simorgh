import fs from 'node:fs/promises';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';

const getFixtureLocation = (pageType: string) =>
  ({
    live: 'livePage',
    send: 'send',
  })[pageType];

const constructDataFilePath = (dataPathId: string[]) => {
  if (dataPathId.length > 4) {
    throw new Error('Invalid file path.');
  }

  const [service, ...rest] = dataPathId;
  const [pathSegment, pathSegment2, pathSegment3] = rest;
  const pathHasVariant = ['simp', 'trad', 'cyr', 'lat'].includes(pathSegment);

  return pathHasVariant
    ? path.join(
        process.cwd(),
        '..',
        'data',
        service,
        getFixtureLocation(pathSegment2) as string,
        pathSegment3,
        `${pathSegment}.json`,
      )
    : path.join(
        process.cwd(),
        '..',
        'data',
        service,
        getFixtureLocation(pathSegment as string) as string,
        `${pathSegment2}.json`,
      );
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { id } = req.query;
    const dataFilePath = constructDataFilePath(id as string[]);
    const pageData = await fs.readFile(dataFilePath, {
      encoding: 'utf8',
    });
    res.status(200).send(pageData);
  } catch (error) {
    res.status(500).send({ error: `Failed to load data. ${error}` });
  }
}
