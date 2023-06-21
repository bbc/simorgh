/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Agent } from 'https';
import getAdditionalPageData from '#app/routes/cpsAsset/utils/getAdditionalPageData';
import getEnvironment from '#app/routes/utils/getEnvironment';
import nodeLogger from '../../../lib/logger.node';
import { BFF_FETCH_ERROR } from '../../../lib/logger.const';
import fetchPageData from '../../utils/fetchPageData';
import constructPageFetchUrl from '../../utils/constructPageFetchUrl';
import handleError from '../../utils/handleError';
import { Services, Variants } from '../../../models/types/global';
import getOnwardsPageData from '../utils/getOnwardsData';
import { advertisingAllowed, isSfv } from '../utils/paramChecks';
import { FetchError } from '../../../models/types/fetch';

const logger = nodeLogger(__filename);

type Props = {
  getAgent: () => Promise<Agent>;
  service: Services;
  path: string;
  pageType: 'article' | 'cpsAsset';
  variant?: Variants;
};

export default async ({
  getAgent,
  service,
  pageType,
  path: pathname,
  variant,
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

    // Ensure all local CPS fixture and test data is in the correct format
    if (isLocal && pageType === 'cpsAsset') {
      const secondaryData = await getAdditionalPageData({
        pageData: json,
        service,
        variant,
        env,
      });

      json = {
        data: {
          article: json,
          // Checks for data mocked in tests, or data from fixture data
          secondaryData: json?.secondaryData ?? {
            topStories: secondaryData?.secondaryColumn?.topStories,
            features: secondaryData?.secondaryColumn?.features,
            mostRead: secondaryData?.mostRead,
            mostWatched: secondaryData?.mostWatched,
          },
        },
      };
    }

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

    return {
      status,
      pageData: {
        ...article,
        secondaryColumn: secondaryData,
        ...(wsojData && wsojData),
      },
    };
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
