import dynamic from 'next/dynamic';
import { GetServerSideProps } from 'next';
import { TOPIC_PAGE } from '#app/routes/utils/pageTypes';
import PageDataParams from '#app/models/types/pageDataParams';
import deriveVariant from '#nextjs/utilities/deriveVariant';

const TopicsPageComponent = dynamic(() => import('./TopicsPage'));

export const getServerSideProps: GetServerSideProps = async context => {
  const { service, variant: variantFromUrl } = context.query as PageDataParams;
  const variant = deriveVariant(variantFromUrl);

  return {
    props: {
      service,
      variant,
      pageType: TOPIC_PAGE,
      status: 200,
      timeOnServer: Date.now(),
      pathname: `/${service}/topics`,
    },
  };
};

export default TopicsPageComponent;
