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
    params,
    req: { headers: reqHeaders },
  } = context;

  // Check the dynamic route contains 'av-embeds'
  if (!resolvedUrl?.includes('av-embeds')) {
    return { props: {}, notFound: true };
  }

  const values = Object.values(params ?? {})?.flat() as string[];

  const { status, data } = parseAvRoute(values);

  // DO STUFF HERE TO FETCH MEDIA DATA IF 200

  context.res.statusCode = status;

  return {
    props: {
      bbcOrigin: reqHeaders['bbc-origin'] || null,
      isNextJs: true,
      isAvEmbeds: true,
      pageData: data
        ? {
            ...data,
            metadata: { type: AV_EMBEDS },
          }
        : null,
      pageType: AV_EMBEDS,
      service: data?.output?.service ?? 'news',
      variant: data?.output?.variant ?? null,
      status,
      ...extractHeaders(reqHeaders),
    },
  };
};
