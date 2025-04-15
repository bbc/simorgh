import { GetServerSidePropsContext } from 'next';
import extractHeaders from '#server/utilities/extractHeaders';
import { AV_EMBEDS } from '#app/routes/utils/pageTypes';
import fetchPageData from '#app/routes/utils/fetchPageData';
import certsRequired from '#app/routes/utils/certsRequired';
import getEnvironment from '#app/routes/utils/getEnvironment';
import { FetchError } from '#app/models/types/fetch';
import constructPageFetchUrl from '#app/routes/utils/constructPageFetchUrl';
import parseAvRoute from '#app/routes/utils/parseAvRoute';
import filterForBlockType from '#app/lib/utilities/blockHandlers';
import nodeLogger from '#lib/logger.node';
import { OK } from '#app/lib/statusCodes.const';
import { BFF_FETCH_ERROR, ROUTING_INFORMATION } from '#app/lib/logger.const';
import sendCustomMetric from '#server/utilities/customMetrics';
import { NON_200_RESPONSE } from '#server/utilities/customMetrics/metrics.const';
import getAgent from '#server/utilities/getAgent';

const logger = nodeLogger(__filename);

export default async (context: GetServerSidePropsContext) => {
  const {
    resolvedUrl,
    req: { headers: reqHeaders },
  } = context;

  let pageStatus;
  let pageJson;

  // Set x-robots-tag header to prevent search engine indexing
  context.res.setHeader('x-robots-tag', 'noindex');

  context.res.setHeader(
    'Cache-Control',
    'public, stale-if-error=90, stale-while-revalidate=30, max-age=30',
  );

  // Remove x-frame-options header to allow embedding
  context.res.removeHeader('x-frame-options');

  const parsedRoute = parseAvRoute(resolvedUrl);

  const avEmbedsUrl = constructPageFetchUrl({
    pageType: AV_EMBEDS,
    pathname: resolvedUrl,
    mediaId: parsedRoute.mediaId,
    lang: parsedRoute.lang,
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
    const { message, status } = error as FetchError;
    sendCustomMetric({
      metricName: NON_200_RESPONSE,
      statusCode: status,
      pageType: AV_EMBEDS,
      requestUrl: resolvedUrl,
    });

    logger.error(BFF_FETCH_ERROR, {
      status,
      message,
      pathname: path,
    });
    pageStatus = status;
  }

  context.res.statusCode = pageStatus;
  const { data: { avEmbed } = { avEmbed: null } } = pageJson ?? {};

  const service = avEmbed?.metadata?.service ?? 'news';
  const variant = avEmbed?.metadata?.variant ?? null;
  const language = avEmbed?.metadata?.language ?? 'en-GB';
  const promo = avEmbed?.promo ?? null;

  const promoSummary =
    promo?.summary?.blocks?.[0]?.model?.blocks?.[0]?.model?.blocks?.[0]?.model
      ?.text ?? null;

  const headline = promo?.headlines?.seoHeadline ?? null;

  const aresMediaBlock = filterForBlockType(
    avEmbed?.content?.model?.blocks,
    'aresMedia',
  );

  const aresMediaMetadata = filterForBlockType(
    aresMediaBlock?.model?.blocks,
    'aresMediaMetadata',
  );

  const captionBlock = filterForBlockType(
    aresMediaBlock?.model?.blocks,
    'captionText',
  );

  const { imageUrl = null } = aresMediaMetadata?.model ?? {};

  const { caption = null } = captionBlock?.model ?? {};

  let routingInfoLogger = logger.debug;

  if (pageStatus !== OK) {
    routingInfoLogger = logger.error;
  }

  routingInfoLogger(ROUTING_INFORMATION, {
    url: context.resolvedUrl,
    status: pageStatus,
    pageType: AV_EMBEDS,
  });

  return {
    props: {
      id: resolvedUrl,
      isNextJs: true,
      isAvEmbeds: true,
      pageData: avEmbed
        ? {
            mediaBlock: avEmbed?.content?.model?.blocks ?? null,
            metadata: {
              atiAnalytics: avEmbed?.metadata?.atiAnalytics ?? null,
              caption,
              headline,
              imageUrl,
              language,
              promoSummary,
              type: AV_EMBEDS,
            },
            embedded: true,
          }
        : null,
      pageType: AV_EMBEDS,
      pathname: resolvedUrl,
      service,
      status: pageStatus,
      variant,
      ...extractHeaders(reqHeaders),
    },
  };
};
