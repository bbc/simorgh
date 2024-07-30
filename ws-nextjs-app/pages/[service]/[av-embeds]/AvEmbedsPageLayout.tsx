/** @jsx jsx */
import { jsx } from '@emotion/react';
import MediaLoader from '#app/components/MediaLoader';
import { MediaBlock } from '#app/components/MediaLoader/types';

type PageProps = {
  pageData: {
    input: Record<string, unknown>;
    output: Record<string, unknown>;
    mediaBlock: MediaBlock[];
  };
};

const AvEmbedsPageLayout = ({ pageData }: PageProps) => {
  return (
    <div style={{ maxWidth: 600 }}>
      <h1>
        AV Embeds -{' '}
        {pageData?.output?.isSyndicationRoute
          ? 'Syndication'
          : 'Non-Syndication'}
      </h1>
      <p>Input:</p>
      <pre>{JSON.stringify(pageData?.input, null, 2)}</pre>
      <p>Output:</p>
      <pre>{JSON.stringify(pageData?.output, null, 2)}</pre>
      {pageData?.mediaBlock?.length > 0 && (
        <>
          <p>Video Block:</p>
          <MediaLoader
            blocks={pageData?.mediaBlock}
            css={{
              paddingBottom: 0,
              '> div': { aspectRatio: 'auto' },
            }}
          />
        </>
      )}
    </div>
  );
};

export default AvEmbedsPageLayout;
