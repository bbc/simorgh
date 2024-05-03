import * as React from 'react';
import { GetStaticProps } from 'next';
import nodeLogger from '#lib/logger.node';
import PageDataParams from '#models/types/pageDataParams';
import downloadsPageLayout from './downloadsPageLayout';

const logger = nodeLogger(__filename);

export const getStaticProps: GetStaticProps = () => {
  const {
    service,
    variant,
    renderer_env: rendererEnv,
  } = context.query as PageDataParams;

  return {
    props: {
      error: null,
      isAmp: false,
      isNextJs: true,
      page: null,
      pageData: {
        metadata: {
            type: DOWNLOADS,
        },
      },
      pageType: DOWNLOADS,
      pathname: `${service}/downloads`,
      service,
      status: 200,
      timeOnServer: Date.now(), // TODO: check if needed?
    },
  };
};

export default downloadsPageLayout;
