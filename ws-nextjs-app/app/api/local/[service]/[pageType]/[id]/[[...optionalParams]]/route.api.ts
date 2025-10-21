/* eslint-disable import/prefer-default-export */
import fs from 'node:fs/promises';
import path from 'path';
import { PageTypes, Services } from '#app/models/types/global';
import { FetchError } from '#app/models/types/fetch';

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

export async function GET(
  _req: Request,
  {
    params,
  }: RouteContext<'/api/local/[service]/[pageType]/[id]/[[...optionalParams]]'>,
) {
  try {
    const { ...routeParams } = await params;

    const dataFilePath = constructDataFilePath(routeParams as RequestPathParts);
    const pageData = await fs.readFile(dataFilePath, {
      encoding: 'utf8',
    });

    return Response.json(JSON.parse(pageData));
  } catch (error) {
    const { message } = error as FetchError;
    return new Response(message, { status: 404 });
  }
}
