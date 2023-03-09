/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Agent } from 'https';
import pipe from 'ramda/src/pipe';
import Url from 'url-parse';
import nodeLogger from '../../../lib/logger.node';
import { getUrlPath } from '../../../lib/utilities/urlParser';
import { BFF_FETCH_ERROR } from '../../../lib/logger.const';
import fetchPageData from '../../utils/fetchPageData';
import { Services } from '../../../models/types/global';
import HOME_PAGE_TEST_CONFIG from './test-config';

const logger = nodeLogger(__filename);

const removeAmp = (path: string) => path.split('.')[0];
const popId = (path: string) => path.split('/').pop();

const getId = (pageType: string) => pipe(getUrlPath, removeAmp, popId);

const getEnvironment = (pathname: string) => {
  if (pathname.includes('renderer_env=test')) {
    return 'test';
  }
  if (pathname.includes('renderer_env=live')) {
    return 'live';
  }

  return process.env.SIMORGH_APP_ENV;
};

interface BFFError extends Error {
  status: number;
}

const handleError = (message: string, status: number) => {
  const error = new Error(message) as BFFError;
  error.status = status;

  return error;
};

type Props = {
  getAgent: () => Promise<Agent>;
  service: Services;
  path: string;
  pageType: 'homePage';
};

export default async ({
  getAgent,
  service,
  pageType,
  path: pathname,
}: Props) => {
  try {
    const env = getEnvironment(pathname);
    const isLocal = !env || env === 'local';

    const agent = !isLocal ? await getAgent() : null;
    const id = HOME_PAGE_TEST_CONFIG[service];

    // if (!id) throw handleError('Home ID is invalid', 500);

    let fetchUrl = Url(process.env.BFF_PATH as string).set('query', {
      id,
      service,
      pageType,
    });

    const optHeaders = { 'ctx-service-env': env };

    if (isLocal) {
      // if (pageType === 'homePage') {
      fetchUrl = Url(`/${service}/tipohome`);
      // }
    }

    // @ts-ignore - Ignore fetchPageData argument types
    // eslint-disable-next-line prefer-const
    let { status, json } = await fetchPageData({
      path: fetchUrl.toString(),
      ...(!isLocal && { agent, optHeaders }),
    });

    const { data } = json;

    const imageData = data.imageData || null;

    return {
      status,
      pageData: {
        id,
        title: data.title,
        description: data.description,
        imageData,
        curations: data.curations,
        activePage: data.activePage || 1,
        pageCount: data.pageCount,
        metadata: {
          type: 'Home',
        },
      },
    };
  } catch ({ message, status }) {
    logger.error(BFF_FETCH_ERROR, {
      service,
      status,
      pathname,
      message,
    });
    return { error: message, status };
  }
};
