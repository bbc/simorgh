import React from 'react';
import { LIVE_PAGE } from '#app/routes/utils/pageTypes';
import getPathExtension from '#app/utilities/getPathExtension';
import deriveVariant from '#nextjs/utilities/deriveVariant';
import isValidPageNumber from '#nextjs/utilities/pageQueryValidator';
import getPageData from '#nextjs/utilities/pageRequests/getPageData';
import sendCustomMetric from '#src/server/utilities/customMetrics';
import { NON_200_RESPONSE } from '#src/server/utilities/customMetrics/metrics.const';
import extractHeaders from '#src/server/utilities/extractHeaders';
// import logResponseTime from '#src/server/utilities/logResponseTime';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import nodeLogger from '#lib/logger.node';
import { OK } from '#app/lib/statusCodes.const';
import { Services, Variants } from '#app/models/types/global';
import MetadataContainer from '#app/components/Metadata';

interface PageProps {
  params: {
    service: Services;
    variant?: Variants[];
    id: string;
  };
  searchParams: {
    // eslint-disable-next-line camelcase
    renderer_env?: string;
    page?: string;
    post?: string;
  };
}

const logger = nodeLogger(__filename);

export default async function LivePage({ params, searchParams }: PageProps) {
  const reqHeaders = await headers();

  const {
    service,
    variant: variantFromUrl,
    id = 'c7p765ynk9qt',
  } = await params;

  const { renderer_env: rendererEnv, page = '1' } = await searchParams;

  const variant = deriveVariant(variantFromUrl);

  const resolvedUrl = `/live/${service}/${id}`;

  const { isApp, isLite } = getPathExtension(resolvedUrl);

  if (!isValidPageNumber(page)) {
    sendCustomMetric({
      metricName: NON_200_RESPONSE,
      statusCode: 404,
      pageType: LIVE_PAGE,
      requestUrl: resolvedUrl,
    });
    notFound(); // Redirect to 404 page
  }

  const { data, toggles } = await getPageData({
    id,
    page,
    service,
    variant,
    rendererEnv,
    resolvedUrl,
    pageType: LIVE_PAGE,
  });

  let routingInfoLogger = logger.debug;
  if (data.status !== OK) {
    routingInfoLogger = logger.error;
  }

  routingInfoLogger('ROUTING_INFORMATION', {
    url: resolvedUrl,
    status: data.status,
    pageType: LIVE_PAGE,
  });

  if (data.status === 404) {
    notFound();
  }

  const props = {
    error: data?.error || null,
    id,
    isApp,
    isLite,
    isAmp: false,
    isNextJs: true,
    page: page || null,
    pageData: data?.pageData
      ? {
          ...data.pageData,
          metadata: {
            ...data.pageData.metadata,
            type: LIVE_PAGE,
          },
        }
      : null,
    pageType: LIVE_PAGE,
    pathname: resolvedUrl,
    service,
    status: data.status,
    timeOnServer: Date.now(),
    toggles,
    variant,
    ...extractHeaders(Object.fromEntries(reqHeaders)),
  };

  return (
    <div>
      <MetadataContainer
        title="test"
        lang="en"
        openGraphType="website"
        hasAmpPage={false}
      />
      hello<p>{JSON.stringify(props, null, 2)}</p>
    </div>
  );
}
