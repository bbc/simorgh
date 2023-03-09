/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Agent } from 'https';
import Url from 'url-parse';
import nodeLogger from '../../../lib/logger.node';
import { BFF_FETCH_ERROR } from '../../../lib/logger.const';
import fetchPageData from '../../utils/fetchPageData';
import { Services } from '../../../models/types/global';
import HOME_PAGE_CONFIG from './page-config';

const logger = nodeLogger(__filename);

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

export default async ({ getAgent, service, path: pathname }: Props) => {
  try {
    const env = getEnvironment(pathname);
    const isLocal = !env || env === 'local';
    const idsForService = HOME_PAGE_CONFIG[service];

    const agent = !isLocal ? await getAgent() : null;
    const id = env === 'live' ? idsForService.live : idsForService.test;

    if (!id) throw handleError('Home ID is invalid', 500);

    let fetchUrl = Url(process.env.BFF_PATH as string).set('query', {
      id,
      service,
      pageType: 'home',
    });

    const optHeaders = { 'ctx-service-env': env };

    if (isLocal) {
      fetchUrl = Url(`/${service}/tipohome`);
    }

    // @ts-ignore - Ignore fetchPageData argument types
    // eslint-disable-next-line prefer-const
    let { status, json } = await fetchPageData({
      path: fetchUrl.toString(),
      ...(!isLocal && { agent, optHeaders }),
    });

    const { data } = json;

    return {
      status,
      pageData: {
        id,
        title: data.title,
        pageType: 'home',
        curations: data.curations,
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
