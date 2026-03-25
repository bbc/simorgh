/* eslint-disable import/prefer-default-export */
import fs from 'node:fs/promises';
import path from 'path';
import { PageTypes, Services } from '#app/models/types/global';
import { NextApiRequest, NextApiResponse } from 'next';

type RequestPathParts = {
  service: Services;
  pageType: PageTypes;
  id: string;
  optionalParams?: string[];
};

const oneTimeFailureTarget = {
  service: 'pidgin' as Services,
  pageType: 'live' as PageTypes,
  id: 'c7p765ynk9qt',
};

const simulated500ResponseCount = 2;
let simulated500ResponsesServed = 0;

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
    const requestPathParts = req.query as RequestPathParts;

    const isConfiguredFailureRequest =
      requestPathParts.service === oneTimeFailureTarget.service &&
      requestPathParts.pageType === oneTimeFailureTarget.pageType &&
      requestPathParts.id === oneTimeFailureTarget.id;

    if (
      isConfiguredFailureRequest &&
      simulated500ResponsesServed < simulated500ResponseCount
    ) {
      simulated500ResponsesServed += 1;

      return res.status(500).send({ error: 'Simulated error for this asset' });
    }

    const dataFilePath = constructDataFilePath(requestPathParts);
    const pageData = await fs.readFile(dataFilePath, {
      encoding: 'utf8',
    });

    return res.status(200).send(pageData);
  } catch (error) {
    return res.status(404).send({ error: `Data not found. ${error}` });
  }
}
