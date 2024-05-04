import { GetServerSideProps } from 'next';
import { DOWNLOADS_PAGE } from '#app/routes/utils/pageTypes';
import logResponseTime from '#server/utilities/logResponseTime';

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
