import { GetServerSideProps } from 'next';
import { Services, Variants } from '../../../src/app/models/types/global';

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

  return {
    props: {
      bbcOrigin: reqHeaders['bbc-origin'] || null,
      isNextJs: true,
      service,
      status: 404,
      timeOnServer: Date.now(), // TODO: check if needed?
      variant: variant?.[0] || null,
    },
  };
};
