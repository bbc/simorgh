/** @jsx jsx */

import React, { useContext } from 'react';
import { jsx } from '@emotion/react';
import Heading from '#app/components/Heading';
import { ServiceContext } from '#contexts/ServiceContext';
import nodeLogger from '#lib/logger.node';
import LegacyText from '#app/legacy/containers/Text';
import Blocks from '#app/legacy/containers/Blocks';
import MetadataContainer from '../../../../../src/app/components/Metadata';
import LinkedDataContainer from '../../../../../src/app/components/LinkedData';
import Stream from './Stream';
import Header from './Header';

import styles from './styles';
import { StreamResponse } from './Post/types';

const logger = nodeLogger(__filename);

type ComponentProps = {
  bbcOrigin?: string;
  pageData: {
    title: string;
    description?: string;
    isLive: boolean;
    summaryPoints: { content: { model: { blocks: object[] } } | null };
    liveTextStream: { content: StreamResponse | null };
  };
  pathname?: string;
  showAdsBasedOnLocation?: boolean;
};

const LivePage = ({
  bbcOrigin,
  pageData,
  pathname,
  showAdsBasedOnLocation,
}: ComponentProps) => {
  const { lang } = useContext(ServiceContext);
  const {
    title,
    description,
    isLive,
    summaryPoints: { content: summaryContent },
    liveTextStream,
  } = pageData;

  // TODO: Remove after testing
  logger.info('nextjs_client_render', {
    url: pathname,
  });

  // Temp solution for rendering Summary
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Summary = ({ summaryBlocks }: any) => {
    if (!summaryBlocks) return null;
    const componentsToRender = { text: LegacyText };

    return (
      <>
        <Heading level={2}>Summary</Heading>
        <Blocks
          blocks={summaryBlocks}
          componentsToRender={componentsToRender}
        />
      </>
    );
  };

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
      <main>
        <Header
          showLiveLabel={isLive}
          title={title}
          description={description}
        />
        <div css={styles.outerGrid}>
          <div css={styles.firstSection}>
            <Summary summaryBlocks={summaryContent?.model.blocks} />
          </div>
          <div css={styles.secondSection}>
            <Stream streamContent={liveTextStream.content} />
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
          </div>
        </div>
      </main>
    </>
  );
};

export default LivePage;
