/** @jsxRuntime classic */
/** @jsx jsx */

import React, { useContext } from 'react';
import { jsx } from '@emotion/react';
import Pagination from '#pages/TopicPage/Pagination';
import Heading from '#app/components/Heading';
import { ServiceContext } from '#contexts/ServiceContext';
import nodeLogger from '#lib/logger.node';
import MetadataContainer from '../../../../../src/app/components/Metadata';
import LinkedDataContainer from '../../../../../src/app/components/LinkedData';

import styles from './styles';

const logger = nodeLogger(__filename);

type ComponentProps = {
  bbcOrigin?: string;
  pageData: {
    pageCount: number;
    activePage: number;
  };
  pathname: string;
  showAdsBasedOnLocation: boolean;
};

const LivePage = ({
  bbcOrigin,
  pageData,
  pathname,
  showAdsBasedOnLocation,
}: ComponentProps) => {
  const { lang } = useContext(ServiceContext);
  const { pageCount, activePage } = pageData;

  // TODO: Remove after testing
  logger.info('nextjs_client_render', {
    url: pathname,
  });

  return (
    <>
      <MetadataContainer
        title="Test Live Page"
        lang={lang}
        description="A test Live Page using Next.JS"
        openGraphType="website"
        hasAmpPage={false}
      />
      <LinkedDataContainer type="CollectionPage" seoTitle="Test Live Page" />
      <main css={styles.wrapper}>
        <Heading level={1}>Test Next.JS Page</Heading>
        <pre css={styles.code}>
          <Heading level={4}>Headers</Heading>
          {bbcOrigin && (
            <p>
              bbc-origin: <span>{bbcOrigin}</span>
            </p>
          )}
          <p>
            bbc-adverts:{' '}
            <span>{showAdsBasedOnLocation ? 'true' : 'false'}</span>
          </p>
        </pre>
        <pre css={styles.code}>{JSON.stringify(pageData, null, 2)}</pre>
        <Pagination
          activePage={activePage}
          pageCount={pageCount}
          pageXOfY="Page {x} of {y}"
          previousPage="Previous Page"
          nextPage="Next Page"
          page="Page"
        />
      </main>
    </>
  );
};

export default LivePage;
