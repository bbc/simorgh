/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Agent } from 'https';
import Url from 'url-parse';
import getEnvironment from '#app/routes/utils/getEnvironment';
import nodeLogger from '../../../lib/logger.node';
import { BFF_FETCH_ERROR } from '../../../lib/logger.const';
import fetchPageData from '../../utils/fetchPageData';
import { Services } from '../../../models/types/global';
import HOME_PAGE_CONFIG from './page-config';

const logger = nodeLogger(__filename);

type Props = {
  getAgent: () => Promise<Agent>;
  service: Services;
  path: string;
  pageType: string;
};

export default async ({
  getAgent,
  service,
  path: pathname,
  pageType,
}: Props) => {
  try {
    const env = getEnvironment(pathname);
    const isLocal = !env || env === 'local';

    const agent = isLocal ? null : await getAgent();
    const id = isLocal ? null : HOME_PAGE_CONFIG[service][env];

    let fetchUrl = Url(process.env.BFF_PATH as string).set('query', {
      id,
      service,
      pageType,
    });

    if (isLocal) {
      fetchUrl = Url(`/${service}/tipohome`);
    }

    const optHeaders = { 'ctx-service-env': env };

    // @ts-ignore - Ignore fetchPageData argument types
    const { status, json } = await fetchPageData({
      path: fetchUrl.toString(),
      ...(!isLocal && { agent, optHeaders }),
    });

    const {
      data: { title, description, curations },
    } = json;

    return {
      status,
      pageData: {
        id,
        title,
        pageType,
        curations,
        description,
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
