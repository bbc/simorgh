import { GetServerSidePropsContext } from 'next';
import extractHeaders from '#server/utilities/extractHeaders';
import { AV_EMBEDS } from '#app/routes/utils/pageTypes';
import fetchPageData from '#app/routes/utils/fetchPageData';
import certsRequired from '#app/routes/utils/certsRequired';
import getEnvironment from '#app/routes/utils/getEnvironment';
import { FetchError } from '#app/models/types/fetch';
import { OptimoBlock } from '#app/models/types/optimo';
import parseAvRoute from './parseAvRoute';
import getAgent from '../../../utilities/undiciAgent';

export default async (context: GetServerSidePropsContext) => {
  const {
    resolvedUrl,
    req: { headers: reqHeaders },
  } = context;

  let pageStatus = 200;
  let pageJson;

  const env = getEnvironment(resolvedUrl);
  const agent = certsRequired(resolvedUrl) ? await getAgent() : null;

  const parsedRoute = parseAvRoute(resolvedUrl);

  const extension = `${parsedRoute.service ?? ''}${parsedRoute.variant ? `/${parsedRoute.variant}` : ''}/${parsedRoute.assetId}`;

  const { TEST_API } = process.env;

  const path = `${TEST_API}/article/${extension}`;
  const optHeaders = { 'ctx-service-env': env };

  if (TEST_API) {
    try {
      // @ts-expect-error Due to jsdoc inference, and no TS within fetchPageData
      const { status, json } = await fetchPageData({
        path,
        agent,
        optHeaders,
      });

      pageStatus = status;
      pageJson = json;
    } catch (error) {
      const { status } = error as FetchError;

      pageStatus = status;
    }
  }

  const mediaBlock = pageJson?.content?.model?.blocks?.find(
    (block: OptimoBlock) => ['video', 'audio'].includes(block.type),
  )?.model?.blocks;

  // Determine actual service and variant (if applicable) from either the parsed route or the data returned from the fetch for the media data from BFF
  // We should always have a service to be able to display a 404 page if needed
  const service = parsedRoute?.service ?? 'news';
  const variant = parsedRoute?.variant ?? null;

  context.res.statusCode = pageStatus;

  return {
    props: {
      bbcOrigin: reqHeaders['bbc-origin'] || null,
      isNextJs: true,
      isAvEmbeds: true,
      pageData: parsedRoute
        ? {
            input: resolvedUrl,
            output: parsedRoute,
            mediaBlock: mediaBlock ?? null,
            metadata: { type: AV_EMBEDS },
          }
        : null,
      pageType: AV_EMBEDS,
      service,
      variant,
      status: pageStatus,
      ...extractHeaders(reqHeaders),
    },
  };
};
