import fetchSecondaryDataFromBFF from '#app/routes/utils/fetchSecondaryDataFromBFF';
import nodeLogger from '../../../lib/logger.node';
import { Services, Toggles, Variants } from '../../../models/types/global';
import getOnwardsPageData from '../utils/getOnwardsData';
import addDisclaimer from '../utils/addDisclaimer';
import { advertisingAllowed, isSfv } from '../utils/paramChecks';
import { FetchError } from '../../../models/types/fetch';
import handleError from '../../utils/handleError';
import fetchDataFromBFF from '../../utils/fetchDataFromBFF';
import getAgent from '../../../../server/utilities/getAgent';
import { BFF_FETCH_ERROR } from '../../../lib/logger.const';
import certsRequired from '../../utils/certsRequired';

const logger = nodeLogger(__filename);

type Props = {
  service: Services;
  path: string;
  pageType: 'article' | 'cpsAsset';
  variant?: Variants;
  toggles?: Toggles;
  isAmp?: boolean;
};

export default async ({
  service,
  pageType,
  path: pathname,
  variant,
  toggles,
  isAmp,
}: Props) => {
  try {
    // Article page data
    const { status, json } = await fetchDataFromBFF({
      pathname,
      pageType,
      service,
      variant,
      isAmp,
    });

    // Top stories and features
    let topStoriesAndFeatures = {
      json: { data: { topStories: {}, features: {} } },
    };

    try {
      topStoriesAndFeatures = await fetchSecondaryDataFromBFF({
        pathname,
        service,
        variant,
        secondaryData: 'topStoriesAndFeatures',
      });
    } catch (error) {
      logger.error('Secondary Data JSON malformed', error);
    }

    //  Most Read
    let mostReadData = {
      json: { data: {} },
    };

    try {
      mostReadData = await fetchSecondaryDataFromBFF({
        pathname,
        service,
        variant,
        secondaryData: 'mostRead',
      });
    } catch (error) {
      logger.error('Secondary Data JSON malformed', error);
    }

    //  Most Watched
    let mostWatchedData = {
      json: { data: {} },
    };

    try {
      mostWatchedData = await fetchSecondaryDataFromBFF({
        pathname,
        service,
        variant,
        secondaryData: 'mostWatched',
      });
    } catch (error) {
      logger.error('Secondary Data JSON malformed', error);
    }

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

    const { latestMedia } = secondaryData;

    const {
      data: { topStories, features },
    } = topStoriesAndFeatures?.json || {};

    const { data: mostRead } = mostReadData?.json || {};

    const { data: mostWatched } = mostWatchedData?.json || {};

    const response = {
      status,
      pageData: {
        ...(await addDisclaimer(article, toggles, isArticleSfv)),
        secondaryColumn: {
          topStories,
          features,
          latestMedia,
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
