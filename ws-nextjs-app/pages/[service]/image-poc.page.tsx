import { GetServerSideProps } from 'next';
import { HOME_PAGE } from '#app/routes/utils/pageTypes';
import ImagePoc from '../ws/ImagePoc';

export const getServerSideProps: GetServerSideProps = async context => {
  const { service } = context.query;

  return {
    props: {
      pageType: HOME_PAGE,
      service,
      pathname: context.resolvedUrl,
      status: 200,
      timeOnServer: Date.now(),
      pageData: {
        metadata: {
          type: HOME_PAGE,
        },
      },
    },
  };
};

export default ImagePoc;
