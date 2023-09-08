import { GetServerSideProps } from 'next';
import { Services, Variants } from '../../../src/app/models/types/global';
import extractHeaders from '../../../src/server/utilities/extractHeader';

// This route does nothing other than return a 404 status code for other routes not yet supported in the Next.JS app
export default function CatchAll() {
  return null;
}

type PageDataParams = {
  service: Services;
  variant: Variants;
};

export const getServerSideProps: GetServerSideProps = async context => {
  const { service, variant } = context.query as PageDataParams;

  const { headers: reqHeaders } = context.req;

  context.res.statusCode = 404;
  return {
    props: {
      bbcOrigin: reqHeaders['bbc-origin'] || null,
      isNextJs: true,
      service,
      status: 404,
      timeOnServer: Date.now(), // TODO: check if needed? See https://github.com/bbc/simorgh/pull/10857/files#r1200274478
      variant: variant?.[0] || null,
      ...extractHeaders(reqHeaders),
    },
  };
};
