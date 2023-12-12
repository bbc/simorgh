import * as fs from 'fs';
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
import encodeText, { Counter } from '../utils/encodeText';

const logger = nodeLogger(__filename);

type Props = {
  service: Services;
  path: string;
  pageType: 'article' | 'cpsAsset';
  variant?: Variants;
  toggles?: Toggles;
  isCaf?: boolean;
  isAmp?: boolean;
};

export default async ({
  service,
  pageType,
  path: pathname,
  variant,
  toggles,
  isCaf,
  isAmp,
}: Props) => {
  try {
    const { status, json } = await fetchDataFromBFF({
      pathname,
      pageType,
      service,
      variant,
      isCaf,
      isAmp,
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

    const { topStories, features, latestMedia, mostRead, mostWatched } =
      secondaryData;

    const dict = new Map();

    const res = encodeText(article.content, dict, new Counter());

    const encodedArticle = { ...article, content: res };

    fs.writeFileSync(
      '/Users/ahchos01/Desktop/WORLD NEWS/simorgh/src/app/routes/article/getInitialData/test.json',
      JSON.stringify(article, null, 2),
    );

    fs.writeFileSync(
      '/Users/ahchos01/Desktop/WORLD NEWS/simorgh/src/app/routes/article/getInitialData/test2.json',
      JSON.stringify(encodedArticle, null, 2),
    );

    const response = {
      status,
      pageData: {
        ...(await addDisclaimer(encodedArticle, toggles, isArticleSfv)),
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
