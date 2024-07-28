import { GetServerSideProps } from 'next';
import logResponseTime from '#server/utilities/logResponseTime';
import isLitePath from '#app/routes/utils/isLitePath';
import extractHeaders from '#server/utilities/extractHeaders';

// This route does nothing other than return a 404 status code for other routes not yet supported in the Next.JS app
export default function CatchAll() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async context => {
  const {
    resolvedUrl,
    query: { service, variant },
    req: { headers: reqHeaders },
  } = context;

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
