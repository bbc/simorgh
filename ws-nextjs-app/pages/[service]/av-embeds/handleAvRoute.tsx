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

  let pageStatus = 200;
  let pageJson;

  const parsedRoute = parseAvRoute(resolvedUrl);

  const avEmbedsUrl = constructPageFetchUrl({
    pageType: 'avEmbeds',
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

  const { data: { article } = { article: null } } = pageJson ?? {};

  const service = article?.metadata?.service ?? 'news';
  const variant = article?.metadata?.variant ?? null;

  context.res.statusCode = pageStatus;

  return {
    props: {
      bbcOrigin: reqHeaders['bbc-origin'] || null,
      isNextJs: true,
      isAvEmbeds: true,
      pageData: article
        ? {
            ...article,
            mediaBlock: article?.content?.model?.blocks ?? null,
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
