/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Agent } from 'https';
import pipe from 'ramda/src/pipe';
import pathOr from 'ramda/src/pathOr';
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
  toggles: Toggles;
};

// TO REFACTOR
const processOptimoBlocks = (toggles: any) =>
  pipe(augmentWithDisclaimer(toggles, 0));

// TO REFACTOR
const transformJson = async (json: any, toggles: any) => {
  try {
    return processOptimoBlocks(toggles)(json);
  } catch (e) {
    return json;
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
        ...(await transformJson(article, toggles)),
        secondaryColumn: {
          topStories,
          features,
        },
        mostRead,
        mostWatched,
        ...(wsojData && wsojData),
      },
    };

    // const data = response.pageData;
    // const newBlocks = pathOr([], ['content', 'model', 'blocks'], data);
    // console.log('newBlocks', newBlocks);

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
