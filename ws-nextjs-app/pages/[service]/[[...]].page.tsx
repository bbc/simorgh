import React from 'react';
import { GetServerSideProps } from 'next';
import logResponseTime from '#server/utilities/logResponseTime';
import isLitePath from '#app/routes/utils/isLitePath';
import extractHeaders from '#server/utilities/extractHeaders';
import parseAvRoute from '../../utilities/parseAvRoute';

export default function CatchAll({
  isAvEmbeds,
  pageData,
}: {
  isAvEmbeds: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pageData: any;
}) {
  if (isAvEmbeds)
    return (
      <div>
        <h1>
          AV Embeds -{' '}
          {pageData?.output?.isSyndicationRoute
            ? 'Syndication'
            : 'Non-Syndincation'}
        </h1>
        <p>Input:</p>
        <pre>{JSON.stringify(pageData?.input, null, 2)}</pre>
        <p>Output:</p>
        <pre>{JSON.stringify(pageData?.output, null, 2)}</pre>
      </div>
    );

  return null;
}

export const getServerSideProps: GetServerSideProps = async context => {
  const {
    resolvedUrl,
    query: { service, variant },
    req: { headers: reqHeaders },
  } = context;

  const isAvEmbeds = resolvedUrl.includes('av-embeds');

  if (isAvEmbeds) {
    const { status, data } = parseAvRoute(context.params);
    context.res.statusCode = status;

    return {
      props: {
        bbcOrigin: reqHeaders['bbc-origin'] || null,
        isNextJs: true,
        isAvEmbeds: true,
        pageData: data,
        service,
        status,
        ...extractHeaders(reqHeaders),
      },
    };
  }

  // \/\/\/ Default fallback for unknown routes \/\/\/

  const isLite = isLitePath(resolvedUrl);

  logResponseTime(
    {
      path: context.resolvedUrl,
    },
    context.res,
    () => null,
  );

  context.res.statusCode = 404;
  return {
    props: {
      bbcOrigin: reqHeaders['bbc-origin'] || null,
      isLite,
      isNextJs: true,
      service,
      status: 404,
      timeOnServer: Date.now(), // TODO: check if needed? See https://github.com/bbc/simorgh/pull/10857/files#r1200274478
      variant: variant?.[0] || null,
      ...extractHeaders(reqHeaders),
    },
  };
};
