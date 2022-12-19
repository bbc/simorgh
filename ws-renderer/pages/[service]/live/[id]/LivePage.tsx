/** @jsxRuntime classic */
/** @jsx jsx */

import React, { useContext } from 'react';
import { jsx } from '@emotion/react';
import Heading from '../../../../../src/app/components/Heading';
import MetadataContainer from '../../../../../src/app/legacy/containers/Metadata';
import { Services, Variants } from '../../../../../src/app/models/types/global';
import { ServiceContext } from '../../../../../src/app/contexts/ServiceContext';

import styles from './styles';

type ComponentProps = {
  pageData: {
    metadata: string;
  };
  pathname: string;
  service: Services;
  showAdsBasedOnLocation: boolean;
  variant?: Variants;
};

const LivePage = ({
  pageData,
  pathname,
  service,
  showAdsBasedOnLocation,
  variant,
}: ComponentProps) => {
  const { lang } = useContext(ServiceContext);

  return (
    <>
      <MetadataContainer
        title="Test Live Page"
        lang={lang}
        description="A test Live Page using Next.JS"
        openGraphType="website"
        hasAmpPage={false}
      />
      <main css={styles.wrapper}>
        <Heading level={1}>Test Next.JS Page</Heading>
        <pre css={styles.code}>
          <ul>
            <li>Service: {service}</li>
            <li>Variant: {!variant ? `${service} has no variant` : variant}</li>
            <li>Path: {pathname}</li>
            <li>Show Ads: {showAdsBasedOnLocation ? `✅` : `⛔️`}</li>
          </ul>
        </pre>
        <pre css={styles.code}>{JSON.stringify(pageData, null, 2)}</pre>
      </main>
    </>
  );
};

export default LivePage;
