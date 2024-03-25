import { GetServerSideProps } from 'next';
import nodeLogger from '#lib/logger.node';
import { BFF_FETCH_ERROR, DATA_REQUEST_RECEIVED } from '#app/lib/logger.const';
import { FetchError } from '#app/models/types/fetch';
import UGCPageLayout from './UGCPageLayout';
import fixture from './fixture';
import { FetchParameters, PageDataParams } from './types';

const logger = nodeLogger(__filename);

const fetchData = ({ id, service, variant }: FetchParameters) => {
  logger.info(
    DATA_REQUEST_RECEIVED,
    `MAKE REQUEST HERE ${id} ${service} ${variant}`,
  );

  return fixture;
};

export const getServerSideProps: GetServerSideProps = async context => {
  const { id, service, variant } = context.query as PageDataParams;

  let pageData = null;

  try {
    const data = fetchData({ id, service, variant });
    pageData = data;
  } catch (error) {
    const { message, status } = error as FetchError;
    logger.error(BFF_FETCH_ERROR, {
      service,
      status,
      id,
      message,
    });
  }

  return {
    props: {
      id,
      isAmp: false,
      isNextJs: true,
      pageData,
      pageType: 'ugc',
      pathname: null,
      service,
      status: 200,
      timeOnServer: Date.now(), // TODO: check if needed?
    },
  };
};

export default UGCPageLayout;
