import fs from 'node:fs/promises';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';
import { PageTypes, Services } from '#app/models/types/global';

type RequestPathParts = {
  service: Services;
  pageType: PageTypes;
  id: string;
  optionalParams?: string[];
};

const constructDataFilePath = ({
  service,
  pageType,
  id,
  optionalParams,
}: RequestPathParts) => {
  return optionalParams && optionalParams.length > 0
    ? path.join(
        process.cwd(),
        '..',
        'data',
        service,
        pageType as string,
        id,
        `${optionalParams.join('/')}.json`,
      )
    : path.join(
        process.cwd(),
        '..',
        'data',
        service,
        pageType as string,
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
