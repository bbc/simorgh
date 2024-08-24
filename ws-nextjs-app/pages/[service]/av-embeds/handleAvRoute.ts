import { GetServerSidePropsContext } from 'next';
import extractHeaders from '#server/utilities/extractHeaders';
import { AV_EMBEDS } from '#app/routes/utils/pageTypes';
import fetchPageData from '#app/routes/utils/fetchPageData';
import certsRequired from '#app/routes/utils/certsRequired';
import getEnvironment from '#app/routes/utils/getEnvironment';
import { FetchError } from '#app/models/types/fetch';
import constructPageFetchUrl from '#app/routes/utils/constructPageFetchUrl';
import parseAvRoute from '#app/routes/utils/parseAvRoute';
import getAgent from '../../../utilities/undiciAgent';

export default async (context: GetServerSidePropsContext) => {
  const {
    resolvedUrl,
    req: { headers: reqHeaders },
  } = context;

  let pageStatus;
  let pageJson;

  const parsedRoute = parseAvRoute(resolvedUrl);

  if (parsedRoute.isSyndicationRoute) {
    context.res.setHeader(
      'Cache-Control',
      'private, stale-if-error=90, stale-while-revalidate=30, max-age=0, must-revalidate',
    );
  } else {
    context.res.setHeader(
      'Cache-Control',
      'public, stale-if-error=90, stale-while-revalidate=30, max-age=30',
    );
  }

  const avEmbedsUrl = constructPageFetchUrl({
    pageType: AV_EMBEDS,
    pathname: resolvedUrl,
    mediaId: parsedRoute.mediaId,
  });

  const env = getEnvironment(resolvedUrl);
  const agent = certsRequired(resolvedUrl) ? await getAgent() : null;

  const path = avEmbedsUrl.toString();

  const optHeaders = { 'ctx-service-env': env };

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

  const { data: { avEmbed } = { avEmbed: null } } = pageJson ?? {};

  const service = avEmbed?.metadata?.service ?? 'news';
  const variant = avEmbed?.metadata?.variant ?? null;

  context.res.statusCode = pageStatus;

  return {
    props: {
      isNextJs: true,
      isAvEmbeds: true,
      pageData: avEmbed
        ? {
            ...avEmbed,
            mediaBlock: avEmbed?.content?.model?.blocks ?? null,
            metadata: {
              ...avEmbed?.metadata,
              assetId: parsedRoute.assetId,
              mediaId: parsedRoute.mediaId,
              mediaDelimiter: parsedRoute.mediaDelimiter,
              service,
              type: AV_EMBEDS,
              variant,
            },
          }
        : null,
      pageType: AV_EMBEDS,
      service,
      status: pageStatus,
      variant,
      ...extractHeaders(reqHeaders),
    },
  };
};
