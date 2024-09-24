import pipe from 'ramda/src/pipe';
import nodeLogger from '../../../lib/logger.node';
import { Services, Toggles, Variants } from '../../../models/types/global';
import getOnwardsPageData from '../utils/getOnwardsData';
import addAnalyticsCounterName from '../utils/addAnalyticsCounterName';
import augmentWithDisclaimer from '../utils/augmentWithDisclaimer';
import { advertisingAllowed, isSfv } from '../utils/paramChecks';
import { FetchError, GetAgent } from '../../../models/types/fetch';
import handleError from '../../utils/handleError';
import fetchDataFromBFF from '../../utils/fetchDataFromBFF';
import { BFF_FETCH_ERROR } from '../../../lib/logger.const';
import certsRequired from '../../utils/certsRequired';

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
  pipe(
    addAnalyticsCounterName,
    augmentWithDisclaimer({ toggles, positionFromTimestamp: 0 }),
  );

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

    const agent = certsRequired(pathname) ? await getAgent() : null;

    if (!json?.data?.article) {
      throw handleError('Article data is malformed', 500);
    }

    const {
      data: { article, secondaryData },
    } = json;

    const isAdvertising = advertisingAllowed(pageType, article);
    const isArticleSfv = isSfv(article);
    let wsojData = [];
    const lastPublished = article?.metadata?.lastPublished;
    const shouldGetOnwardsPageData = lastPublished
      ? new Date(lastPublished).getFullYear() > new Date().getFullYear() - 2
      : false;
    if (shouldGetOnwardsPageData) {
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
    }

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
