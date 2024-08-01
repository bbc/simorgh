import fs from 'node:fs/promises';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';

const getFixtureLocation = (pageType: string) =>
  ({
    live: 'livePage',
    send: 'send',
  })[pageType];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { service, pageType, id } = req.query;

    console.log('\n\n');
    console.log('###########################');
    console.log(req);
    console.log(service);
    console.log(pageType);
    console.log(id);
    console.log('###########################');
    console.log('\n\n');

    const dataFilePath = path.join(
      process.cwd(),
      '..',
      'data',
      service as string,
      getFixtureLocation(pageType as string) as string,
      `${id}.json`,
    );
    const pageData = await fs.readFile(dataFilePath, {
      encoding: 'utf8',
    });
    res.status(200).send(pageData);
  } catch (error) {
    res.status(500).send({ error: `Failed to load data. ${error}` });
  }
}
