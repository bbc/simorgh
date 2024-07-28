import React, { useContext } from 'react';
import { GetServerSideProps } from 'next';
import extractHeaders from '#server/utilities/extractHeaders';
import { ServiceContext } from '#app/contexts/ServiceContext';
import parseAvRoute from '../../../utilities/parseAvRoute';

export default function AvEmbeds({
  pageData,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pageData: any;
}) {
  const { translations } = useContext(ServiceContext);

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
      <p>I can access Contexts too:</p>
      <pre>{JSON.stringify(translations, null, 2)}</pre>
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
  const combinedParams = {
    ...params,
    ...context.query,
  };

  const values = Object.values(combinedParams)?.flat() as string[];

  const { status, data } = parseAvRoute(values);

  // DO STUFF HERE TO FETCH MEDIA DATA IF 200

  context.res.statusCode = status;

  return {
    props: {
      bbcOrigin: reqHeaders['bbc-origin'] || null,
      isNextJs: true,
      isAvEmbeds: true,
      pageData: data,
      service: data?.output?.service ?? 'news',
      variant: data?.output?.variant ?? null,
      status,
      ...extractHeaders(reqHeaders),
    },
  };
};
