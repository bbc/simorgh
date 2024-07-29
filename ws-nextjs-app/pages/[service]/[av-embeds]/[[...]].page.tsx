import React from 'react';
import { GetServerSideProps } from 'next';
import extractHeaders from '#server/utilities/extractHeaders';
import { AV_EMBEDS } from '#app/routes/utils/pageTypes';
import parseAvRoute from './parseAvRoute';

export default function AvEmbeds({
  pageData,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pageData: any;
}) {
  return (
    <div>
      <h1>
        AV Embeds -{' '}
        {pageData?.output?.isSyndicationRoute
          ? 'Syndication'
          : 'Non-Syndication'}
      </h1>
      <p>Input:</p>
      <pre>{JSON.stringify(pageData?.input, null, 2)}</pre>
      <p>Output:</p>
      <pre>{JSON.stringify(pageData?.output, null, 2)}</pre>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  const {
    resolvedUrl,
    req: { headers: reqHeaders },
  } = context;

  // Check the dynamic route contains 'av-embeds'
  if (!resolvedUrl?.includes('av-embeds')) {
    return { props: {}, notFound: true };
  }

  const parsedRoute = parseAvRoute(resolvedUrl);

  // Determine actual statusCode based on data fetch
  const status = 200;

  // Determine actual service and variant (if applicable) from either the parsed route or the data returned from the fetch for the media data from BFF
  // We should always have a service to be able to display a 404 page if needed
  const service = parsedRoute?.service ?? 'news';
  const variant = parsedRoute?.variant ?? null;

  context.res.statusCode = status;

  return {
    props: {
      bbcOrigin: reqHeaders['bbc-origin'] || null,
      isNextJs: true,
      isAvEmbeds: true,
      pageData: parsedRoute
        ? {
            input: resolvedUrl,
            output: parsedRoute,
            metadata: { type: AV_EMBEDS },
          }
        : null,
      pageType: AV_EMBEDS,
      service,
      variant,
      status,
      ...extractHeaders(reqHeaders),
    },
  };
};
