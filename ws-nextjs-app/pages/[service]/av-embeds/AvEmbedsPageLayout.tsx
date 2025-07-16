import React from 'react';
import MediaLoader from '#app/components/MediaLoader';
import { AvEmbedsPageProps } from './types';
import AvEmbedsMetadata from './AvEmbedsMetadata';

const AvEmbedsPageLayout = ({ pageData }: AvEmbedsPageProps) => (
  <>
    <style jsx global>{`
      body {
        margin: 0;
      }
    `}</style>
    <AvEmbedsMetadata pageData={pageData} />
    <div data-testid="avembeds-mediaplayer">
      <MediaLoader
        blocks={pageData?.mediaBlock}
        className="pb-0"
        embedded
      />
    </div>
  </>
);

export default AvEmbedsPageLayout;
