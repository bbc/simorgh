/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Agent } from 'https';
import pipe from 'ramda/src/pipe';
import Url from 'url-parse';
import nodeLogger from '../../../lib/logger.node';
import { getUrlPath } from '../../../lib/utilities/urlParser';
import { BFF_FETCH_ERROR } from '../../../lib/logger.const';
import fetchPageData from '../../utils/fetchPageData';
import { Services, Variants } from '../../../models/types/global';

import getErrorStatusCode from '../../utils/fetchPageData/utils/getErrorStatusCode';

const logger = nodeLogger(__filename);

const removeAmp = (path: string) => path.split('.')[0];
const popId = (path: string) => path.split('/').pop();

const getId = pipe(getUrlPath, removeAmp, popId);

const getEnvironment = (pathname: string) => {
  if (pathname.includes('renderer_env=test')) {
    return 'test';
  }
  if (pathname.includes('renderer_env=live')) {
    return 'live';
  }

  return process.env.SIMORGH_APP_ENV;
};

type Props = {
  getAgent: () => Promise<Agent>;
  service: Services;
  path: string;
  variant: Variants;
};

export default async ({
  getAgent,
  service,
  path: pathname,
  variant,
}: Props) => {
  try {
    const env = getEnvironment(pathname);
    const isLocal = env === 'local';

    const agent = await getAgent();
    const id = getId(pathname);

    let fetchUrl = Url(process.env.BFF_PATH as string).set('query', {
      id,
      service,
      ...(variant && {
        variant,
      }),
      pageType: 'article',
    });

    const optHeaders = { 'ctx-service-env': env };

    if (isLocal) {
      fetchUrl = Url(
        `/${service}/articles/${id}${variant ? `/${variant}` : ''}`,
      );
    }

    // @ts-ignore - Ignore fetchPageData argument types
    const { status, json } = await fetchPageData({
      path: fetchUrl.toString(),
      ...(!isLocal && { agent, optHeaders }),
    });

    const {
      data: { article, secondaryData },
    } = json;

    return {
      status,
      pageData: {
        ...article,
        secondaryColumn: secondaryData,
      },
    };
  } catch ({ message }) {
    const status = getErrorStatusCode();

    logger.error(BFF_FETCH_ERROR, {
      service,
      status,
      pathname,
      message,
    });
    return { error: message, status };
  }
};
