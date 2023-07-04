/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Agent } from 'https';
import getEnvironment from '#app/routes/utils/getEnvironment';
import nodeLogger from '../../../lib/logger.node';
import { BFF_FETCH_ERROR } from '../../../lib/logger.const';
import fetchPageData from '../../utils/fetchPageData';
import constructPageFetchUrl from '../../utils/constructPageFetchUrl';
import { Services, Toggles, Variants } from '../../../models/types/global';
import getOnwardsPageData from '../utils/getOnwardsData';
import augmentWithDisclaimer from '../../cpsAsset/getInitialData/augmentWithDisclaimer';
import { advertisingAllowed, isSfv } from '../utils/paramChecks';
import { FetchError } from '../../../models/types/fetch';
import handleError from '../../utils/handleError';

const logger = nodeLogger(__filename);

type Props = {
  getAgent: () => Promise<Agent>;
  service: Services;
  path: string;
  pageType: 'article' | 'cpsAsset';
  variant?: Variants;
  toggles?: Toggles;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const addDisclaimer = async (pageData: any, toggles: Toggles | undefined) => {
  try {
    return augmentWithDisclaimer(toggles, 0)(pageData);
  } catch (e) {
    return pageData;
  }
};

export default async ({
  getAgent,
  service,
  pageType,
  path: pathname,
  variant,
  toggles,
}: Props) => {
  try {
    const env = getEnvironment(pathname);
    const isLocal = !env || env === 'local';

    const agent = !isLocal ? await getAgent() : null;

    const fetchUrl = constructPageFetchUrl({
      pathname,
      pageType,
      service,
      variant,
    });

    const optHeaders = { 'ctx-service-env': env };

    // @ts-ignore - Ignore fetchPageData argument types
    // eslint-disable-next-line prefer-const
    let { status, json } = await fetchPageData({
      path: fetchUrl.toString(),
      ...(!isLocal && { agent, optHeaders }),
    });

    if (!json?.data?.article) {
      throw handleError('Article data is malformed', 500);
    }

    const {
      data: { article, secondaryData },
    } = json;

    const isAdvertising = advertisingAllowed(pageType, article);
    const isArticleSfv = isSfv(article);
    let wsojData = [];
    try {
      wsojData = await getOnwardsPageData({
        pathname,
        service,
        variant,
        isAdvertising,
        isArticleSfv,
        agent,
      });
    } catch (error) {
      logger.error('Recommendations JSON malformed', error);
    }

    const { topStories, features, mostRead, mostWatched } = secondaryData;

    const response = {
      status,
      pageData: {
        ...(await addDisclaimer(article, toggles)),
        secondaryColumn: {
          topStories,
          features,
        },
        mostRead,
        mostWatched,
        ...(wsojData && wsojData),
      },
    };

    return response;
  } catch (error: unknown) {
    const { message, status } = error as FetchError;

    logger.error(BFF_FETCH_ERROR, {
      service,
      status,
      pathname,
      message,
    });
    return { error: message, status };
  }
};
