/* * @jsxRuntime classic */
/** @jsx jsx */

import { useContext } from 'react';
import { jsx } from '@emotion/react';
import Pagination from '#pages/TopicPage/Pagination';
import Heading from '#app/components/Heading';
import Text from '#app/components/Text';
import { ServiceContext } from '#contexts/ServiceContext';
import nodeLogger from '#lib/logger.node';
import LegacyText from '#app/legacy/containers/Text';
import Blocks from '#app/legacy/containers/Blocks';
import MetadataContainer from '../../../../../src/app/components/Metadata';
import LinkedDataContainer from '../../../../../src/app/components/LinkedData';
import PostsList from './Posts';

import styles from './styles';
import { StreamResponse } from './Posts/types';

const logger = nodeLogger(__filename);

type ComponentProps = {
  pageData: {
    pageCount: number;
    activePage: number;
    title?: string;
    description?: string;
    summaryPoints: { content: { model: { blocks: object[] } } | null };
    liveTextStream: { content: StreamResponse | null };
  };
  pathname?: string;
};

const LivePage = ({ pageData, pathname }: ComponentProps) => {
  const { lang } = useContext(ServiceContext);

  const {
    pageCount,
    activePage,
    title,
    description,
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
      <div css={styles.summary}>
        <Heading level={2}>Summary</Heading>
        <Blocks
          blocks={summaryBlocks}
          componentsToRender={componentsToRender}
        />
      </div>
    );
  };

  return (
    <div css={styles.background}>
      <MetadataContainer
        title="Test Live Page"
        lang={lang}
        description="A test Live Page using Next.JS"
        openGraphType="website"
        hasAmpPage={false}
      />
      <LinkedDataContainer type="CollectionPage" seoTitle="Test Live Page" />
      <main css={styles.wrapper}>
        <Heading level={1}>{title}</Heading>
        {/* Text as="p" used as placeholder. Awaiting screen reader UX and UX */}
        <Text as="p">{description}</Text>
        <Summary summaryBlocks={summaryContent?.model.blocks} />
        {liveTextStream.content && (
          <PostsList postData={liveTextStream.content} />
        )}
        <Pagination
          activePage={activePage}
          pageCount={pageCount}
          pageXOfY="Page {x} of {y}"
          previousPage="Previous Page"
          nextPage="Next Page"
          page="Page"
        />
      </main>
    </div>
  );
};

export default LivePage;
