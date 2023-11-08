import { Agent } from 'undici';
import path from 'ramda/src/path';
import isEmpty from 'ramda/src/isEmpty';

import { DATA_FETCH_ERROR } from '#lib/logger.const';
import getRecommendationsUrl from '#app/lib/utilities/getUrlHelpers/getRecommendationsUrl';
import { SECONDARY_DATA_TIMEOUT } from '#app/lib/utilities/getFetchTimeouts';
import fetchPageData from '../../utils/fetchPageData';
import nodeLogger from '../../../lib/logger.node';
import hasArticleRecommendations from './hasArticleRecommendations';

const logger = nodeLogger(__filename);

const getRecommendationsURLs = async (assetUri: string) => {
  return [
    {
      name: 'recommendations',
      path: getRecommendationsUrl({
        assetUri,
        engine: 'unirecs_datalab',
        engineVariant: null,
      }),
      assetUri,
      api: 'recommendations',
      apiContext: 'secondary_data',
    },
  ];
};

const validateResponse = (
  { status, json }: { status: unknown; json: unknown },
  name: string,
) => {
  if (status === 200 && !isEmpty(json)) {
    return { [name]: json };
  }

  return null;
};

const fetchUrl =
  (agent: Agent) =>
  async ({
    name,
    path: urlPath,
    ...loggerArgs
  }: {
    name: string;
    path: string;
  }) => {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore - Ignore fetchPageData argument types
      return fetchPageData({
        path: urlPath,
        timeout: SECONDARY_DATA_TIMEOUT,
        agent,
        ...loggerArgs,
      }).then(response => validateResponse(response, name));
    } catch (error) {
      logger.error(DATA_FETCH_ERROR, {
        data: path,
        path,
        ...loggerArgs,
      });

      return null;
    }
  };

const getOnwardsPageData = async ({
  pathname,
  service,
  variant,
  isAdvertising,
  isArticleSfv = false,
  agent,
}: {
  pathname: string;
  service: string;
  variant?: string;
  isAdvertising: boolean;
  isArticleSfv?: boolean;
  agent: Agent | null;
}) => {
  const recommendationsAllowed = await hasArticleRecommendations(
    service,
    isAdvertising,
    variant,
  );

  if (!recommendationsAllowed || agent == null || isArticleSfv) return {};

  const removeAmpAndRenderSuffixes = /(\.|\?).*/g;
  const urlsToFetch = await getRecommendationsURLs(
    pathname.replace(removeAmpAndRenderSuffixes, ''),
  );
  const fetchURLFunction = fetchUrl(agent);
  return Promise.all(urlsToFetch.map(fetchURLFunction)).then(results =>
    Object.assign({}, ...results),
  );
};

export default getOnwardsPageData;
