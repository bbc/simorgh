import { GetServerSideProps } from 'next';
import nodeLogger from '#lib/logger.node';
import { BFF_FETCH_ERROR } from '#app/lib/logger.const';
import { FetchError } from '#app/models/types/fetch';
import PageDataParams from '#models/types/pageDataParams';
import mundoFixture from '#data/mundo/send/test2qq3x8vt.json';
import constructPageFetchUrl from '#app/routes/utils/constructPageFetchUrl';
import getEnvironment from '#app/routes/utils/getEnvironment';
import fetchPageData from '#app/routes/utils/fetchPageData';
import certsRequired from '#app/routes/utils/certsRequired';
import UGCPageLayout from './UGCPageLayout';
import getAgent from '../../../../utilities/undiciAgent';

const logger = nodeLogger(__filename);

const fetchData = async ({
  id,
  service,
  variant,
  rendererEnv,
}: PageDataParams) => {
  const pathname = `${id}${rendererEnv ? `?renderer_env=${rendererEnv}` : ''}`;
  const livePageUrl = constructPageFetchUrl({
    pageType: 'ugcForm',
    pathname,
    service,
    variant,
  });

  const env = getEnvironment(pathname);
  const optHeaders = { 'ctx-service-env': env };

  const agent = certsRequired(pathname) ? await getAgent() : null;

  let pageStatus;
  let pageJson;
  let errorMessage;

  const path = livePageUrl.toString();

  try {
    // @ts-expect-error Due to jsdoc inference, and no TS within fetchPageData
    const check = await fetchPageData({
      path,
      agent,
      optHeaders,
    });
  } catch (error) {
    console.log('CHECK3', error);
  }

  return mundoFixture;
};

export const getServerSideProps: GetServerSideProps = async context => {
  const {
    id,
    service,
    variant,
    renderer_env: rendererEnv,
  } = context.query as PageDataParams;

  let pageData = null;

  try {
    const data = await fetchData({
      id,
      service,
      variant,
      rendererEnv,
      resolvedUrl: context.resolvedUrl,
    });
    pageData = data;
  } catch (error) {
    const { message, status } = error as FetchError;
    logger.error(BFF_FETCH_ERROR, {
      service,
      status,
      id,
      message,
    });
  }

  return {
    props: {
      id,
      isAmp: false,
      isNextJs: true,
      pageData,
      pageType: 'ugc',
      pathname: null,
      service,
      status: 500,
      timeOnServer: Date.now(), // TODO: check if needed?
    },
  };
};

export default UGCPageLayout;
