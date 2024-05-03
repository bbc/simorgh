import { GetServerSideProps } from 'next';
import constructPageFetchUrl from '#app/routes/utils/constructPageFetchUrl';
import getToggles from '#app/lib/utilities/getToggles/withCache';
import { DOWNLOADS_PAGE } from '#app/routes/utils/pageTypes';
import logResponseTime from '#server/utilities/logResponseTime';
import isAppPath from '#app/routes/utils/isAppPath';

import getEnvironment from '#app/routes/utils/getEnvironment';
import certsRequired from '#app/routes/utils/certsRequired';
import { OK } from '#app/lib/statusCodes.const';
import sendCustomMetric from '#server/utilities/customMetrics';
import { NON_200_RESPONSE } from '#server/utilities/customMetrics/metrics.const';
import isLitePath from '#app/routes/utils/isLitePath';
import PageDataParams from '#app/models/types/pageDataParams';
import dataFetch from './dataFetch';

import downloadsPageLayout from './downloadsPageLayout';
import extractHeaders from '../../../../src/server/utilities/extractHeaders';

export const getServerSideProps: GetServerSideProps = async context => {
  logResponseTime(
    {
      path: context.resolvedUrl,
    },
    context.res,
    () => null,
  );

  const {
    id,
    service,
    variant,
    renderer_env: rendererEnv,
  } = context.query as PageDataParams;

  const downloadData = await dataFetch(service);

  const { headers: reqHeaders } = context.req;

  return {
    props: {
      bbcOrigin: reqHeaders['bbc-origin'] || null,
      error: null,
      isAmp: false,
      isNextJs: true,
      pageData: {
        downloadData,
        metadata: {
          type: DOWNLOADS_PAGE,
        },
      },
      pageType: DOWNLOADS_PAGE,
      pathname: `${service}/downloads`,
      service,
      showAdsBasedOnLocation: false,
      status: 200,
      timeOnServer: Date.now(), // TODO: check if needed?
      variant: variant?.[0] || null,
      ...extractHeaders(reqHeaders),
    },
  };
};

export default downloadsPageLayout;
