/** @jsx jsx */
import { jsx } from '@emotion/react';
import MediaLoader from '#app/components/MediaLoader';
import { AvEmbedsPageProps } from './types';

const AvEmbedsPageLayout = ({ pageData }: AvEmbedsPageProps) => {
  return (
    <div style={{ maxWidth: 600 }}>
      <h1>AV Embeds</h1>
      {pageData?.mediaBlock && pageData?.mediaBlock?.length > 0 && (
        <MediaLoader
          blocks={pageData?.mediaBlock}
          css={{
            paddingBottom: 0,
            aspectRatio: '16/9',
            '> div': { aspectRatio: 'auto' },
          }}
        />
      )}
    </div>
  );
};

export default AvEmbedsPageLayout;
