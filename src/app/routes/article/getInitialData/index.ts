import nodeLogger from '#lib/logger.node';
import { Services, Toggles, Variants } from '#models/types/global';
import augmentWithDisclaimer from '#app/routes/article/utils/augmentWithDisclaimer';
import { FetchError, GetAgent } from '#models/types/fetch';
import handleError from '#app/routes/utils/handleError';
import fetchDataFromBFF from '#app/routes/utils/fetchDataFromBFF';
import { BFF_FETCH_ERROR } from '#lib/logger.const';

const logger = nodeLogger(__filename);

type Props = {
  service: Services;
  path: string;
  pageType: 'article';
  variant?: Variants;
  toggles?: Toggles;
  isAmp?: boolean;
  getAgent: GetAgent;
};

const transformPageData = (toggles?: Toggles) =>
  augmentWithDisclaimer({ toggles, positionFromTimestamp: 0 });

export default async ({
  service,
  pageType,
  path: pathname,
  variant,
  toggles,
  isAmp,
  getAgent,
}: Props) => {
  try {
    const { status, json } = await fetchDataFromBFF({
      pathname,
      pageType,
      service,
      variant,
      isAmp,
      getAgent,
    });

    if (!json?.data?.article) {
      throw handleError('Article data is malformed', 500);
    }

    const {
      data: { article, secondaryData },
    } = json;

    const { topStories, features, latestMedia, mostRead } = secondaryData;

    const transformedArticleData = transformPageData(toggles)(article);

    const response = {
      status,
      pageData: {
        ...transformedArticleData,
        secondaryColumn: {
          topStories,
          features,
          latestMedia,
        },
        mostRead,
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
