/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Agent } from 'https';
import getEnvironment from '#app/routes/utils/getEnvironment';
import nodeLogger from '../../../lib/logger.node';
import { BFF_FETCH_ERROR } from '../../../lib/logger.const';
import fetchPageData from '../../utils/fetchPageData';
import constructPageFetchUrl from '../../utils/constructPageFetchUrl';
import { Services, Variants } from '../../../models/types/global';
import getOnwardsPageData from '../utils/getOnwardsData';
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
};

export default async ({ service, path: pathname }: Props) => {
  try {
    throw handleError('LOGGER TEST EXPRESS', 500);
  } catch (error: unknown) {
    const { message, status } = error as FetchError;

    logger.error('LOGGER TEST EXPRESS 1', {
      service,
      status,
      pathname,
      message: 'LOGGER_TEST_EXPRESS 2',
    });
    return { error: message, status };
  }
};
