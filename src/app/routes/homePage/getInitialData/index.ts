/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Agent } from 'https';
import getEnvironment from '#app/routes/utils/getEnvironment';
import nodeLogger from '../../../lib/logger.node';
import { BFF_FETCH_ERROR } from '../../../lib/logger.const';
import fetchPageData from '../../utils/fetchPageData';
import constructPageFetchUrl from '../../utils/constructPageFetchUrl';
import { Services } from '../../../models/types/global';
import HOME_PAGE_CONFIG from './page-config';

const logger = nodeLogger(__filename);

type Props = {
  getAgent: () => Promise<Agent>;
  service: Services;
  path: string;
  pageType: 'home';
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

    const fetchUrl = constructPageFetchUrl({
      pathname,
      pageType,
      service,
    });

    const optHeaders = { 'ctx-service-env': env };

    // @ts-ignore - Ignore fetchPageData argument types
    const { status, json } = await fetchPageData({
      path: fetchUrl.toString(),
      ...(!isLocal && { agent, optHeaders }),
    });

    const {
      data: { title, description, curations },
    } = json;

    const id = isLocal ? null : HOME_PAGE_CONFIG[service][env];

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
