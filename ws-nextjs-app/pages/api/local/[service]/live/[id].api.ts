import fs from 'node:fs/promises';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { service, id } = req.query;
    const dataFilePath = path.join(
      process.cwd(),
      '..',
      'data',
      service as string,
      'livePage',
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
