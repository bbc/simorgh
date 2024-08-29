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
import buildAvEmbedURL from '../../../utilities/buildAvEmbedUrl';
import getAgent from '../../../utilities/undiciAgent';

export default async (context: GetServerSidePropsContext) => {
  const {
    resolvedUrl,
    req: { headers: reqHeaders },
  } = context;

  let pageStatus;
  let pageJson;

  // Remove x-frame-options header to allow embedding
  context.res.removeHeader('x-frame-options');

  const parsedRoute = parseAvRoute(resolvedUrl);

  if (parsedRoute.isWsRoute) {
    context.res.setHeader(
      'Cache-Control',
      'public, stale-if-error=90, stale-while-revalidate=30, max-age=30',
    );
  } else {
    context.res.setHeader(
      'Cache-Control',
      'private, stale-if-error=90, stale-while-revalidate=30, max-age=0, must-revalidate',
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

  const mediaURL =
    buildAvEmbedURL({
      assetId: parsedRoute.assetId,
      mediaDelimiter: parsedRoute.mediaDelimiter,
      mediaId: parsedRoute.mediaId,
      service,
      variant,
    }) ?? null;

  return {
    props: {
      isNextJs: true,
      isAvEmbeds: true,
      pageData: avEmbed
        ? {
            mediaBlock: avEmbed?.content?.model?.blocks ?? null,
            metadata: {
              caption,
              headline,
              imageUrl,
              language,
              mediaURL,
              promoSummary,
              type: AV_EMBEDS,
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
