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

  // DO STUFF HERE TO FETCH MEDIA DATA IF 200

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
      service: parsedRoute?.service ?? 'news',
      variant: parsedRoute?.variant ?? null,
      status: 200,
      ...extractHeaders(reqHeaders),
    },
  };
};
